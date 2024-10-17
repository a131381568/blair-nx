import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { pick } from 'radash';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';
import { ErrorAdditional, ValidationAdditional } from '../shared/response-handler';
import { EmailDto, RegisterPayloadDto, UserBaseDto, emailSchema, registerPayloadSchema, userBaseFitDto } from '../shared/users-schemas';
import { ApiResponse, createApiResponse } from '../../core/interceptors/api-response';

@Injectable()
export class UsersService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	@ErrorAdditional([])
	async getUserList(): Promise<ApiResponse<userBaseFitDto[]>> {
		const res = await this.prisma.users.findMany({
			orderBy: { orderId: 'asc' },
		});

		return createApiResponse(
			true,
			res.map(item => pick(item, ['name', 'email', 'nanoId'])),
		);
	}

	@ValidationAdditional(emailSchema)
	@ErrorAdditional()
	async getPassByEmail({ data }: { data: EmailDto }): Promise<ApiResponse<UserBaseDto>> {
		const res = await this.prisma.users.findFirst({
			where: { email: data.email },
		});
		if (!res)
			return createApiResponse(false, null, 'User not found');
		return createApiResponse(true, pick(res, ['email', 'name', 'nanoId', 'password']));
	}

	@ValidationAdditional(registerPayloadSchema)
	@ErrorAdditional()
	async registerUser({ data }: { data: RegisterPayloadDto }): Promise<ApiResponse<null>> {
		const { success: hasMail } = await this.getPassByEmail({ data: {
			email: data.email,
		} });

		if (hasMail)
			return createApiResponse(false, null, 'The email is already registered');

		const hashedPassword = hashSync(data.password, 10);
		await this.prisma.users.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});
		return createApiResponse(true, null, 'Create success');
	}
}
