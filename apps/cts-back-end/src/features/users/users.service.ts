import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { tryit } from 'radash';
import { ExtendedPrismaClient, InjectPrismaClient } from '../shared/prisma.extension';

@Injectable()
export class UsersService {
	constructor(
		@InjectPrismaClient()
		private readonly prisma: ExtendedPrismaClient,
	) {}

	async findAll() {
		return this.prisma.users.findMany();
	}

	async registerUser(name: string, email: string, password: string) {
		const hashedPassword = hashSync(password, 10);

		return this.prisma.users.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
	}

	async findByEmail(email: string) {
		if (!email)
			return null;
		const [err, res] = await tryit(this.prisma.users.findFirst)({
			where: { email },
		});
		if (err || !res) {
			return null;
		}

		return {
			password: res.password,
		};
	}
}
