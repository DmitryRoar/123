import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import LocationEntity from '../../entities/Location.entity';
import ShopItemEntity from '../../entities/ShopItem.entity';
import * as qr from 'querystring';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import axios from 'axios';

@Injectable()
export default class DeliveryService {
	private url = 'https://api.cdek.ru/v2';

	private token = {
		value: '',
		expiresAt: new Date(Date.now() - 1),
	};

	private getConfig() {
		const config: {
			rfIndex: '';
			sdek: {
				account: string;
				password: string;
				sdekCityId: string;
			};
			bxb: {
				code: string;
				token: string;
			};
		} = JSON.parse(readFileSync(resolve(__dirname, '../../../post.config.json')).toString());

		return config;
	}

	private async getToken() {
		if (this.token.expiresAt.getTime() > Date.now() + 1000) {
			return this.token.value;
		} else {
			const config = this.getConfig();

			const res = await Axios.post(
				`${this.url}/oauth/token?${qr.stringify({
					grant_type: 'client_credentials',
					client_id: config.sdek.account,
					client_secret: config.sdek.password,
				})}`
			);
			const data = res.data;

			this.token.value = data.access_token;
			this.token.expiresAt = new Date(Date.now() + data.expires_in * 1000);

			return this.token.value;
		}
	}

	async getDeliveryPriceByCart(
		toZip: string,
		itemsToDeliver: { id: string; amount: number }[],
		type: 'rf' | 'sdek' | 'bxb',
		cu: 'Россия' | 'Беларусь' | 'Казахстан'
	) {
		const items: { item: ShopItemEntity; amount: number }[] = [];

		for (const i of itemsToDeliver) {
			const x = await ShopItemEntity.findOne({
				where: {
					id: i.id,
				},
			});

			if (!x) continue;

			items.push({
				item: x,
				amount: i.amount,
			});
		}

		const config = this.getConfig();

		if (cu !== 'Россия') {
			const firstKilloRate = cu === 'Казахстан' ? 1140 : 1236;
			const secondKIllorate = cu === 'Казахстан' ? 200 : 230;
			const price = items.reduce((prev, curr) => {
				const weight = Math.ceil(curr.item.weight / 1000) - 1;
				const price = firstKilloRate + weight * secondKIllorate;

				return prev + price * curr.amount;
			}, 0);

			// console.log(price)

			return {
				type: 'ПОЧТА РОССИИ',
				price: price,
				period: 'От 3 дней',
			};
		}

		switch (type) {
			case 'bxb':
				return {
					...(await this.getBxbDeliveryPrice(toZip, config.bxb.code, config.bxb.token, items)),
					type: 'Boxberry',
				};
			case 'sdek':
				return {
					...(await this.getSdekDeliveryPrice(toZip, items, config.sdek.sdekCityId)),
					type: 'СДЭК',
				};
			default:
				return {
					...(await this.deliveryPostRf(toZip, items, config.rfIndex)),
					type: 'ПОЧТА РОССИИ',
				};
		}

		// return await this.getDeliveryPrice(to, items, fromLoc);
	}

	private async getBxbDeliveryPrice(
		zip: string,
		fromCode: string,
		token: string,
		items: { item: ShopItemEntity; amount: number }[]
	) {
		// const weight = items.reduce((prev, curr) => prev + curr.item.weight * curr.amount, 0);
		// const price = this.getCartPrice(items);

		try {
			const zipRes = await axios.get(
				`https://api.boxberry.ru/json.php?token=${token}&method=ZipCheck&Zip=${zip}`
			);

			if (zipRes.data.err) {
				return {
					err: 'Доставка через boxberry невозможна',
				};
			}

			const weights: { amount: number; weight: number; price: number; period: string }[] = [];

			for (const item of items) {
				const weightItem = weights.find((x) => x.weight === item.item.weight);

				if (!weightItem) {
					const params = qr.stringify({
						token: token,
						weight: item.item.weight,
						targetstart: fromCode,
						ordersum: item.item.price,
						deliverysum: 0,
						paysum: 0,
						zip: zip,
						sucrh: 1,
						method: 'DeliveryCosts',
					});
					try {
						const res = await axios.get(`https://api.boxberry.ru/json.php?${params}`);

						const data: { price: string; delivery_period: string; err?: any } = res.data;

						if (data.err) {
							return {
								err: 'Доставка через boxberry невозможна',
							};
						}

						weights.push({
							amount: item.amount,
							price: parseInt(data.price),
							weight: item.item.weight,
							period: data.delivery_period,
						});
					} catch (err) {
						console.error(err);
						return {
							err: 'Доставка boxberry недоступна',
						};
					}
				} else {
					weightItem.amount++;
				}
			}

			const deliverySum = weights.reduce((prev, curr) => {
				return prev + curr.amount * curr.price;
			}, 0);

			if (deliverySum === 0) {
				return {
					err: 'Доставка boxberry недоступна',
				};
			}

			return {
				price: deliverySum,
				period: `${weights[0].period} дн.`,
			};
		} catch (err) {
			console.error(err);
			return {
				err: 'Доставка boxberry недоступна',
			};
		}
	}

	private getCartPrice(cart: { item: ShopItemEntity; amount: number }[]) {
		return cart.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0);
	}

	async loadCities() {
		const citiesJSON = readFileSync(resolve(__dirname, '../../../cities_json/blr_cities.json'));
		const citites: any[] = JSON.parse(citiesJSON.toString());

		const c = citites.map((x) => {
			const city: any = {};
			if (x.ID) {
				city.sdek_id = x.ID.toString();
			}
			city.full_name = x.FullName;
			city.city_name = x.CityName;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			city.obl_name = x.OblName;
			city.center = x.Center;
			if (x.NalSumLimit && x.NalSumLimit.toString()) {
				city.nal_sum_limit = x.NalSumLimit.toString();
			}
			city.eng_name = x.EngName;
			city.post_code_list = x.PostCodeList;
			city.eng_full_name = x.EngFullName;
			city.eng_obl_name = x.EngOblName;
			city.country_code = x.CountryCode;
			city.country_name = x.CountryName;
			city.eng_country_name = x.EngCountryName;
			city.full_name_fias = x.FullNameFIAS;
			city.fias = x.FIAS;
			city.kladr = x.KLADR;
			city.city_dd = x.cityDD;
			city.pvz_code = x.pvzCode;

			return city;
		});

		for (let i = 0; i < c.length; i += 100) {
			console.log(`${i}/${c.length}`);
			await LocationEntity.insert(c.slice(i, i + 100));
		}

		return true;
	}

	private async getSdekDeliveryPrice(
		toZip: string,
		itemsToDeliver: { item: ShopItemEntity; amount: number }[],
		fromCityId: string
	) {
		const from = await LocationEntity.findOne({ where: { sdek_id: fromCityId } });

		const loc = await LocationEntity.createQueryBuilder().where(`"post_code_list" @> '{${toZip}}'`).getOne();

		if (!loc) {
			console.log(toZip);
			return {
				err: 'Сдэк доставка недоступна для этого адресса',
			};
		}

		const weightItems: {
			weight: number;
			length: number;
			width: number;
			height: number;
			amount: number;
			price: number;
			period: string;
		}[] = [];

		for (const item of itemsToDeliver) {
			const weightItem = weightItems.find(
				(x) =>
					x.height === item.item.height &&
					x.width === item.item.width &&
					x.length === item.item.length &&
					x.weight === item.item.weight
			);

			if (!weightItem) {
				const data = await this.postSdek(
					{
						currency: '1',
						type: '1',
						tariff_code: '136',
						from_location: {
							code: from.sdek_id,
						},
						to_location: {
							code: loc.sdek_id,
						},
						packages: {
							weight: item.item.weight,
							length: item.item.length,
							width: item.item.width,
							height: item.item.height,
						},
					},

					'/calculator/tariff'
				);

				if (!data || data.errors) {
					console.log(data.errors);
					return {
						err: 'Доставка Сдэк невозможна',
					};
				}

				weightItems.push({
					amount: item.amount,
					height: item.item.height,
					length: item.item.length,
					price: data.total_sum,
					weight: item.item.weight,
					width: item.item.width,
					period: `до ${data.period_max} дн.`,
				});
			} else {
				weightItem.amount++;
			}
		}

		return {
			price: Math.trunc(weightItems.reduce((prev, curr) => prev + curr.amount * curr.price, 0)),
			period: `${weightItems[0].period}`,
		};
	}

	async deliveryPostRf(to: string, items: { item: ShopItemEntity; amount: number }[], fromLoc: string) {
		const weights: { weight: number; amount: number; price: number }[] = [];

		for (const x of items) {
			const weightItem = weights.find((c) => c.weight === x.item.weight);

			if (!weightItem) {
				const date = new Date();
				try {
					const res = await Axios.get(
						`https://tariff.pochta.ru/v2/calculate/tariff?json&object=4030&weight=${
							x.item.weight
						}&from=${fromLoc}&to=${to}&closed=1&date=${date
							.toISOString()
							.split('T')[0]
							.split('-')
							.join('')}`
					);

					const data = res.data;
					weights.push({
						amount: x.amount,
						price: Math.trunc(data.paynds / 100),
						weight: x.item.weight,
					});
				} catch (err) {
					console.log(err);
					return {
						err: 'Доставка Почтой России недоступна',
					};
				}
			}
		}

		return {
			price: weights.reduce((prev, curr) => prev + curr.amount * curr.price, 0),
			period: 'от 3 дней',
		};
	}

	private async postSdek(data: any, url: string) {
		try {
			console.log(`${this.url}${url}`);
			const res = await Axios.post(`${this.url}${url}`, data, {
				headers: {
					Authorization: `Bearer ${await this.getToken()}`,
				},
			});

			return res.data;
		} catch (err) {
			// console.log(err.response);
			return false;
		}
	}
}
