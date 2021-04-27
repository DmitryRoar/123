import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import IOrder from '../../../../interfaces/IOrder';
import IShopItem from '../../../../interfaces/IShopItem';
import { ssrUtils } from '../../../../utils/ssr';

export default function Orders() {
	const [orders, setOrders] = useState<IOrder[]>([]);

	const [filter, setFilter] = useState<'pending' | 'succeeded' | 'done'>('succeeded');

	useEffect(() => {
		axios
			.get(`${appConfig.baseUrl}/order`, {
				withCredentials: true,
			})
			.then((res) => setOrders(res.data));
	}, []);

	return (
		<AdmPage isAuthed={true} title={'Nipbox - заказы'}>
			<div className="statusesContainer">
				<p>Фильтры</p>
				<div className="statuses">
					<div
						className={`status ${filter === 'pending' && 'selected'}`}
						onClick={() => setFilter('pending')}
					>
						oжидает oплаты
					</div>
					<div
						className={`status ${filter === 'succeeded' && 'selected'}`}
						onClick={() => setFilter('succeeded')}
					>
						oплачен
					</div>
					<div className={`status ${filter === 'done' && 'selected'}`} onClick={() => setFilter('done')}>
						Завершен
					</div>
				</div>
			</div>
			{orders
				.filter((x) => x.status === filter)
				.map((x) => {
					return <OrderBlock data={x} key={x.id} />;
				})}
		</AdmPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	console.log(ctx.req.cookies);
	if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login',
			},
		};
	}

	return {
		props: {},
	};
};

function OrderBlock({ data }: { data: IOrder }) {
	const [showDelivery, setShowDelivery] = useState(false);

	function setStatus(id: string, status: string) {
		axios
			.get(`${appConfig.baseUrl}/order/status/${id}/${status}`, {
				withCredentials: true,
			})
			.then((res) => {
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
	console.log(data.created_at);
	return (
		<AdmBlock customClass={'orderItem'}>
			<div className={`status ${(data.status === 'succeeded' || data.status === 'done') && 'green'}`}>
				{data.status}
			</div>
			<div className="id">#{data.id}</div>

			<div className="zip text"><p>ZIP:</p> <p>{data.index}</p></div>

			<div className="post text">
				<p>Дoставка:</p>
				<p>{data.deliveryType}</p>
			</div>

			<div className="referer text"><p>Истoчник трафика:</p> <p>{data.trafic.slice(0, 30)}</p></div>

			<div className="total">
				<div className="deliverySum">Доставка: {data.deliverySum}</div>
				<div className="sum">Итoг: {data.sum}</div>
			</div>

			{/* <AdmBtn onClick={() => setStatus(data.id, 'done')} customClass={'orderBtn'}>
				Завершить заказ
			</AdmBtn> */}
			<AdmBtn href={`/admin/dashboard/orders/order/${data.id}`} type="secondary" customClass={'orderBtn'}>
				Подробнее
			</AdmBtn>
		</AdmBlock>
	);
}
