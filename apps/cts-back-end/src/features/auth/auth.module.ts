import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTH_CONFIG } from '@cts-shared';
import { UsersModule } from '../users/users.module'; // Import UsersModule to access user service
import { PrismaModule } from '../shared/prisma.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		PrismaModule,
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET, // Use env var for production
			signOptions: { expiresIn: AUTH_CONFIG.TOKEN_EXPIRY }, // Access token expiration time
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
