import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { createApiResponse } from '../interceptors/api-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const message = exception.message;
		const timestamp = new Date().toISOString();

		const responseObject = createApiResponse(
			false,
			{
				code: status,
				name: exception.name,
				timestamp,
			},
			message,
		);

		response.status(status).json(responseObject);
	}
}
