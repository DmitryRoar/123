import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import IReview from '../../../../interfaces/IReview';
import { ssrUtils } from '../../../../utils/ssr';

export default function Reviews() {
	const [revs, setRevs] = useState<IReview[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/review/all`).then((data) => {
			setRevs(data.data);
		});
	}, []);

	return (
		<AdmPage isAuthed={true} title="Oтзывы">
			<AdmBtn href="/admin/dashboard/reviews/add" onClick={() => {}}>
				Дoбавить oтзыв
			</AdmBtn>
			{revs.map((rev) => {
				return (
					<AdmBlock customClass="revAdm">
						<p>id: {rev.id}</p>
						<img src={rev.avatarLink} alt="" />
						<p>Текст: {rev.text}</p>
						<p>Имя: {rev.name}</p>
						<p>Ссылка: {rev.link}</p>
						<AdmBtn
							onClick={() => {
								axios
									.post(
										`${appConfig.baseUrl}/review/remove`,
										{ id: rev.id },
										{ withCredentials: true }
									)
									.then((d) => window.location.reload());
							}}
							type="secondary"
						>
							Удалить
						</AdmBtn>
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
