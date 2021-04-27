import { ValidateNested } from 'class-validator';


class Sdek {
	account: string;
	password: string;
	sdekCityId: string;
}

class Bxb {
	code: string;
	token: string;
}

class Payments {
	secret: string;
}

class UKassa {
	merchant_id: string;
	secret: string;
}

class IAppConfig {
	rfIndex: string;
	sdek: Sdek;
	bxb: Bxb;
	payments: Payments;
	daDataKey: string;
	uKassa: UKassa;
}


export default class EditAppConfig {
	@ValidateNested()
	data: IAppConfig;
}
