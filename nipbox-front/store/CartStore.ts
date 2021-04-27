import { action, computed, makeObservable, observable } from 'mobx';
import IShopItem from '../interfaces/IShopItem';

export default class CartStore {
	constructor() {
		if (process.browser) {
			this.items = JSON.parse(localStorage.getItem('cart')) ?? [];
		}

		makeObservable(this, {
			addItem: action,
			items: observable,
			getAmount: computed,
			minusItem: action,
			removeItem: action,
			setPixels: action,
			toFly: observable,
		});
	}

	items: ICartItem[] = [];
	toFly: {
		from: {
			x: number;
			y: number;
		};
		img: string;
	} = {
		from: {
			x: 0,
			y: 0,
		},
		img: '',
	};

	setPixels(data: {
		from: {
			x: number;
			y: number;
		};
		img: string;
	}) {
		console.log(data);
		this.toFly = data;
	}

	addItem(
		item: IShopItem,
		pixels?: {
			from: {
				x: number;
				y: number;
			};
			img: string;
		}
	) {
		const inCart = this.items.find((x) => x.item.id === item.id);

		if (inCart) {
			inCart.amount++;
		} else {
			this.items.push({
				amount: 1,
				item: item,
			});
		}

		if (pixels) {
			this.setPixels(pixels);
			// this.toFly = pixels;
		}

		this.save();

		//@ts-ignore
		if (window && window.VK) {
			//@ts-ignore
			window.VK.Goal('add_to_cart');
		}

		//@ts-ignore
		if (window && window.ym) {
			//@ts-ignore
			window.ym(72582790, 'reachGoal', 'add_to_cart');
		}
	}

	removeItem(item: IShopItem) {
		const inCart = this.items.findIndex((x) => x.item.id === item.id);

		if (inCart !== -1) {
			this.items.splice(inCart, 1);
		}

		this.save();
	}

	minusItem(item: IShopItem) {
		const inCart = this.items.find((x) => x.item.id === item.id);

		if (inCart) {
			if (inCart.amount === 1) {
				this.removeItem(item);
			} else {
				inCart.amount--;
			}

			this.save();
		}
	}

	get getAmount() {
		return this.items.reduce((prev, cur) => prev + cur.amount, 0);
	}

	private save() {
		localStorage.setItem('cart', JSON.stringify(this.items));
	}
}

export interface ICartItem {
	item: IShopItem;
	amount: number;
}
