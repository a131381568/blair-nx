import { initQueryClient } from '@ts-rest/vue-query';
import type { ApiFetcherArgs } from '@ts-rest/core';
import axios from 'axios';
import {
	aboutInfoContract,
	authContract,
	facilitiesContract,
	fileContract,
	observatoriesContract,
	pageInfoContract,
	postCategoriesContract,
	scienceContract,
	stargazingContract,
	usersContract,
} from '@cts-shared';
import { QUERY_CONFIG, url } from '@ctsf-src/services/utils/config';
import { axiosInstance } from './interceptors';

export const queryClient = initQueryClient(
	{
		...aboutInfoContract,
		...authContract,
		...facilitiesContract,
		...fileContract,
		...observatoriesContract,
		...pageInfoContract,
		...postCategoriesContract,
		...scienceContract,
		...stargazingContract,
		...usersContract,
	},
	{
		baseUrl: url,
		api: async (args: ApiFetcherArgs) => {
			try {
				const response = await axiosInstance({
					url: args.path,
					method: args.method,
					data: args.body,
					headers: args.headers,
				});

				return {
					status: response.status,
					body: response.data,
					headers: new Headers(response.headers as any),
				};
			}
			catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					return {
						status: error.response.status,
						body: error.response.data,
						headers: new Headers(error.response.headers as any),
					};
				}
				throw error;
			}
		},
	},
);

// Re-export constants
export const { STALE_TIME, CACHE_TIME } = QUERY_CONFIG;

// Type definitions
export interface vueQueryRes<T> {
	status: number;
	body: T;
	headers: unknown;
}
