import IShopItem from './IShopItem';

export default interface IOrder {
	id: string;
	paymentId: string;
	status: string;
	adress: string;
	index: string;
	items: {
		item: IShopItem;
		amount: number;
	}[];

	promocode?: {
		text: string;
		precentage: number;
	};

	country: string;

	name: string;
	email: string;
	phone: string;

	created_at: Date;

	xls: boolean;

	bxb: {
		track: string;
		label: string;
		itemName: string;
	}[];

	sdek: {
		uuid: string;
		itemName: string;
	}[];

	deliveryType: string;

	deliverySum: number;
	sum: number;

	trafic: string;
}
