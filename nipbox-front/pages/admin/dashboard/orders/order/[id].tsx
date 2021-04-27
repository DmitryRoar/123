import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import AdmBlock from '../../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../../config';
import IOrder from '../../../../../interfaces/IOrder';
import { ssrUtils } from '../../../../../utils/ssr';

import styles from './Order.module.scss';

export default function Order({ id }: { id: string }) {
	const [order, setOrder] = useState<IOrder | undefined>(undefined);

	const [showDelivery, setShowDelivery] = useState(false);

	function setStatus(id: string, status: string) {
		axios
			.get(`${appConfig.baseUrl}/order/status/${id}/${status}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (status === 'removed') {
					window.location.href = '/admin/dashboard/orders';
					return;
				}
				window.location.reload();
			});
	}

	function paid(id: string) {
		axios
			.get(`${appConfig.baseUrl}/order/verify/${id}`, {
				withCredentials: true,
			})
			.then((res) => window.location.reload());
	}

	useEffect(() => {
		axios
			.get(`${appConfig.baseUrl}/order/id/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setOrder(res.data);
			});
	}, [id]);

	if (!order) return <p>Загрузка</p>;

	return (
		<AdmPage isAuthed={true} title="Заказ ">
			<AdmBlock customClass={styles.order}>
				<div className={styles.data}>
					<p className={styles.orderText}># {order.id}</p>
					<p className={styles.orderText}>ID Юкасса: {order.paymentId}</p>
					<p className={styles.orderText}>Статус: {order.status}</p>
					<p className={styles.orderText}>Дата: {new Date(order.created_at).toLocaleString()}</p>
					<p className={styles.orderText}>Источник трафика: {order.trafic}</p>
				</div>

				<div className={styles.data}>
					<div className={styles.title}>Данны покупателя</div>
					<p className={styles.orderText}>Фио: {order.name}</p>
					<p className={styles.orderText}>Телефон: {order.phone}</p>
					<p className={styles.orderText}>Email: {order.email}</p>
					<p className={styles.orderText}>Страна: {order.country}</p>
					<p className={`${styles.orderText} ${styles.adress}`}>Идекс: {order.index}</p>
					<p className={`${styles.orderText} ${styles.adress}`}>Адресс: {order.adress}</p>
				</div>

				<div className={styles.data}>
					<div className={styles.title}>Данны заказа</div>
					{order.promocode && <p className={styles.orderText}>Промокод: {order.promocode.text}</p>}

					<p className={styles.orderText}>Тип доставки: {order.deliveryType}</p>
					<p className={styles.orderText}>Стоимость доставки: {order.deliverySum}</p>
					<p className={styles.orderText}>
						Стоимость товаров: {order.items.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0)}
					</p>
					<p className={styles.orderText}>Итог: {order.sum}</p>
				</div>

				<div className={styles.data}>
					<div className={styles.title}>Товары</div>
					<div className={styles.items}>
						{order.items.map((x) => {
							return (
								<AdmBlock customClass={styles.item}>
									<p className={styles.name}>{x.item.name}</p>
									<p className={styles.amount}>Кол-во: {x.amount} шт.</p>
								</AdmBlock>
							);
						})}
					</div>
				</div>

				<div className={styles.data}>
					{(order.bxb || order.xls || order.sdek) && (
						<>
							<AdmBtn
								onClick={() => setShowDelivery(showDelivery ? false : true)}
								customClass={'orderBtn'}
							>
								Пoказать/скрыть данные o дoставке
							</AdmBtn>

							{showDelivery && (
								<DeliveryData
									data={{
										id: order.id,
										bxb: order.bxb,
										sdek: order.sdek,
										xls: order.xls,
										email: order.email,
									}}
								/>
							)}
						</>
					)}
				</div>

				<div className={styles.btns}>
					{order.status !== 'succeeded' && (
						<AdmBtn onClick={() => paid(order.id)} customClass={'orderBtn'}>
							Установить статус: Оплачен
						</AdmBtn>
					)}
					{order.status !== 'done' && (
						<AdmBtn onClick={() => setStatus(order.id, 'done')} customClass={'orderBtn'}>
							Завершить заказ
						</AdmBtn>
					)}
					<AdmBtn
						type="secondary"
						onClick={() => {
							setStatus(order.id, 'removed');
						}}
						customClass={'orderBtn'}
					>
						Удалить
					</AdmBtn>
				</div>
			</AdmBlock>
		</AdmPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	console.log(ctx.req.cookies);

	const { id } = ctx.params;
	console.log(ctx.params);
	if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login',
			},
		};
	}

	return {
		props: {
			id,
		},
	};
};

function DeliveryData({
	data,
}: {
	data: {
		id: string;
		xls?: boolean;

		bxb?: {
			track: string;
			label: string;
			itemName: string;
		}[];

		sdek?: {
			uuid: string;
			itemName: string;
		}[];
		email: string;
	};
}) {
	if (data.bxb) {
		return (
			<div className={styles.deliveryData}>
				{data.bxb.map((x) => {
					return (
						<AdmBlock customClass={styles.deliveryItem}>
							<div className={styles.name}>Название тoвара: {x.itemName}</div>
							<a href={x.label} className={styles.name}>
								Этикетка
							</a>
							<div className={styles.name}>Track: {x.track}</div>
						</AdmBlock>
					);
				})}
				<AdmBlock customClass={styles.deliveryItem}>
					<DeliveryDataEmail
						data={{
							id: data.id,
							bxb: data.bxb,
							sdek: data.sdek,
							xls: data.xls,
							orderEmail: data.email,
						}}
					/>
				</AdmBlock>
			</div>
		);
	}

	if (data.sdek) {
		return (
			<div className={styles.deliveryData}>
				{data.sdek.map((x) => {
					return (
						<AdmBlock customClass={styles.deliveryItem}>
							<div className={styles.name}>{x.itemName}</div>
							<div className={styles.name}>SDEK ID: {x.uuid}</div>
						</AdmBlock>
					);
				})}
				<AdmBlock customClass={styles.deliveryItem}>
					<DeliveryDataEmail
						data={{
							id: data.id,
							bxb: data.bxb,
							sdek: data.sdek,
							xls: data.xls,
							orderEmail: data.email,
						}}
					/>
				</AdmBlock>
			</div>
		);
	}

	if (data.xls) {
		return (
			<>
				<a href={`${appConfig.baseUrl}/static/xls/${data.id}.xls`}>Ссылка на скачивание xls для пoчты РФ</a>
				<AdmBlock customClass={styles.deliveryItem}>
					<DeliveryDataEmail
						data={{
							id: data.id,
							bxb: data.bxb,
							sdek: data.sdek,
							xls: data.xls,
							orderEmail: data.email,
						}}
					/>
				</AdmBlock>
			</>
		);
	}
}

function DeliveryDataEmail({
	data,
}: {
	data: {
		id: string;
		xls?: boolean;

		bxb?: {
			track: string;
			label: string;
			itemName: string;
		}[];

		sdek?: {
			uuid: string;
			itemName: string;
		}[];

		orderEmail: string;
	};
}) {
	const [value, setValue] = useState(data.xls ? '' : data.bxb.map((x) => x.track).join(', '));

	return (
		<>
			<AdminInput
				placeholder="Формат: индекс, индекс, индекс"
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			<AdmBtn
				onClick={() => {
					axios
						.post(
							`${appConfig.baseUrl}/order/send-tracks`,
							{
								email: data.orderEmail,
								tracks: value.split(','),
							},
							{ withCredentials: true }
						)
						.then(() => {
							alert('Имейл отправлен');
						});
				}}
			>
				Отправить
			</AdmBtn>
		</>
	);
}
