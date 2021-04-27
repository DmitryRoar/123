import { BaseEntity } from 'typeorm';
export default class LocationEntity extends BaseEntity {
    id: string;
    sdek_id: string;
    full_name: string;
    city_name: string;
    obl_name: string;
    center: string;
    nal_sum_limit: string;
    eng_name: string;
    post_code_list: string[];
    eng_full_name: string;
    eng_obl_name: string;
    country_code: CountryCode;
    country_name: string;
    eng_country_name: string;
    full_name_fias: string;
    fias: string;
    kladr: string;
    city_dd: number;
    pvz_code: string;
}
export declare enum CountryCode {
    RU = 1,
    KZ = 48,
    BLR = 42
}
