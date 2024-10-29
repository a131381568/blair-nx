import { initQueryClient } from '@ts-rest/vue-query';
import { url } from '@ctsf-src/services/utils/config';
import { aboutInfoContract, authContract, facilitiesContract, fileContract, observatoriesContract, pageInfoContract, postCategoriesContract, scienceContract, stargazingContract, usersContract } from '@cts-shared';

export const STALE_TIME = 1000 * 60 * 3;
export const CACHE_TIME = 1000 * 60 * 5;

export interface vueQueryRes<T> {
	status: number;
	body: T;
	headers: unknown;
}

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
	},
);
