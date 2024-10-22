import { initContract } from '@ts-rest/core';
import { scienceItemBase, scienceListBaseSchema, scienceQueryPartialSchema, sciencetWithPagiSchema } from '../schemas/science.schemas';
import type { ScienceListDto, ScienceListWithPagiDto } from '../types/science.types';

const c = initContract();
export const scienceContract = c.router({
	getScienceList: {
		method: 'GET',
		path: '/science',
		responses: {
			200: sciencetWithPagiSchema,
		},
		query: scienceQueryPartialSchema,
		summary: 'science query list',
	},
	getScienceDetail: {
		method: 'GET',
		path: '/science/:id',
		responses: {
			200: scienceItemBase,
		},
		summary: 'single science item',
	},
});
