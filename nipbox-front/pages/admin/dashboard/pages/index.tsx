import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import { ssrUtils } from '../../../../utils/ssr';

export default function Pages() {
	const [pages, setPages] = useState<{ id: string; title: string; url: string; category: string; content: any }[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/pages`).then((res) => {
			setPages(res.data);
		});
	}, []);

	return (
		<AdmPage isAuthed={true} title="Страницы">
			<AdmBtn href="/admin/dashboard/pages/create">Сoздать</AdmBtn>
			{pages.map((p) => {
				return (
					<AdmBlock customClass="pageItem">
						<p className="title text">Название: {p.title}</p>
						<p className="url text">Url: {p.url}</p>
						<p className="category text">Категoрия: {p.category}</p>
						<AdmBtn customClass="pageBtn" href={`/admin/dashboard/pages/edit/${p.url}`}>Редактирoвать</AdmBtn>
						<AdmBtn type="secondary" customClass="pageBtn" onClick={() => {
							axios.get(`${appConfig.baseUrl}/pages/remove/${p.id}`).then(() => window.location.reload())
						}}>Удалить</AdmBtn>
					</AdmBlock>
				);
			})}
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
