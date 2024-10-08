import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { omit, tryit } from 'radash';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';
import { generateResult } from '../../common/update-response';
import { UpdateResponsetDto } from '../../common/shared-schemas';
import type { CreateFacilityItemDto, GetFacilitiesListBaseDto, GetFacilityItemFullDto, UpdateFacilityItemDto } from './facilities-schemas';
import { createFacilityItemSchema, updateFacilityItemSchema } from './facilities-schemas';

@Injectable()
export class FacilitiesService {
	constructor(private prisma: PrismaService) {}

	async getFacilitiesList(): Promise<GetFacilitiesListBaseDto> {
		const res = await this.prisma.facilitiesList.findMany({
			where: { published: true },
			take: 3,
		});
		return res.map(item => omit(item, ['published', 'facilitiesOrderId']));
	}

	async getFacilityItem(id: number): Promise<GetFacilityItemFullDto> {
		const [err, res] = await tryit(this.prisma.facilitiesList.findMany)({
			where: { facilitiesOrderId: id },
		});
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
	): Promise<UpdateResponsetDto> {
		try {
			const validatedData = updateFacilityItemSchema.parse(data);

			const [err, res] = await tryit(this.prisma.facilitiesList.findMany)({
				where: { facilitiesOrderId: id },
			});
			if (err || (res && !res.length))
				return generateResult(false, data, 'FacilityId not found');

			const [updateError] = await tryit(this.prisma.facilitiesList.update)({
				where: { facilitiesOrderId: id },
				data: validatedData,
			});
			if (updateError)
				return generateResult(false, data, 'Update failure');
			return generateResult(true, data, 'Update success');
		}
		catch (error: unknown | z.ZodError | Prisma.PrismaClientKnownRequestError) {
			return generateResult(false, data, 'Validated failed');
		}
	}

	async createFacilityItem(data: CreateFacilityItemDto): Promise<UpdateResponsetDto> {
		try {
			const validatedData = createFacilityItemSchema.parse(data);
			const totalCount = await this.prisma.facilitiesList.count();
			const [createError] = await tryit(this.prisma.facilitiesList.create)({
				data: {
					...validatedData,
					published: true,
					facilitiesOrderId: 1 + totalCount,
				},
			});
			if (createError)
				return generateResult(false, data, 'Create failure');
			return generateResult(true, data, 'Create success');
		}
		catch (error: unknown | z.ZodError | Prisma.PrismaClientKnownRequestError) {
			return generateResult(false, data, 'Validated failed');
		}
	}

	async deleteFacilityItem(id: number): Promise<UpdateResponsetDto> {
		const indexVal = { facilitiesOrderId: id };
		const [error] = await tryit(this.prisma.facilitiesList.update)({
			where: indexVal,
			data: { published: false },
		});
		if (error)
			return generateResult(false, indexVal, 'Delete failed');
		return generateResult(true, indexVal, 'Delete success');
	}
}
