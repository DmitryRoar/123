import Link from 'next/link';
import { useStore } from '../../store/store';
import sanitizeFont from '../../utils/sanitizeFont';

interface Props {
	text: string;
	previewImg: string;
	videoLink: string;
}

export default function VideoReview(props: Props) {
	const { video } = useStore();

	return (
		<div className="col-xs-12 col-sm-6 col-md-3">
			<div
				className="reviewItem"
				onClick={() => {
					video.setVideo(props.videoLink);
				}}
			>
				<div className="reviewItemVideoWrap">
					{/* <Link href={props.videoLink}> */}
					<img src="/img/play.png" alt="reviewItemVideoIcon" className="reviewItemVideoIcon" />
					{/* </Link> */}
					<img src={props.previewImg} alt="reviewItemVideoWrap" className="reviewItemVideoImage" />
				</div>
				<div className="reviewItemTextWrap fontLena">{sanitizeFont(props.text)}</div>
			</div>
		</div>
	);
}
