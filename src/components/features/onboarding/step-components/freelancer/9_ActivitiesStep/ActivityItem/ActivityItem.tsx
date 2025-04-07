import React, { useState } from "react";
import { IActivityItemProps } from "./activityItemTypes.ts";
import styles from './ActivityItem.module.scss';
import TooltipIcon from "@ui/common/TooltipIcon/TooltipIcon.tsx";
import LevelPicker from "@ui/common/LevelPicker/LevelPicker.tsx";

const ActivityItem: React.FC<IActivityItemProps> = ({ id, name, info, level, onSelect }) => {

	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	const selectActivityLevel = (level: number) => {
		onSelect(id, level);
	};

	return (
		<div className={ styles['item'] }
		     role="button"
		     onMouseEnter={ () => setIsHovered(true) }
		     onMouseLeave={ () => setIsHovered(false) }>
			<div className={ styles['item__wrapper'] }>
				<TooltipIcon key={ info }
				             text={ info }
				             isLeft
				             isActive={ isHovered }
				             isIconTop/>
				<p className={ styles['item__text'] }>{ name }</p>
			</div>
			<LevelPicker selectedLevel={ level }
			             onLevelSelect={ selectActivityLevel }/>
		</div>
	);
}

export default ActivityItem;