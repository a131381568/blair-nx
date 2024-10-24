import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { pick } from 'radash';
import { ApiResponse, EmailDto, RegisterPayloadDto, UserBaseDto, UserBaseFitDto, createApiResponse } from '@cts-shared';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class UsersService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async getUserList(): Promise<UserBaseFitDto[]> {
		const res = await this.prisma.users.findMany({
			orderBy: { orderId: 'asc' },
		});
		return res.map(item => pick(item, ['name', 'email', 'nanoId']));
	}

	async getPassByEmail({ data }: { data: EmailDto }): Promise<ApiResponse<UserBaseDto>> {
		const res = await this.prisma.users.findFirst({
			where: { email: data.email },
		});
		if (!res)
			return createApiResponse(false, null, 'User not found');
		return createApiResponse(true, pick(res, ['email', 'name', 'nanoId', 'password']));
	}

	async registerUser({ data }: { data: RegisterPayloadDto }): Promise<{ result: boolean;msg: string }> {
		const { success: hasMail } = await this.getPassByEmail({ data: {
			email: data.email,
		} });

		if (hasMail)
			return { result: false, msg: 'The email is already registered' };

		const hashedPassword = hashSync(data.password, 10);
		await this.prisma.users.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});
		return { result: true, msg: 'Successfully registered' };
	}
}
