import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import ReactPlayer from 'react-player';
import { useStore } from '../../store/store';
import styles from './VideoPlayerFixed.module.scss';

const VideoPlayerFixed: FC = observer(() => {
	const { video } = useStore();

	if (video.videoLink === '') {
		return <span></span>;
	}

	return (
		<div
			className={`${styles.playerFixedContainer}`}
			onClick={() => {
				video.setVideo('');
			}}
		>
			<div className={`${styles.playerContainer}`}>
				<ReactPlayer
					url={video.videoLink}
					controls={true}
					style={{
						maxWidth: '100vw',
						// width: '600px',
						height: '600px',
					}}
					height={'70vh'}
					width={'70vw'}
				/>
			</div>
		</div>
	);
});

export default VideoPlayerFixed;
