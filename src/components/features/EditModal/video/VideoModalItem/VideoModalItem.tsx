import React from "react";
import { IVideoModalItemProps } from "./videoModalItemTypes.ts";
import styles from './VideoModalItem.module.scss';
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import VideoItem from "@ui/VideoItem/VideoItem.tsx";
import VideoEmptyState from "@components/features/FreelancerProfile/main/AboutMe/VideoEmptyState/VideoEmptyState.tsx";

const VideoModalItem: React.FC<IVideoModalItemProps> = ({
	                                                        videoUrl,
	                                                        fileName,
	                                                        onClick,
	                                                        onDelete,
	                                                        emptyStateText,
	                                                        label,
	                                                        withDelete
                                                        }) => {

	const renderVideo = () => {
		if (!videoUrl) {
			return <button onClick={ onClick } className={ styles['video__empty'] }>
				<VideoEmptyState text={ emptyStateText }/>
			</button>;
		}
		if (withDelete) {
			return <VideoItem videoUrl={ videoUrl } hasDeleteBtn={ true }
			                  onClick={ onDelete }/>;
		}
		return <VideoItem videoUrl={ videoUrl }/>;
	}

	return (
		<div className={ styles['video'] }>
			<p className={ styles['video__label'] }>{ label }</p>
			<p className={ styles['video__title'] }>{ fileName }</p>
			<div className={ styles['video__wrapper'] }>
				{ renderVideo() }
			</div>
			<div className={ styles['video__info'] }>
				<InfoIcon width={ 15 } height={ 15 }/>
				<span>Akceptowalne formaty: MP4, MOV,  AVI, rozmiar: do 10MB</span>
			</div>
		</div>
	)
}

export default VideoModalItem;