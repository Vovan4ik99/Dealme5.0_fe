import React from "react";
import {IAboutMeVideoModalItemProps} from "./aboutMeVideoModalItemTypes.ts";
import styles from './AboutMeVideoModalItem.module.scss';
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import VideoItem from "@ui/VideoItem/VideoItem.tsx";
import VideoEmptyState from "@components/features/FreelancerProfile/AboutMe/VideoEmptyState/VideoEmptyState.tsx";

const AboutMeVideoModalItem: React.FC<IAboutMeVideoModalItemProps> = ({videoUrl, fileName, onClick, onDelete}) => {

	const renderVideo = () => {
		if (!videoUrl) {
			return <button onClick={onClick} className={styles['video__empty']}>
				<VideoEmptyState/>
			</button>;
		}
		return <VideoItem videoUrl={videoUrl} hasDeleteBtn={true} onClick={onDelete}/>;
	}

	return (
		<div className={styles['video']}>
			<p className={styles['video__label']}>Wideo (opcjonalne)</p>
			<p className={styles['video__title']}>{fileName}</p>
			<div className={styles['video__wrapper']}>
				{renderVideo()}
			</div>
			<div className={styles['video__info']}>
				<InfoIcon width={15} height={15}/>
				<span>Akceptowalne formaty: MP4, MOV,  AVI, rozmiar: do 10MB</span>
			</div>
		</div>
	)
}

export default AboutMeVideoModalItem;