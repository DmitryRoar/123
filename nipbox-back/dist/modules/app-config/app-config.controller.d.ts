import AppConfigService from './app-config.service';
import EditAppConfig from './dto/edit-app-config.dto';
export default class AppConfigController {
    private appConfigService;
    constructor(appConfigService: AppConfigService);
    getConfig(): import("./app-config.service").IAppConfig;
    editConfig(dto: EditAppConfig): void;
}
