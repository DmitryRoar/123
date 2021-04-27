import EditAppConfig from './dto/edit-app-config.dto';
export default class AppConfigService {
    getConfig(): IAppConfig;
    editConfig(dto: EditAppConfig): void;
    saveConfig(config: IAppConfig): boolean;
}
export interface Sdek {
    account: string;
    password: string;
    sdekCityId: string;
}
export interface Bxb {
    code: string;
    token: string;
}
export interface Payments {
    secret: string;
}
export interface UKassa {
    merchant_id: string;
    secret: string;
}
export interface IAppConfig {
    rfIndex: string;
    sdek: Sdek;
    bxb: Bxb;
    payments: Payments;
    daDataKey: string;
    uKassa: UKassa;
}
