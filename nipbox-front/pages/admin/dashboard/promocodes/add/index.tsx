import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { IPromocode } from '..';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../../config';
import { ssrUtils } from '../../../../../utils/ssr';

export default function Promocodes() {
	const [loadin, setLoadin] = useState(false);
	const [name, setName] = useState('');
	const [precentage, setPrecentage] = useState(0);

	function create() {
		setLoadin(true);

		axios
			.post(
				`${appConfig.baseUrl}/promocode/create`,
				{
					name,
					precentage,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				window.location.href = '/admin/dashboard/promocodes';
			});
	}

	return (
		<AdmPage title={'Промокоды'} isAuthed={true}>
			<AdminInput placeholder="Название" onChange={(x) => setName(x.target.value)} />
			<AdminInput
				placeholder="Процент скидки, пример: 20"
				onChange={(x) => setPrecentage(parseInt(x.target.value))}
			/>
			<AdmBtn onClick={create} customClass={'btnSimpl'} loading={loadin}>
				Сохранить
			</AdmBtn>
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
