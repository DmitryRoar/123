import Link from 'next/link';
import { useEffect, useState } from 'react';
import { appConfig } from '../../config';

interface IReview {
	name: string;
	text: string;
	original: string;
	link: string;
	id: string;
}
export default function Review({ name, id, text, original, link }: IReview) {
	const [length, setLength] = useState(96);

	useEffect(() => {
		const interval = setInterval(() => {
			if (window.innerWidth <= 768) {
				setLength(220);
			} else {
				setLength(96);
			}
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="col-xs-12 col-sm-6 col-md-3">
			<Link href={original}>
				<div className="feedbackItem">
					<img src={link} alt="feedbackImage" className="feedbackImage" />
					<div className="feedbackItemContent">
						<p className="feedbackItemText fontUbuntuNormal">
							{text.length > length ? (
								<>
									{text.slice(0, length)}
									<Link href={original}>
										<a className="originalComment">...</a>
									</Link>
								</>
							) : (
								text
							)}
						</p>
						<p className="feedbackItemAuthor fontUbuntuNormal">— {name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
