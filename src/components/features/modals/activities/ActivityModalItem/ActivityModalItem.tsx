import React from "react";
import {
	IActivityModalItemProps
} from "@components/features/modals/activities/ActivityModalItem/activityModalItemTypes.ts";
import styles from './ActivityModalItem.module.scss';
import draggable_icon from "@icons/freelancer_profile/secondary_info/draggable_item.svg";
import LevelPicker from "@ui/common/LevelPicker/LevelPicker.tsx";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";

const ActivityModalItem: React.FC<IActivityModalItemProps> = ({name, level, onDelete, onLevelUpdate}) => {

	return (
		<div className={styles['activity']}>
			<img src={draggable_icon} alt={'draggable item'}/>
			<p className={styles['activity__text']}>{name}</p>
			<LevelPicker selectedLevel={level} onLevelSelect={onLevelUpdate}/>
			<ActionBtn kind={'Delete'} onClick={onDelete} withBorder={true} backgroundColor={'transparent'}/>
		</div>
	)
};

export default ActivityModalItem;