import React, {useState} from "react";
import {IActivityItemProps} from "./activityItemTypes.ts";
import styles from './ActivityItem.module.scss';
import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";

const ActivityItem: React.FC<IActivityItemProps> = ({id, name, info, level, onSelect}) => {

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const renderLevelItems = () => {
		const levelItems = [];
		for (let i = 0; i < 5; i++) {
			const isActive = (i < level) || (hoveredIndex && i <= hoveredIndex);
			levelItems.push(
				<div key={i}
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
		<div className={styles['item']}>
			<div className={styles['item__wrapper']}>
				<InfoIconBtn text={info} isLeft={true}/>
				<p className={styles['item__text']}>{name}</p>
			</div>
			<div className={styles['item__level-wrapper']}>
				{renderLevelItems()}
			</div>
		</div>
	);
}

export default ActivityItem;