import axios from 'axios';
import { useEffect, useState } from 'react';
import { appConfig } from '../../config';
import IReview from '../../interfaces/IReview';
import Review from '../Review/Review';

export default function Reviews() {
	const [reviews, setReviews] = useState<IReview[]>([]);
	useEffect(() => {
		axios.get(`${appConfig.baseUrl}/review/all`).then((data) => {
			setReviews(data.data);
		});
	}, []);

	return (
		<div className="feedback">
			<p className="fontNotoSansJp textJap">フィードバック</p>
			<hr className="blackLineFull" />
			<div className="row">
				<div className="col-xs-12 col-sm-6">
					<h2 className="h2Main fontLena">Oтзывы</h2>
				</div>
				<div className="hidden-xs col-sm-6 tar">
					<a
						href="https://vk.com/topic-72383889_30601752?offset=5300"
						className="allFeedback fontUbuntuNormal"
					>
						Все oтзывы
					</a>
				</div>
			</div>
			<div className="row">
				{reviews.map((rev, idx) => {
					return (
						<Review key={idx} id={rev.id} name={rev.name} original={rev.link} link={rev.avatarLink} text={rev.text} />
					);
				})}
			</div>
		</div>
	);
}
