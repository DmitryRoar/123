import axios from 'axios';
import { GetServerSideProps } from 'next';
import { ChangeEvent, useState } from 'react';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import AdmTextarea from '../../../../../components/AdmTextarea/AdmTextarea';
import { appConfig } from '../../../../../config';
import { ssrUtils } from '../../../../../utils/ssr';

export default function AddRev() {
	const [text, setText] = useState('');
	const [link, setLink] = useState('');
	const [file, setFile] = useState<File | undefined>();
	const [loading, setloading] = useState(false);

	function addFile(e: ChangeEvent<HTMLInputElement>, setter: (x: File) => any) {
		const file = e.target.files?.item(0);

		if (file) {
			setter(file);
		}
	}

	function create() {
		setloading(true);
		const form = new FormData();
		form.append('text', text);
		form.append('videoLink', link);
		if (file) {
			form.append('file', file);
		}

		axios
			.post(
				`${appConfig.baseUrl}/video/create`,
				form,
				{
					withCredentials: true,
				}
			)
			.then(() => {
				window.location.href = '/admin/dashboard/videos';
			});
	}

	return (
		<AdmPage isAuthed={true} title="Сoздание oтзыва">
			<AdmTextarea
				customClass="marginB20"
				placeholder="Название"
				onChange={(x) => {
					setText(x);
				}}
			/>
			<AdminInput
				customClass="marginB20"
				onChange={(x) => setLink(x.target.value)}
				placeholder="Ссылка на видеo"
			/>

			<div className="custInp">
				<p>Превью</p>
				<input type="file" onChange={(e) => addFile(e, setFile)} name="" id="" />
			</div>

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
