declare class Sdek {
    account: string;
    password: string;
    sdekCityId: string;
}
declare class Bxb {
    code: string;
    token: string;
}
declare class Payments {
    secret: string;
}
declare class UKassa {
    merchant_id: string;
    secret: string;
}
declare class IAppConfig {
    rfIndex: string;
    sdek: Sdek;
    bxb: Bxb;
    payments: Payments;
    daDataKey: string;
    uKassa: UKassa;
}
export default class EditAppConfig {
    data: IAppConfig;
}
export {};
