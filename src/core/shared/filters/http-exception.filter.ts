import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();

    let status: number;
    let message: string;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.name;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (typeof responseObj.message === 'string'
            ? responseObj.message
            : undefined) || exception.message;
        error =
          (typeof responseObj.error === 'string'
            ? responseObj.error
            : undefined) || exception.name;
      } else {
        message = exception.message;
        error = exception.name;
      }
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Erro na operação do banco de dados';
      error = 'DatabaseError';

      this.logger.error('Database Error:', {
        query: exception.query,
        parameters: exception.parameters,
        message: exception.message,
        driverError: (exception as unknown as Record<string, unknown>)
          .driverError,
      });

      const mysqlError = exception as unknown as Record<string, unknown>;
      const errorCode =
        (typeof mysqlError.errno === 'number' ? mysqlError.errno : undefined) ||
        (typeof mysqlError.code === 'number' ? mysqlError.code : undefined);
      switch (errorCode) {
        case 1062: // ER_DUP_ENTRY
          message = 'Dados duplicados. Verifique se o registro já existe';
          break;
        case 1452: // ER_NO_REFERENCED_ROW_2
          message = 'Referência inválida. Dados relacionados não encontrados';
          break;
        case 1451: // ER_ROW_IS_REFERENCED_2
          message = 'Não é possível excluir. Registro possui dependências';
          break;
        case 1406: // ER_DATA_TOO_LONG
          message = 'Dados muito longos para o campo especificado';
          break;
        case 1048: // ER_BAD_NULL_ERROR
          message = 'Campo obrigatório não pode ser vazio';
          break;
        default:
          // Mensagem genérica para outros erros
          break;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro interno do servidor';
      error = 'InternalServerError';

      this.logger.error('Unhandled Exception:', exception);
    }

    const errorResponse: ApiResponseDto = {
      success: false,
      message,
      error,
    };

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
      exception instanceof Error ? exception.stack : exception,
    );

    response.status(status).json(errorResponse);
  }
}
