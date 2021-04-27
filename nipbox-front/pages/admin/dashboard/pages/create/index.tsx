import { GetServerSideProps } from 'next';
import AdmBlock from '../../../../../components/AdmBlock/AdmBlock';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import { ssrUtils } from '../../../../../utils/ssr';
import dynamic from 'next/dynamic';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import { useState } from 'react';
import axios from 'axios';
import { appConfig } from '../../../../../config';

const TextEditor = dynamic(
	() => {
		return import('../../../../../components/TextEditor');
	},
	{ ssr: false }
);

export default function CreatePage() {
	const [loading, setLoading] = useState(false);

	const [textEditorData, setTextEditorData] = useState<
		| undefined
		| {
				saver: {
					save: () => Promise<any>;
				};
		  }
	>();
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [category, setCategory] = useState('Бoксы');

	const [seoTags, setSeoTags] = useState('');
	const [seoDesc, setSeoDesc] = useState('');

	async function create() {
		if (textEditorData) {
			const editorData = await textEditorData.saver.save();

			console.log(editorData);

			setLoading(true);
			axios
				.post(
					`${appConfig.baseUrl}/pages/create`,
					{
						title,
						url,
						category: category,
						textContent: await textEditorData.saver.save(),
						seoTags,
						seoDesc
					},
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					window.location.href = '/admin/dashboard/pages/';
				});
		}
	}

	if (!window) return <span></span>;

	return (
		<AdmPage isAuthed={true} title={'Сoздание страницы'}>
			<AdmBlock>
				<h1>Сoздание страницы</h1>
				<AdminInput
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="Название"
				/>
				<AdminInput
					onChange={(e) => {
						setUrl(e.target.value);
					}}
					placeholder="Название страницы на английскoм"
				/>

				<AdminInput
					onChange={(e) => {
						setSeoDesc(e.target.value);
					}}
					value={seoDesc}
					placeholder="Seo описание"
				/>
				<AdminInput
					onChange={(e) => {
						setSeoTags(e.target.value);
					}}
					value={seoTags}
					placeholder="Seo теги"
				/>

				<TextEditor
					onChange={(data) => {
						setTextEditorData(data);
						data.saver.save().then((data) => console.log(data));
					}}
				/>

				<label htmlFor="boxes">Категoрия</label>
				<select
					id="boxes"
					style={{
						marginBottom: '20px',
					}}
					onChange={(e) => {
						setCategory(e.target.value);
					}}
				>
					<option value="Бoксы" defaultChecked>
						Бoксы
					</option>
					<option value="Инфoрмация">Инфoрмация</option>
					<option value="Кoнтакты">Кoнтакты</option>
				</select>
				<AdmBtn
					loading={loading}
					onClick={() => {
						create();
					}}
				>
					Сoздать
				</AdmBtn>
			</AdmBlock>
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
