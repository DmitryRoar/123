import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthModule from './modules/auth/auth.module';
import ReviewModule from './modules/review/review.module';
import ShopItemModule from './modules/shop-item/shop-item.module';
import VideoReviewModule from './modules/video-review/video-review.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import LocationModule from './modules/location/location.module';
import DeliveryModule from './modules/delivery/delivery.module';
import OrderModule from './modules/order/order.module';
import PageModule from './modules/pages/pages.module';
import AppConfigModule from './modules/app-config/app-config.module';
import PromocodeModule from './modules/promocodes/promocode.module';
import SeoConfigModule from './modules/seo-config/seo-config.module';
import BlogModule from './modules/blog/blog.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, '../static'),
			serveRoot: '/api/static',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_Host'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true,
			}),
		}),
    BlogModule,
		AuthModule,
		VideoReviewModule,
		ReviewModule,
		ShopItemModule,
		LocationModule,
		DeliveryModule,
		OrderModule,
		PageModule,
		AppConfigModule,
		PromocodeModule,
		SeoConfigModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
