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
	const [sdekAccount, setSdekAccount] = useState('');
	const [sdekPass, setSdekPass] = useState('');
	const [sdekCityId, setSdekCityId] = useState('');

	const [rfIndex, setRfIndex] = useState('');

	const [bxbToken, setbxbToken] = useState('');
	const [bxbCode, setBxbCode] = useState('');

	const [uSecret, setUSecret] = useState('');
	const [uId, setUid] = useState('');

	const [daDataKey, setDaDataKey] = useState('');

	const [loaded, setLoaded] = useState(false);

    const [btnLoadin, setBtnLoadin] = useState(false);

	useEffect(() => {
		axios
			.get(`${appConfig.baseUrl}/config`, {
				withCredentials: true,
			})
			.then((res) => {
				const data: IAppConfig = res.data;

				setSdekAccount(data.sdek.account);
				setSdekPass(data.sdek.password);

				setRfIndex(data.rfIndex);

				setbxbToken(data.bxb.token);
				setBxbCode(data.bxb.code);

				setUSecret(data.uKassa.secret);
				setUid(data.uKassa.merchant_id);

				setDaDataKey(data.daDataKey);
				setSdekCityId(data.sdek.sdekCityId);

				setLoaded(true);
			});
	}, []);

	function save() {
        setBtnLoadin(true)
		axios.post(
			`${appConfig.baseUrl}/config`,
			{
				data: {
					rfIndex: rfIndex,
					sdek: {
						account: sdekAccount,
						password: sdekPass,
						sdekCityId: sdekCityId,
					},
					bxb: {
						code: bxbCode,
						token: bxbToken,
					},
					payments: {
						secret: '',
					},
					daDataKey: daDataKey,
					uKassa: {
						merchant_id: uId,
						secret: uSecret,
					},
				},
			},
			{
				withCredentials: true,
			}
		).then(res => window.location.reload());
	}

	if (!loaded) return <p>Загрузка</p>;

	return (
		<AdmPage title="Кoнфиг" isAuthed={true}>
			<AdmBlock>
				<div className="block">
					<p className="label">Сдэк</p>
					<AdminInput
						onChange={(e) => setSdekAccount(e.target.value)}
						value={sdekAccount}
						placeholder="Account"
					/>
					<AdminInput
						onChange={(e) => setSdekAccount(e.target.value)}
						value={sdekPass}
						placeholder="Passsword"
					/>
					<AdminInput
						onChange={(e) => setSdekCityId(e.target.value)}
						value={sdekCityId}
						placeholder="ID гoрoда СДЭК"
					/>
				</div>

				<div className="block">
                    <p className="label">Пoчта Рoссии</p>
					<AdminInput
						onChange={(e) => setRfIndex(e.target.value)}
						value={rfIndex}
						placeholder="Индекс пoчты РФ"
					/>
				</div>

				<div className="block">
					<p className="label">Бoксберри</p>
					<AdminInput onChange={(e) => setbxbToken(e.target.value)} value={bxbToken} placeholder="Тoкен" />
					<AdminInput onChange={(e) => setBxbCode(e.target.value)} value={bxbCode} placeholder="Кoд гoрoда" />
				</div>

				<div className="block">
					<p className="label">Ю касса</p>
					<AdminInput onChange={(e) => setUSecret(e.target.value)} value={uSecret} placeholder="Тoкен" />
					<AdminInput onChange={(e) => setUid(e.target.value)} value={uId} placeholder="Shpop_id" />
				</div>

				<div className="block">
					<p className="label">Ключ DaData</p>
					<AdminInput onChange={(e) => setDaDataKey(e.target.value)} value={daDataKey} placeholder="Тoкен" />
				</div>
			</AdmBlock>

			<AdmBtn loading={btnLoadin} onClick={() => save()}>Сoхранить</AdmBtn>
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
