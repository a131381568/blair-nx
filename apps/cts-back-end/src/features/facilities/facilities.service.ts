import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { CreateFacilityItemDto, FacilityItemBaseDto, GetFacilitiesListBaseDto, NanoIdDto, UpdateFacilityItemDto } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class FacilitiesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getFacilitiesList(): Promise<GetFacilitiesListBaseDto> {
		const res = await this.prisma.facilitiesList.findMany({
			orderBy: { facilitiesOrderId: 'asc' },
			where: { published: true },
			take: 10,
		});

		return res.map(item => pick(item, ['facilitiesTitle', 'facilitiesDescription', 'facilitiesImage', 'facilitiesLink', 'facilitiesNanoId']));
	}

	async getFacilityItem({ id }: { id: NanoIdDto }): Promise<FacilityItemBaseDto | null> {
		const res = await this.prisma.facilitiesList.findFirst({
			where: { facilitiesNanoId: id, published: true },
		});
		return res ? pick(res, ['facilitiesTitle', 'facilitiesDescription', 'facilitiesImage', 'facilitiesLink']) : null;
	}

	async createFacilityItem({ data }: { data: CreateFacilityItemDto }): Promise<boolean> {
		const res = await this.prisma.facilitiesList.create({
			data: { ...data, published: true },
		});
		return Boolean(res);
	}

	async updateFacilityItem({ id, data }: { id: NanoIdDto; data: UpdateFacilityItemDto }): Promise<boolean> {
		const { count } = await this.prisma.facilitiesList.updateMany({
			where: { facilitiesNanoId: id },
			data,
		});
		return Boolean(count);
	}

	async deleteFacilityItem({ id }: { id: NanoIdDto }): Promise<boolean> {
		const { count } = await this.prisma.facilitiesList.updateMany({
			where: { facilitiesNanoId: id, published: true },
			data: { published: false },
		});
		return Boolean(count);
	}
}
