import { Injectable } from '@nestjs/common';
import { tryit } from 'radash';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';
import { PrismaService } from './prisma.service';

@Injectable()
export class BaseService {
	constructor(protected prisma: PrismaService) {}

	protected async executeOperation<T>(
		operation: () => Promise<T>,
    errorMessage: string = 'An error occurred',
    notFoundMessage: string = 'Resource not found',
    payload: T = {} as T,
	): Promise<ApiResponse<T>> {
		const [err, result] = await tryit(operation)();

		if (err) {
			return createApiResponse(false, payload, errorMessage);
		}

		if (result === null || (Array.isArray(result) && result.length === 0)) {
			return createApiResponse(false, payload, notFoundMessage);
		}

		return createApiResponse(true, result);
	}
}
