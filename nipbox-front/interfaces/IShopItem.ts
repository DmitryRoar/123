export default interface IShopItem {
	id: string;
	name: string;
	desc: string;
	amountDesc: string;
	mini: string;

	price: number;

	order: number;

	weight: number;

	media: {
		opened: string;
		closed: string;
		imgs: string[];
	};

	height: number;

	length: number;

	width: number;

	seoDesc: string;

	seoTags: string;
}
