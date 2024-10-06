import { Module } from '@nestjs/common';
import { DemoModule } from './modules/demo/demo.module';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './shared/prisma.module';

@Module({
	imports: [UserModule, DemoModule, PrismaModule],
	// controllers: [AppController],
	// providers: [AppService],
})
export class AppModule {}
