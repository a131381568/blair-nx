/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// import process from 'node:process';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';

	app.enableCors({ origin: '*', credentials: true });
	app.setGlobalPrefix(globalPrefix);

	const port = 3000; // process.env.PORT
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
	);
}

bootstrap();
