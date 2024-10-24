import { Injectable } from '@nestjs/common';
import { pick } from 'radash';
import { NanoIdDto, ObservatoriesListDto, ObservatoryItemDto, UpdateObservatoryItemDto } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class ObservatoriesService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getObservatoriesList(): Promise<ObservatoriesListDto> {
		const res = await this.prisma.observatoriesList.findMany({
			orderBy: { observatoryOrderId: 'asc' },
			where: { published: true },
		});
		return res.length ? res.map(item => pick(item, ['observatoryNanoId', 'observatoryCategoryName', 'observatoryCategoryId', 'observatoryPostContent'])) : [];
	}

	async getObservatoryItem({ id }: { id: NanoIdDto }): Promise<ObservatoryItemDto | null> {
		const res = await this.prisma.observatoriesList.findFirst({
			where: { observatoryNanoId: id, published: true },
		});
		return res ? pick(res, ['observatoryCategoryName', 'observatoryCategoryId', 'observatoryPostContent']) : null;
	}

	async createObservatoryItem({ data }: { data: UpdateObservatoryItemDto }): Promise<boolean> {
		const res = await this.prisma.observatoriesList.create({
			data: { ...data, published: true },
		});
		return Boolean(res);
	}

	async updateObservatoryItem({ id, data }: { id: NanoIdDto; data: UpdateObservatoryItemDto }): Promise<boolean> {
		const { count } = await this.prisma.observatoriesList.updateMany({
			where: { observatoryNanoId: id, published: true },
			data,
		});
		return Boolean(count);
	}

	async deleteObservatoryItem({ id }: { id: NanoIdDto }): Promise<boolean> {
		const { count } = await this.prisma.observatoriesList.updateMany({
			where: { observatoryNanoId: id, published: true },
			data: { published: false },
		});
		return Boolean(count);
	}
}
