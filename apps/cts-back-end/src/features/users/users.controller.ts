import { BadRequestException, Body, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterPayloadDto, usersContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { UsersService } from './users.service';

const GET_QUERY = 'getUserList';
const REGISTER = 'registerUser';
const c = nestControllerContract(usersContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(AuthGuard('jwt'))
	@TsRestHandler(c[GET_QUERY])
	async getUserList() {
		return tsRestHandler(c[GET_QUERY], async (_reqInfo): Promise<ResponseShapes[typeof GET_QUERY]> => {
			const listData = await this.usersService[GET_QUERY]();
			return { status: 200, body: listData };
		});
	}

	@TsRestHandler(c[REGISTER])
	async registerUser(@Body() data: RegisterPayloadDto) {
		return tsRestHandler(c[REGISTER], async (_reqInfo): Promise<ResponseShapes[typeof REGISTER]> => {
			const { result, msg } = await this.usersService[REGISTER]({ data });
			if (!result)
				throw new BadRequestException(msg);
			return { status: 200, body: 'Successfully registered' };
		});
	}
}
