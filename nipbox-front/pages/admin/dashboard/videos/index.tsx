import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmPage from '../../../../components/AdmPage/AdmPage';
import { appConfig } from '../../../../config';
import IVideo from '../../../../interfaces/IVideo';
import { ssrUtils } from '../../../../utils/ssr';

export default function Videos() {
	const [videos, setVideos] = useState<IVideo[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/video`).then((res) => {
			setVideos(res.data);
		});
	}, []);

	return (
		<AdmPage isAuthed={true} title="Видеo">
			<AdmBtn onClick={() => {}} href="/admin/dashboard/videos/add">
				Дoбавить видеo
			</AdmBtn>
			{videos.map((v) => {
				return (
					<AdmBlock customClass="revAdm">
						<p>id: {v.id}</p>
                        <img src={`${appConfig.baseUrl}/static/video/${v.id}.png`} alt=""/>
						<p>Ссылка: {v.videoLink}</p>
						<p>Текст: {v.text}</p>
						<AdmBtn
							type="secondary"
							onClick={() => {
								axios
									.post(`${appConfig.baseUrl}/video/remove/${v.id}`, {}, { withCredentials: true })
									.then(() => window.location.reload());
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
