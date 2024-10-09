import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, createApiResponse } from './api-response';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
		return next.handle().pipe(
			map((data) => {
				if (data && data.success !== undefined && data.data !== undefined) {
					return data as ApiResponse<T>;
				}
				return createApiResponse(true, data);
			}),
		);
	}
}
