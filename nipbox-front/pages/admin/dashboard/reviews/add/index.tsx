import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import AdmTextarea from '../../../../../components/AdmTextarea/AdmTextarea';
import { appConfig } from '../../../../../config';
import { ssrUtils } from '../../../../../utils/ssr';

export default function AddRev() {
	const [text, setText] = useState('');
	const [avatarLink, setAvatarLink] = useState('');
	const [name, setName] = useState('');
	const [link, setLink] = useState('');

	const [loading, setloading] = useState(false);

	function create() {
		setloading(true);
		axios
			.post(
				`${appConfig.baseUrl}/review/create`,
				{
					text,
					avatarLink,
					name,
					link,
				},
				{
					withCredentials: true,
				}
			)
			.then(() => {
				window.location.href = "/admin/dashboard/reviews";
			});
	}

	return (
		<AdmPage isAuthed={true} title="Сoздание oтзыва">
			<AdminInput customClass="marginB20" onChange={(x) => setName(x.target.value)} placeholder="Имя" />
			<AdmTextarea
				customClass="marginB20"
				placeholder="oтзыв"
				onChange={(x) => {
					setText(x);
				}}
			/>
			<AdminInput
				customClass="marginB20"
				onChange={(x) => setAvatarLink(x.target.value)}
				placeholder="Ссылка на аватар"
			/>
			<AdminInput
				customClass="marginB20"
				onChange={(x) => setLink(x.target.value)}
				placeholder="Ссылка на oтзыв"
			/>

			<AdmBtn
				onClick={() => {
					create();
                }}
                loading={loading}
			>
				Дoбавить
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
