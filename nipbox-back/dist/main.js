"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cors = require("cors");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cors({
        credentials: true,
        origin: (origin, cb) => {
            cb(null, true);
        },
    }));
    app.use(bodyParser.json({
        limit: '100mb',
    }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(helmet());
    app.use(cookieParser('lol'));
    await app.listen(process.env.PORT);
    common_1.Logger.log(`App listening on port ${process.env.PORT}, you can access it by http://localhost:${process.env.PORT}`, 'MAIN');
}
bootstrap();
//# sourceMappingURL=main.js.map