import styles from './VideoEmptyState.module.scss';
import about_me_video from '@icons/freelancer_profile/about_me/about_me_empty.png';
import {ReactComponent as PlayIcon} from "@icons/named_exported/play_icon.svg";

const VideoEmptyState = () => {

	return (
		<div className={styles['video']}>
			<div className={styles['video__img']}>
				<img src={about_me_video} alt="about me add video"/>
				<div className={styles['video__play']}>
					<PlayIcon width={9.872} height={12}/>
				</div>
			</div>
			<p className={styles['video__text']}>Nagraj krótkie wideo o sobie</p>
		</div>
	)
};

export default VideoEmptyState;