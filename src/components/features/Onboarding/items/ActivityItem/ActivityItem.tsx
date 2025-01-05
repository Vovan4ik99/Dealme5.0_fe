import React, {useState} from "react";
import {IActivityItemProps} from "./activityItemTypes.ts";
import styles from './ActivityItem.module.scss';
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const ActivityItem: React.FC<IActivityItemProps> = ({id, name, info, level, onSelect}) => {

	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const renderLevelItems = () => {
		const levelItems = [];
		for (let i = 0; i < 5; i++) {
			const isActive = (i < level) || (hoveredIndex && i <= hoveredIndex);
			levelItems.push(
				<div role="button" key={i}
				     className={`${styles['item__level']} ${isActive && styles['item__level--active']}`}
				     onMouseEnter={() => setHoveredIndex(i)}
				     onMouseLeave={() => setHoveredIndex(null)}
				     onClick={() => onSelect(id, i + 1)}>
					<div></div>
				</div>
			);
		}
		return levelItems;
	}

	return (
		<div className={styles['item']}
		     role="button"
		     onMouseEnter={() => setIsHovered(true)}
		     onMouseLeave={() => setIsHovered(false)}>
			<div className={styles['item__wrapper']}>
				<TooltipIcon key={info} text={info} isLeft={true} isActive={isHovered} isIconTop={true}/>
				<p className={styles['item__text']}>{name}</p>
			</div>
			<div className={styles['item__level-wrapper']}>
				{renderLevelItems()}
			</div>
		</div>
	);
}

export default ActivityItem;