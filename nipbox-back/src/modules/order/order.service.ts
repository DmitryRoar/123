import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import axios from 'axios';
import { Request } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';
import CartItemEntity from '../../entities/CartItem.entity';
import PurchaseEntity from '../../entities/Purchase.entity';
import ShopItemEntity from '../../entities/ShopItem.entity';
import DeliveryService from '../delivery/delivery.service';
import OrderCreateDto from './dto/order-create.dto';
import * as json2xls from 'json2xls';
import * as qr from 'querystring';
import LocationEntity from '../../entities/Location.entity';
import { Not } from 'typeorm';
import * as nodemailer from 'nodemailer';
import mailInsertor from '../../utils/mailInsertor';
import Promocode from '../../entities/Promocode.entity';

const transporter = nodemailer.createTransport({
	pool: true,
	host: 'smtp.yandex.ru',
	port: 465,
	secure: true,
	auth: {
		user: 'info@nipbox.ru',
		pass: 'denter23',
	},
});

transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take our messages');
	}
});

@Injectable()
export default class OrderService {
	constructor(private deliveryService: DeliveryService) {}

	private url = 'https://api.cdek.ru/v2';

	private token = {
		value: '',
		expiresAt: new Date(Date.now() - 1),
	};

	async findAll() {
		return await PurchaseEntity.find({
			order: {
				id: 'DESC',
			},
			where: {
				status: Not('removed'),
			},
		});
	}

	async setStatus(status: string, id: string) {
		const order = await PurchaseEntity.findOne({
			where: {
				id: id,
			},
		});

		if (order) {
			order.status = status;
			await order.save();

			if (order.status === 'succeeded') {
				transporter.sendMail({
					from: 'info@nipbox.ru',
					to: order.email,
					subject: 'Ваш заказ на nipbox.ru',
					text: '',
					html: mailInsertor(order),
				});
			}
		}

		return true;
	}

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

			const res = await axios.post(
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

	async sendTracks(email: string, tracks: string[]) {
		transporter.sendMail({
			from: 'info@nipbox.ru',
			to: email,
			subject: 'Трек коды заказа с nipbox.ru',
			text: '',
			html: `<b>Ваши трек коды</b><br/> <ul>${tracks.map((t) => {
				return `<li>${t}</li>`;
			})}</ul>`,
		});

		return true;
	}

	async validateOrder(req: Request, id?: string) {
		const { type, event, object } = req.body;
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if (id) {
			const order = await PurchaseEntity.findOne({
				where: {
					id: id,
				},
			});

			if (order && order.status !== 'succeeded') {
				order.status = 'succeeded';
				await order.save();
				try {
					if (order.deliveryType === 'ПОЧТА РОССИИ') {
						await this.generatePochtaRfXlses(order);
					}

					if (order.deliveryType === 'Boxberry') {
						console.log('bxb');
						await this.generateBxbOrder(order);
					}

					if (order.deliveryType === 'СДЭК') {
						console.log('СДЭК');
						await this.generateSdek(order);
					}
				} catch (err) {
					console.error(`[ERROR IN ORDER SERVICE VALIDATION] ${new Date().toLocaleString()} `);
					console.error(err);
				} finally {
					transporter
						.sendMail({
							from: 'info@nipbox.ru',
							to: order.email,
							subject: 'Ваш заказ на nipbox.ru',
							text: '',
							html: mailInsertor(order),
						})
						.catch((err) => {
							console.error(`[ ERROR IN ORDER EMAIL SENDING ]`);
							console.error(err);
						});
				}

				return true;
			} else {
				return true;
			}
		}

		console.log(ip);
		if (!type || type !== 'notification') {
			console.log('wrong notification');
			throw new HttpException('', HttpStatus.FORBIDDEN);
		}

		if (!event || event !== 'payment.succeeded') {
			console.log('wrong event');
			return 'wrong event';
			// throw new HttpException('', HttpStatus.FORBIDDEN);
		}

		try {
			const config: { uKassa: { merchant_id: string; secret: string } } = JSON.parse(
				readFileSync(resolve(__dirname, '../../../post.config.json')).toString()
			);

			const res = await axios.get(`https://api.yookassa.ru/v3/payments/${id ? id : object.id}`, {
				headers: {
					Authorization: `Basic ${Buffer.from(
						`${config.uKassa.merchant_id}:${config.uKassa.secret}`
					).toString('base64')}`,
				},
			});

			const data = res.data;
			if (data.status === 'succeeded') {
				const order = await PurchaseEntity.findOne({
					where: {
						paymentId: data.id,
					},
				});

				console.log(order)

				if (order && order.status !== 'succeeded') {
					order.status = data.status;
					await order.save();
					if (order.deliveryType === 'ПОЧТА РОССИИ') {
						console.log('rf');
						await this.generatePochtaRfXlses(order);
					}

					if (order.deliveryType === 'Boxberry') {
						console.log('bxb');
						await this.generateBxbOrder(order);
					}

					if (order.deliveryType === 'СДЭК') {
						console.log('СДЭК');
						await this.generateSdek(order);
					}

					transporter
					.sendMail({
						from: 'info@nipbox.ru',
						to: order.email,
						subject: 'Ваш заказ на nipbox.ru',
						text: '',
						html: mailInsertor(order),
					})
					.catch((err) => {
						console.error(`[ ERROR IN ORDER EMAIL SENDING ]`);
						console.error(err);
					});

					return true;
				}
			}
		} catch (err) {
			console.log(err);
			throw new HttpException('', 500);
		}
	}

	async generatePochtaRfXlses(purchase: PurchaseEntity) {
		const config: { rfIndex: string; uKassa: { merchant_id: string; secret: string } } = JSON.parse(
			readFileSync(resolve(__dirname, '../../../post.config.json')).toString()
		);
		const data = purchase.items.map((x) => {
			return {
				ADDRESSLINE: purchase.adress,
				ADRESAT: purchase.name,
				MASS: (x.item.weight / 1000).toFixed(2),
				VALUE: '',
				PAYMENT: '',
				COMMENT: '',
				TELADDRESS: '',
				MAILTYPE: '4',
				MAILCATEGORY: '',
				INDEXFROM: config.rfIndex,
				VLENGTH: '',
				VWIDTH: '',
				VHEIGHT: '',
				FRAGILE: '',
				ENVELOPETYPE: '',
				NOTIFICATIONTYPE: '',
				COURIER: '',
				SMSNOTICERECIPIENT: '',
				WOMAILRANK: '',
				PAYMENTMETHOD: '',
				NOTICEPAYMENTMETHOD: '',
				COMPLETENESSCHECKING: '',
				NORETURN: '',
				VSD: '',
				TRANSPORTMODE: '',
				EASYRETURN: '',
				BRANCHNAME: '',
				GROUPREFERENCE: '',
				INNERNUM: '',
			};
		});

		const xls = json2xls(data);

		writeFileSync(resolve(__dirname, `../../../static/xls/${purchase.id}.xls`), xls, {
			encoding: 'binary',
		});

		purchase.xls = true;
		await purchase.save();
	}

	async generateBxbOrder(purchase: PurchaseEntity) {
		const config: { bxb: { code: string; token: string } } = JSON.parse(
			readFileSync(resolve(__dirname, '../../../post.config.json')).toString()
		);

		try {
			const tokens: {
				track: string;
				label: string;
				itemName: string;
			}[] = [];

			for (const item of purchase.items) {
				for (let i = 0; i < item.amount; i++) {
					const res = await axios.post('https://api.boxberry.ru/json.php', {
						token: config.bxb.token,
						order_id: `${purchase.id}---${v4().split('-').join('').slice(0, 5)}`,
						price: '0',
						payment_sum: '0',
						vid: '2',
						kurdost: {
							addressp: purchase.adress,
							index: purchase.index,
						},

						method: 'ParselCreate',
						shop: { name1: config.bxb.code },
						customer: {
							fio: purchase.name,
							phone: purchase.phone,
							email: purchase.email,
						},

						items: [
							{
								name: item.item.name,
								price: 0,
								quantity: 1,
							},
						],
						weights: {
							weight: item.item.weight,
							x: item.item.length,
							y: item.item.height,
							z: item.item.width,
						},
					});

					const data = res.data;

					tokens.push({
						label: data.label,
						track: data.track,
						itemName: item.item.name,
					});
				}
			}

			purchase.bxb = tokens;
			await purchase.save();
		} catch (err) {
			console.log(err);
		}
	}

	async generateSdek(order: PurchaseEntity) {
		const data: {
			uuid: string;
			itemName: string;
		}[] = [];
		const config = this.getConfig();

		const from = await LocationEntity.findOne({ where: { sdek_id: config.sdek.sdekCityId } });
		const loc = await LocationEntity.createQueryBuilder().where(`"post_code_list" @> '{${order.index}}'`).getOne();

		for (const item of order.items) {
			for (let i = 0; i < item.amount; i++) {
				try {
					const d = await this.postSdek(
						{
							number: `${order.id}-${v4().slice(0, 10)}`,
							type: '1',
							tariff_code: '136',
							shipment_point: from.pvz_code,
							delivery_point: loc.pvz_code,
							value: 0,
							threshold: 1000,
							sum: 0,
							recipient: {
								name: order.name,
								email: order.email,
								phones: [
									{
										number: order.phone,
									},
								],
							},
							packages: [
								{
									number: `${order.id}-${item.item.id}-${i}`,
									weight: item.item.weight,
									length: item.item.length,
									width: item.item.width,
									height: item.item.height,
									items: [
										{
											name: item.item.name,
											ware_key: item.item.id,
											payment: {
												value: 0,
											},
											cost: 0,
											weight: item.item.weight,
											amount: 1,
										},
									],
								},
							],
						},
						'/orders'
					);

					data.push({
						itemName: item.item.name,
						uuid: d.entity.uuid,
					});
				} catch (err) {
					console.error(err);
					return false;
				}
			}
		}

		order.sdek = data;
		await order.save();
	}

	private async postSdek(data: any, url: string) {
		try {
			const res = await axios.post(`${this.url}${url}`, data, {
				headers: {
					Authorization: `Bearer ${await this.getToken()}`,
					'content-type': 'application/json',
				},
			});

			return res.data;
		} catch (err) {
			err.response.config = undefined;
			console.log(err.response.data.requests[0].errors);
			return false;
		}
	}

	async createOrder(dto: OrderCreateDto) {
		const shopItems: { amount: number; item: ShopItemEntity }[] = [];
		for (const i of dto.items) {
			const item = await ShopItemEntity.findOne({
				where: {
					id: i.id,
				},
			});

			if (item)
				shopItems.push({
					amount: i.amount,
					item,
				});
		}

		if (shopItems.length === 0)
			return {
				err: 'Ваша корзина пуста',
			};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const deliveryPrice = await this.deliveryService.getDeliveryPriceByCart(
			dto.zip,
			dto.items,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			dto.deliveryType,
			dto.country
		);

		const order = new PurchaseEntity();
		order.adress = dto.adress;
		order.created_at = new Date();
		order.index = dto.zip;
		order.country = dto.country;
		order.city = dto.city;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		order.deliverySum = parseInt(deliveryPrice.price);
		order.deliveryType = deliveryPrice.type;
		order.phone = dto.phone;
		order.email = dto.email;
		order.name = dto.name;
		order.sum = 0;
		order.trafic = dto.trafic;
		order.independenceKey = v4();
		await order.save();

		const cartItems: CartItemEntity[] = [];

		for (const item of shopItems) {
			const cartItem = new CartItemEntity();

			cartItem.amount = item.amount;
			cartItem.item = item.item;
			cartItem.purchase = order;
			await cartItem.save();

			cartItems.push(cartItem);
		}

		let price = cartItems.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0);

		if (dto.promocode) {
			const promo = await Promocode.findOne({
				where: {
					codeName: dto.promocode,
				},
			});

			if (promo) {
				price = Math.trunc(price * (1 - promo.precentage / 100));

				order.promocode = {
					precentage: promo.precentage,
					text: promo.codeName,
				};
			}
		}

		price += order.deliverySum;

		await order.reload();

		order.sum = price;

		await order.save();

		const config: { uKassa: { merchant_id: string; secret: string } } = JSON.parse(
			readFileSync(resolve(__dirname, '../../../post.config.json')).toString()
		);
		try {
			const res = await axios.post(
				'https://api.yookassa.ru/v3/payments',
				{
					amount: {
						value: price.toString(),
						currency: 'RUB',
					},
					capture: true,
					confirmation: {
						type: 'redirect',
						return_url: 'https://www.nipbox.ru',
					},
					description: `Заказ на сайте nipbox.ru №${order.id}`,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Idempotence-Key': order.independenceKey,
						Authorization: `Basic ${Buffer.from(
							`${config.uKassa.merchant_id}:${config.uKassa.secret}`
						).toString('base64')}`,
					},
				}
			);

			const data = res.data;

			order.paymentId = data.id;
			order.status = data.status;
			await order.save();

			return data.confirmation.confirmation_url;
		} catch (err) {
			console.log(err);
			return {
				err: 'Неполадки на стороне платежной системы, попробуйте позже',
			};
		}
	}

	async getById(id: string) {
		return await PurchaseEntity.findOne({
			where: {
				id: id,
			},
		});
	}
}
