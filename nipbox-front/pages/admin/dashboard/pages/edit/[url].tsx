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

export default function EditorPage({
	data,
}: {
	data: {
		title: string;
		url: string;
		category: string;
		content: any;
		id: string;
		seoDesc: string;
		seoTags: string;
	};
}) {
	const [loading, setLoading] = useState(false);

	console.log(data.content);

	const [textData, setTextData] = useState<any>(data.content);
	const [title, setTitle] = useState(data.title);
	const [url, setUrl] = useState(data.url);
	const [category, setCategory] = useState(data.category);
	const [seoTags, setSeoTags] = useState(data.seoTags);
	const [seoDesc, setSeoDesc] = useState(data.seoDesc);


	async function edit() {
		setLoading(true);
		axios
			.post(
				`${appConfig.baseUrl}/pages/edit`,
				{
					title,
					url,
					category: category,
					textContent: textData,
					id: data.id,
					seoTags,
					seoDesc,
				},
				{
					withCredentials: true,
				}
			)
			.then(() => (window.location.href = '/admin/dashboard/pages'));
	}

	if (!window) return <span></span>;

	return (
		<AdmPage isAuthed={true} title={'Изменение страницы'}>
			<AdmBlock>
				<h1>Измение страницы</h1>
				<AdminInput
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={data.title}
					placeholder="Название"
				/>
				<AdminInput
					onChange={(e) => {
						setUrl(e.target.value);
					}}
					value={url}
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
						data.saver.save().then((data) => {
							setTextData(data);
							console.log(textData);
						});
					}}
					data={textData}
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
					value={category}
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
						edit();
					}}
				>
					Изменить
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

	const { url } = ctx.params;
	try {
		const res = await axios.get(`${appConfig.baseUrl}/pages/url/${url}`);

		const data = res.data;
		return {
			props: {
				data,
			},
		};
	} catch (err) {
		return {
			props: {},
		};
	}
};
