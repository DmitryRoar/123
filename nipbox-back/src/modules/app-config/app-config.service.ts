import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import EditAppConfig from './dto/edit-app-config.dto';

@Injectable()
export default class AppConfigService {
	getConfig() {
		const data: IAppConfig = JSON.parse(readFileSync(resolve(__dirname, '../../../post.config.json')).toString());

		return data;
	}

	editConfig(dto: EditAppConfig) {
		this.saveConfig(dto.data);
	}

	saveConfig(config: IAppConfig) {
		writeFileSync(resolve(__dirname, '../../../post.config.json'), JSON.stringify(config, null, 2));

		return true;
	}
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
