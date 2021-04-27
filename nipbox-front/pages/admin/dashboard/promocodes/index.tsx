import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import { ssrUtils } from '../../../../utils/ssr';

export default function Promocodes() {
	const [promocodes, setPromocodes] = useState<IPromocode[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/promocode/all`).then((res) => {
			console.log(res.data);
			setPromocodes(res.data);
		});
	}, []);

	return (
		<AdmPage title={'Промокоды'} isAuthed={true}>
			<AdmBtn href="/admin/dashboard/promocodes/add">Добавить</AdmBtn>
			{promocodes.map((pr) => {
				return (
					<AdmBlock  customClass={'promocode'}>
						<p>Название: {pr.codeName}</p>
						<p>Процент: {pr.precentage}%</p>
						<AdmBtn
                       
							onClick={() => {
								axios
									.post(
										`${appConfig.baseUrl}/promocode/remove/${pr.id}`,
										{},
										{ withCredentials: true }
									)
									.then((res) => window.location.reload());
							}}
						>
							Удалить
						</AdmBtn>
					</AdmBlock>
				);
			})}
		</AdmPage>
	);
}

export interface IPromocode {
	id: string;
	codeName: string;
	precentage: string;
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
