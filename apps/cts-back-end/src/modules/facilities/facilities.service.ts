import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { map, omit } from 'remeda';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma.service';
import to from '../../helper/await-to-js';
import type { CreateFacilityItemDto, GetFacilitiesListBaseDto, GetFacilitiesListDto, GetFacilityItemFullDto, UpdateFacilityItemDto, UpdateFacilityResponsetDto } from './facilities-schemas';
import { createFacilityItemSchema, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(private prisma: PrismaService) {}

	async getFacilitiesList(): Promise<GetFacilitiesListBaseDto> {
		const res = await this.prisma.facilitiesList.findMany({
			where: { published: true },
			take: 3,
		});
		return map(res, item => omit(item, ['published', 'facilitiesOrderId']));
	}

	async getFacilityItem(id: number): Promise<GetFacilityItemFullDto> {
		const [err, res] = await to<GetFacilitiesListDto>(this.prisma.facilitiesList.findMany({
			where: { facilitiesOrderId: id },
		}));
		if (err || (res && !res.length)) {
			return {
				facilitiesTitle: '',
				facilitiesDescription: '',
				facilitiesImage: '',
				facilitiesLink: '',
				facilitiesOrderId: 0,
				published: false,
			};
		}
		return res[0];
	}

	async updateFacilityItem(
		id: number,
		data: UpdateFacilityItemDto,
	): Promise<UpdateFacilityResponsetDto> {
		try {
			const validatedData = updateFacilityItemSchema.parse(data);

			const [err, res] = await to<GetFacilitiesListDto>(this.prisma.facilitiesList.findMany({
				where: { facilitiesOrderId: id },
			}));
			if (err || (res && !res.length))
				return generateResult(false, data, 'FacilityId not found');

			const [updateError] = await to<GetFacilityItemFullDto>(this.prisma.facilitiesList.update({
				where: { facilitiesOrderId: id },
				data: validatedData,
			}));
			if (updateError)
				return generateResult(false, data, 'Update failure');
			return generateResult(true, data, 'Update success');
		}
		catch (error: unknown | z.ZodError | Prisma.PrismaClientKnownRequestError) {
			return generateResult(false, data, 'Validated failed');
		}
	}

	async createFacilityItem(data: CreateFacilityItemDto): Promise<UpdateFacilityResponsetDto> {
		try {
			const validatedData = createFacilityItemSchema.parse(data);
			const totalCount = await this.prisma.facilitiesList.count();
			const [createError] = await to<GetFacilityItemFullDto>(this.prisma.facilitiesList.create({
				data: {
					...validatedData,
					published: true,
					facilitiesOrderId: 1 + totalCount,
				},
			}));
			if (createError)
				return generateResult(false, data, 'Create failure');
			return generateResult(true, data, 'Create success');
		}
		catch (error: unknown | z.ZodError | Prisma.PrismaClientKnownRequestError) {
			return generateResult(false, data, 'Validated failed');
		}
	}

	async deleteFacilityItem(id: number): Promise<UpdateFacilityResponsetDto> {
		const indexVal = { facilitiesOrderId: id };
		const [error] = await to<GetFacilityItemFullDto>(this.prisma.facilitiesList.update({
			where: indexVal,
			data: { published: false },
		}));
		if (error)
			return generateResult(false, indexVal, 'Delete failed');
		return generateResult(true, indexVal, 'Delete success');
	}
}

function generateResult(
	success: boolean,
	payload: UpdateFacilityItemDto,
	message: string,
) {
	return {
		success,
		payload,
		message,
	};
};
