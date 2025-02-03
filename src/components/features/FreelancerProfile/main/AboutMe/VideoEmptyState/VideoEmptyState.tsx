import styles from './VideoEmptyState.module.scss';
import about_me_video from '@icons/freelancer_profile/about_me/about_me_empty.png';
import {ReactComponent as PlayIcon} from "@icons/named_exported/play_icon.svg";
import React from "react";
import {
	IVideoEmptyStateProps
} from "@components/features/FreelancerProfile/main/AboutMe/VideoEmptyState/videoEmptyStateTypes.ts";

const VideoEmptyState: React.FC<IVideoEmptyStateProps> = ({text}) => {

	return (
		<div className={styles['video']}>
			<div className={styles['video__img']}>
				<img src={about_me_video} alt="about me add video"/>
				<div className={styles['video__play']}>
					<PlayIcon width={9.872} height={12}/>
				</div>
			</div>
			<p className={styles['video__text']}>{text}</p>
		</div>
	)
};

export default VideoEmptyState;