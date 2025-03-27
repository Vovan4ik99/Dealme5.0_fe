import styles from "./VideoItem.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useState } from "react";
import { IVideoItemProps } from "@ui/VideoItem/videoItemTypes.ts";
import { ReactComponent as PlayIcon } from "@icons/named_exported/play_icon.svg";
import active_play_icon from '@icons/freelancer_profile/about_me/play_icon_active.svg';

const VideoItem = React.forwardRef<HTMLVideoElement, IVideoItemProps>(({
	                                                                       videoUrl,
	                                                                       onClick,
	                                                                       hasEditBtn,
	                                                                       hasDeleteBtn,
	                                                                       withCustomHover,
	                                                                       isHoveredByParentBlock,
	                                                                       style,
	                                                                       playVideo
                                                                       }, ref) => {

	const [ isHovered, setIsHovered ] = useState(false);

	const onHover = () => {
		if (withCustomHover) {
			return undefined;
		}
		setIsHovered((prevState) => (!prevState));
	};

	const isVideoHovered = () => {
		if (isHoveredByParentBlock !== undefined) {
			return isHoveredByParentBlock;
		}
		return isHovered;
	};

	return (
		<div role={ 'button' }
		     className={ styles['item'] }
		     onMouseEnter={ onHover }
		     onMouseLeave={ onHover }>
			<video style={ style }
			       ref={ ref }
			       controls
				   onError={(e) => console.error(e) }
				   preload={ "metadata" }
			       onClick={playVideo}
			       className={ styles['item__video'] }>
				<track kind="captions" srcLang="pl" default/>
				<source src={ videoUrl } type="video/mp4"/>
				Your browser does not support the video tag.
			</video>
			<div className={ styles['item__wrapper'] }>
				<div
					className={ `${ styles['item__icon'] } ${ isVideoHovered() && styles['item__icon--active'] }` }>
					{ isVideoHovered() ? <img src={ active_play_icon } alt="play"/> :
						<PlayIcon width={ 10 } height={ 12 }/> }
				</div>
				{ hasEditBtn &&
                    <ActionBtn kind={ 'Edit' }
                               withBorder={ false }
                               backgroundColor={ 'white' }
                               onClick={ onClick }/>
				}
				{ hasDeleteBtn &&
                    <ActionBtn kind={ 'Delete' }
                               withBorder={ false }
                               backgroundColor={ 'white' }
                               onClick={ onClick }/>
				}
			</div>
		</div>
	);
});

export default VideoItem;