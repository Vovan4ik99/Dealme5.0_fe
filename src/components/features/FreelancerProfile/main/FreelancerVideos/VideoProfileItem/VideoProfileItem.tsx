import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoProfileItem.module.scss";
import VideoItem from "@ui/VideoItem/VideoItem.tsx";
import { IVideoProfileItemProps } from "./videoProfileItemTypes.ts";
import calendar from "@icons/freelancer_profile/secondary_info/calendar.svg";
import { transformVideoDate } from "@utils/dateUtils.ts";

const VideoProfileItem: React.FC<IVideoProfileItemProps> = ({ id, title, videoUrl, date, onEdit }) => {

	const videoRef = useRef<HTMLVideoElement>(null);

	const [ isHovered, setIsHovered ] = useState<boolean>(false);
	const [videoStyle, setVideoStyle] = useState<React.CSSProperties>({
		maxWidth: "281px",
		maxHeight: "100%",
	});

	const updateVideoStyle = () => {
		if (!videoRef.current) return;

		const { width, height } = videoRef.current.getBoundingClientRect();

		setVideoStyle({
			maxWidth: "281px",
			maxHeight: height < width ? "100%" : "320px",
		});
	};


	const playVideo = () => {
		if (!videoRef.current) {
			console.error('Video element not found');
			return;
		}
		if (videoRef.current.paused) {
			videoRef.current
				.play()
				.catch((error) => console.error('Error while playing video:', error));
			return;
		}
		videoRef.current.pause();
	};

	useEffect(() => {
		const video = videoRef.current;

		if (video && video.readyState >= 1) {
			updateVideoStyle();
		}

		video?.addEventListener("loadedmetadata", updateVideoStyle);

		return () => {
			video?.removeEventListener("loadedmetadata", updateVideoStyle);
		};
	}, [videoRef]);

	return (
		<div role={ 'button' }
		     className={ styles['item'] }
		     onMouseEnter={ () => setIsHovered(true) }
		     onMouseLeave={ () => setIsHovered(false) }
		     onClick={ playVideo }>
			<VideoItem key={ id }
			           videoUrl={ videoUrl }
			           ref={ videoRef }
			           style={ videoStyle }
			           withCustomHover={ true }
			           isHoveredByParentBlock={ isHovered }
			           hasEditBtn={ true }
			           playVideo={playVideo}
			           onClick={onEdit}/>
			<div className={ `${ styles['item__info'] } ${ isHovered && styles['item__info--hovered'] }` }>
				<p className={ styles['item__title'] }>{ title }</p>
				<div className={ styles['item__date'] }>
					<img src={ calendar } alt={ 'date of obtaining the video' }/>
					<p className={ styles['item__text'] }>{ transformVideoDate(date) }</p>
				</div>
			</div>
		</div>
	);
};

export default VideoProfileItem;