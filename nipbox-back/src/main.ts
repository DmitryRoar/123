import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.setGlobalPrefix('api');

	app.use(
		cors({
			credentials: true,
			origin: (origin, cb) => {
				cb(null, true);
			},
		})
	);
	app.use(
		bodyParser.json({
			limit: '100mb',
		})
	);
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	app.use(helmet());

	app.use(cookieParser('lol'));

	await app.listen(process.env.PORT);
	Logger.log(
		`App listening on port ${process.env.PORT}, you can access it by http://localhost:${process.env.PORT}`,
		'MAIN'
	);
}
bootstrap();
