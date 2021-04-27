"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const CartItem_entity_1 = require("../../entities/CartItem.entity");
const Purchase_entity_1 = require("../../entities/Purchase.entity");
const ShopItem_entity_1 = require("../../entities/ShopItem.entity");
const delivery_service_1 = require("../delivery/delivery.service");
const json2xls = require("json2xls");
const qr = require("querystring");
const Location_entity_1 = require("../../entities/Location.entity");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
const mailInsertor_1 = require("../../utils/mailInsertor");
const Promocode_entity_1 = require("../../entities/Promocode.entity");
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
    }
    else {
        console.log('Server is ready to take our messages');
    }
});
let OrderService = class OrderService {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
        this.url = 'https://api.cdek.ru/v2';
        this.token = {
            value: '',
            expiresAt: new Date(Date.now() - 1),
        };
    }
    async findAll() {
        return await Purchase_entity_1.default.find({
            order: {
                id: 'DESC',
            },
            where: {
                status: typeorm_1.Not('removed'),
            },
        });
    }
    async setStatus(status, id) {
        const order = await Purchase_entity_1.default.findOne({
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
                    html: mailInsertor_1.default(order),
                });
            }
        }
        return true;
    }
    getConfig() {
        const config = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString());
        return config;
    }
    async getToken() {
        if (this.token.expiresAt.getTime() > Date.now() + 1000) {
            return this.token.value;
        }
        else {
            const config = this.getConfig();
            const res = await axios_1.default.post(`${this.url}/oauth/token?${qr.stringify({
                grant_type: 'client_credentials',
                client_id: config.sdek.account,
                client_secret: config.sdek.password,
            })}`);
            const data = res.data;
            this.token.value = data.access_token;
            this.token.expiresAt = new Date(Date.now() + data.expires_in * 1000);
            return this.token.value;
        }
    }
    async sendTracks(email, tracks) {
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
    async validateOrder(req, id) {
        const { type, event, object } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (id) {
            const order = await Purchase_entity_1.default.findOne({
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
                }
                catch (err) {
                    console.error(`[ERROR IN ORDER SERVICE VALIDATION] ${new Date().toLocaleString()} `);
                    console.error(err);
                }
                finally {
                    transporter
                        .sendMail({
                        from: 'info@nipbox.ru',
                        to: order.email,
                        subject: 'Ваш заказ на nipbox.ru',
                        text: '',
                        html: mailInsertor_1.default(order),
                    })
                        .catch((err) => {
                        console.error(`[ ERROR IN ORDER EMAIL SENDING ]`);
                        console.error(err);
                    });
                }
                return true;
            }
            else {
                return true;
            }
        }
        console.log(ip);
        if (!type || type !== 'notification') {
            console.log('wrong notification');
            throw new common_1.HttpException('', common_1.HttpStatus.FORBIDDEN);
        }
        if (!event || event !== 'payment.succeeded') {
            console.log('wrong event');
            return 'wrong event';
        }
        try {
            const config = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString());
            const res = await axios_1.default.get(`https://api.yookassa.ru/v3/payments/${id ? id : object.id}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${config.uKassa.merchant_id}:${config.uKassa.secret}`).toString('base64')}`,
                },
            });
            const data = res.data;
            if (data.status === 'succeeded') {
                const order = await Purchase_entity_1.default.findOne({
                    where: {
                        paymentId: data.id,
                    },
                });
                console.log(order);
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
                        html: mailInsertor_1.default(order),
                    })
                        .catch((err) => {
                        console.error(`[ ERROR IN ORDER EMAIL SENDING ]`);
                        console.error(err);
                    });
                    return true;
                }
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('', 500);
        }
    }
    async generatePochtaRfXlses(purchase) {
        const config = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString());
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
        fs_1.writeFileSync(path_1.resolve(__dirname, `../../../static/xls/${purchase.id}.xls`), xls, {
            encoding: 'binary',
        });
        purchase.xls = true;
        await purchase.save();
    }
    async generateBxbOrder(purchase) {
        const config = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString());
        try {
            const tokens = [];
            for (const item of purchase.items) {
                for (let i = 0; i < item.amount; i++) {
                    const res = await axios_1.default.post('https://api.boxberry.ru/json.php', {
                        token: config.bxb.token,
                        order_id: `${purchase.id}---${uuid_1.v4().split('-').join('').slice(0, 5)}`,
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
        }
        catch (err) {
            console.log(err);
        }
    }
    async generateSdek(order) {
        const data = [];
        const config = this.getConfig();
        const from = await Location_entity_1.default.findOne({ where: { sdek_id: config.sdek.sdekCityId } });
        const loc = await Location_entity_1.default.createQueryBuilder().where(`"post_code_list" @> '{${order.index}}'`).getOne();
        for (const item of order.items) {
            for (let i = 0; i < item.amount; i++) {
                try {
                    const d = await this.postSdek({
                        number: `${order.id}-${uuid_1.v4().slice(0, 10)}`,
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
                    }, '/orders');
                    data.push({
                        itemName: item.item.name,
                        uuid: d.entity.uuid,
                    });
                }
                catch (err) {
                    console.error(err);
                    return false;
                }
            }
        }
        order.sdek = data;
        await order.save();
    }
    async postSdek(data, url) {
        try {
            const res = await axios_1.default.post(`${this.url}${url}`, data, {
                headers: {
                    Authorization: `Bearer ${await this.getToken()}`,
                    'content-type': 'application/json',
                },
            });
            return res.data;
        }
        catch (err) {
            err.response.config = undefined;
            console.log(err.response.data.requests[0].errors);
            return false;
        }
    }
    async createOrder(dto) {
        const shopItems = [];
        for (const i of dto.items) {
            const item = await ShopItem_entity_1.default.findOne({
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
        const deliveryPrice = await this.deliveryService.getDeliveryPriceByCart(dto.zip, dto.items, dto.deliveryType, dto.country);
        const order = new Purchase_entity_1.default();
        order.adress = dto.adress;
        order.created_at = new Date();
        order.index = dto.zip;
        order.country = dto.country;
        order.city = dto.city;
        order.deliverySum = parseInt(deliveryPrice.price);
        order.deliveryType = deliveryPrice.type;
        order.phone = dto.phone;
        order.email = dto.email;
        order.name = dto.name;
        order.sum = 0;
        order.trafic = dto.trafic;
        order.independenceKey = uuid_1.v4();
        await order.save();
        const cartItems = [];
        for (const item of shopItems) {
            const cartItem = new CartItem_entity_1.default();
            cartItem.amount = item.amount;
            cartItem.item = item.item;
            cartItem.purchase = order;
            await cartItem.save();
            cartItems.push(cartItem);
        }
        let price = cartItems.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0);
        if (dto.promocode) {
            const promo = await Promocode_entity_1.default.findOne({
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
        const config = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString());
        try {
            const res = await axios_1.default.post('https://api.yookassa.ru/v3/payments', {
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': order.independenceKey,
                    Authorization: `Basic ${Buffer.from(`${config.uKassa.merchant_id}:${config.uKassa.secret}`).toString('base64')}`,
                },
            });
            const data = res.data;
            order.paymentId = data.id;
            order.status = data.status;
            await order.save();
            return data.confirmation.confirmation_url;
        }
        catch (err) {
            console.log(err);
            return {
                err: 'Неполадки на стороне платежной системы, попробуйте позже',
            };
        }
    }
    async getById(id) {
        return await Purchase_entity_1.default.findOne({
            where: {
                id: id,
            },
        });
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [delivery_service_1.default])
], OrderService);
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map