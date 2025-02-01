import styles from "./VideoItem.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, {useState} from "react";
import {IVideoItemProps} from "@ui/VideoItem/videoItemTypes.ts";
import {ReactComponent as PlayIcon} from "@icons/named_exported/play_icon.svg";
import active_play_icon from '@icons/freelancer_profile/about_me/play_icon_active.svg';

const VideoItem: React.FC<IVideoItemProps> = ({
	                                              videoUrl,
	                                              onClick = () => {},
	                                              hasEditBtn = false,
	                                              hasDeleteBtn = false,
                                              }) => {

	const [isHovered, setIsHovered] = useState(false);

	const onHover = () => {
		setIsHovered((prevState) => (!prevState));
	};

	return (
		<div role={'button'}
		     className={styles['item']}
		     onMouseEnter={onHover}
		     onMouseLeave={onHover}>
			<video controls className={styles['item__video']}>
				<track kind="captions" srcLang="pl" default/>
				<source src={videoUrl} type="video/mp4"/>
				Your browser does not support the video tag.
			</video>
			<div className={styles['item__wrapper']}>
				<div className={`${styles['item__icon']} ${isHovered && styles['item__icon--active']}`}>
					{isHovered ? <img src={active_play_icon} alt="play"/> : <PlayIcon width={10} height={12}/>}
				</div>
				{hasEditBtn &&
                    <ActionBtn kind={'Edit'}
                               withBorder={false}
                               backgroundColor={'white'}
                               onClick={onClick}/>
				}
				{hasDeleteBtn &&
                    <ActionBtn kind={'Delete'}
                               withBorder={false}
                               backgroundColor={'white'}
                               onClick={onClick}/>
				}
			</div>
		</div>
	);
}

export default VideoItem;