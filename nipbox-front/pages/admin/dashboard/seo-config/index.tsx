import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import { ssrUtils } from '../../../../utils/ssr';

export default function ConfigPage() {
	

	const [loaded, setLoaded] = useState(false);

	const [btnLoadin, setBtnLoadin] = useState(false);

	const [seoTitle, setSeoTitle] = useState('');
	const [seoDesc, setSeoDesc] = useState('');
	const [seoTags, setSeoTags] = useState('');

	useEffect(() => {
		axios
			.get(`${appConfig.baseUrl}/seo-config/`)
			.then((res) => res.data)
			.then(
				(data: {
					seoDesc: string;

					seoTitle: string;

					seoTags: string;
				}) => {
					setSeoTitle(data.seoTitle);
					setSeoTags(data.seoTags);
					setSeoDesc(data.seoDesc);
					setLoaded(true);
				}
			);
	}, []);

	function save() {
		setBtnLoadin(true);
		axios
			.post(
				`${appConfig.baseUrl}/seo-config/`,
				{
					seoTags,
					seoDesc,
					seoTitle,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => window.location.reload());
	}

	if (!loaded) return <p>Загрузка</p>;

	return (
		<AdmPage title="Кoнфиг" isAuthed={true}>
			<AdmBlock>
				<div className="block">
					<p className="label">SEO настройки главной страницы</p>
					<AdminInput
						onChange={(e) => setSeoTitle(e.target.value)}
						value={seoTitle}
						placeholder="Seo заголовок"
					/>
					<AdminInput
						onChange={(e) => setSeoDesc(e.target.value)}
						value={seoDesc}
						placeholder="Seo описание"
					/>
					<AdminInput
						onChange={(e) => setSeoTags(e.target.value)}
						value={seoTags}
						placeholder="Meta тэги"
					/>
				</div>
			</AdmBlock>

			<AdmBtn loading={btnLoadin} onClick={() => save()}>
				Сoхранить
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

export interface Sdek {
	account: string;
	password: string;
	sdekCityId: string;
}

export interface Bxb {
	code: string;
	token: string;
}

export interface Payments {
	secret: string;
}

export interface UKassa {
	merchant_id: string;
	secret: string;
}

export interface IAppConfig {
	rfIndex: string;
	sdek: Sdek;
	bxb: Bxb;
	payments: Payments;
	daDataKey: string;
	uKassa: UKassa;
}
