import { GetServerSideProps } from 'next';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { ssrUtils } from '../../../../utils/ssr';
import styles from './Product.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import IShopItem from '../../../../interfaces/IShopItem';
import axios from 'axios';
import { appConfig } from '../../../../config';
import AdmProduct from '../../../../components/AdmProduct/AdmProduct';
import { ReactSortable } from 'react-sortablejs';

export default function AdmProducts() {
	const [products, setProducts] = useState<IShopItem[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/products`).then((res: { data: IShopItem[] }) => {
			setProducts(res.data.sort((a, b) => a.order - b.order));

			console.log(products);
		});
	}, []);

	function uploadOrderChanges() {
		axios
			.post(
				`${appConfig.baseUrl}/products/move`,
				{
					products,
				},
				{ withCredentials: true }
			)
			.then((res) => {});
	}

	return (
		<AdmPage title="Nipbox - тoвары" isAuthed={true}>
			<AdmBtn onClick={() => {}} href="/admin/dashboard/products/add">
				Дoбавить тoвар
			</AdmBtn>

			<ReactSortable
				list={products}
				setList={setProducts}
				onSort={() => {
					uploadOrderChanges();
				}}
			>
				{products.map((prod) => {
					return <AdmProduct item={prod} key={prod.id} />;
				})}
			</ReactSortable>
		</AdmPage>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
