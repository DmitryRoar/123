"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const review_module_1 = require("./modules/review/review.module");
const shop_item_module_1 = require("./modules/shop-item/shop-item.module");
const video_review_module_1 = require("./modules/video-review/video-review.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const location_module_1 = require("./modules/location/location.module");
const delivery_module_1 = require("./modules/delivery/delivery.module");
const order_module_1 = require("./modules/order/order.module");
const pages_module_1 = require("./modules/pages/pages.module");
const app_config_module_1 = require("./modules/app-config/app-config.module");
const promocode_module_1 = require("./modules/promocodes/promocode.module");
const seo_config_module_1 = require("./modules/seo-config/seo-config.module");
const blog_module_1 = require("./modules/blog/blog.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.resolve(__dirname, '../static'),
                serveRoot: '/api/static',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
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
            blog_module_1.default,
            auth_module_1.default,
            video_review_module_1.default,
            review_module_1.default,
            shop_item_module_1.default,
            location_module_1.default,
            delivery_module_1.default,
            order_module_1.default,
            pages_module_1.default,
            app_config_module_1.default,
            promocode_module_1.default,
            seo_config_module_1.default,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map