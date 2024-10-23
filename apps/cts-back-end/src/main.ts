import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiResponseInterceptor } from './core/interceptors/api-response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';

	app.enableCors({ origin: '*', credentials: true });
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalInterceptors(new ApiResponseInterceptor());

	const port = 3000; // process.env.PORT
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();
