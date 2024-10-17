import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { createApiResponse } from '../interceptors/api-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const timestamp = new Date().toISOString();
		let errorMessage: string;
		let httpStatus: number;

		if (exception instanceof PrismaClientRustPanicError) {
			httpStatus = 400;
			errorMessage = exception.message;
		}
		else if (exception instanceof PrismaClientValidationError) {
			httpStatus = 422;
			errorMessage = exception.message;
		}
		else if (exception instanceof PrismaClientKnownRequestError) {
			httpStatus = 400;
			errorMessage = exception.message;
		}
		else if (exception instanceof PrismaClientUnknownRequestError) {
			httpStatus = 400;
			errorMessage = exception.message;
		}
		else if (exception instanceof PrismaClientInitializationError) {
			httpStatus = 400;
			errorMessage = exception.message;
		}
		else if (
			status
			&& status >= 400
			&& status <= 499
		) {
			httpStatus = status;
			errorMessage = exception.message;
		}
		else {
			httpStatus = 500;
			errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
		}

		const responseObject = createApiResponse(
			false,
			{
				code: httpStatus,
				name: exception.name,
				timestamp,
			},
			errorMessage,
		);

		response.status(status).json(responseObject);
	}
}
