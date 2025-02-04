import styles from './VideoEditModalItem.module.scss';
import React from "react";
import {
	IVideoEditModalItemProps
} from "@components/features/EditModal/video/VideoEditModalItem/videoEditModalItemTypes.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import calendar from '@icons/freelancer_profile/secondary_info/calendar.svg';
import { transformVideoDate } from "@utils/dateUtils.ts";

const VideoEditModalItem: React.FC<IVideoEditModalItemProps> = ({
	                                                                videoUrl,
	                                                                title,
	                                                                onEdit,
	                                                                onDelete,
	                                                                dateOfObtaining
                                                                }) => {

	return (
		<div className={styles['item']}>
			<div className={styles['item__video']}>
				<video>
					<source src={videoUrl} type="video/mp4"/>
					<track label="Polski" kind="captions" srcLang="pl" default/>
				</video>
			</div>
			<div className={styles['item__content']}>
				<p className={styles['item__title']}>{title}</p>
				<div className={styles['item__date']}>
					<img src={calendar} alt={'date of obtaining'}/>
					<span>{transformVideoDate(dateOfObtaining)}</span>
				</div>
			</div>
			<div className={styles['item__actions']}>
				<ActionBtn key={"Edit Btn"}
				           kind={'Edit'}
				           onClick={onEdit}
				           withBorder={true}
				           backgroundColor={'transparent'}/>
				<ActionBtn key={"Delete Btn"}
				           kind={'Delete'}
				           onClick={onDelete}
				           withBorder={true}
				           backgroundColor={'transparent'}/>
			</div>
		</div>
	)
};

export default VideoEditModalItem;