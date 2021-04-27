import axios from 'axios';
import { useEffect, useState } from 'react';
import { appConfig } from '../../config';
import IVideo from '../../interfaces/IVideo';
import VideoReview from '../VideoReview/VideoReview';

export default function VideoReviews() {
	const [videos, setVideos] = useState<IVideo[]>([]);

	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/video`).then((res) => {
			setVideos(res.data);
		});
	}, []);
	return (
		<div className="reviews">
			<p className="fontNotoSansJp textJap">レビュー</p>
			<h2 className="h2Main fontLena">Oбзoры</h2>
			<div className="row">
				{videos.map((vi, idx) => {
					return (
						<VideoReview
							previewImg={`${appConfig.baseUrl}/static/video/${vi.id}.png`}
							text={vi.text}
							videoLink={vi.videoLink}
              key={idx}
						/>
					);
				})}
			</div>
		</div>
	);
}
