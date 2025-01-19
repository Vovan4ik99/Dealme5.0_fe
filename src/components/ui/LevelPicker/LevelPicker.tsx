import styles from './LevelPicker.module.scss';
import React, {ReactNode, useState} from "react";
import {ILevelPickerProps} from "@ui/LevelPicker/levelPickerTypes.ts";

const LevelPicker: React.FC<ILevelPickerProps> = ({selectedLevel, onLevelSelect}) => {

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const renderLevelItems = (): ReactNode[] => {
		const levelItems = [];
		for (let i = 0; i < 5; i++) {
			const isActive = (i < (selectedLevel ?? 0)) || (hoveredIndex && i <= hoveredIndex);
			levelItems.push(
				<div role="button" key={i}
				     className={`${styles['picker__item']} ${isActive && styles['picker__item--active']}`}
				     onMouseEnter={() => setHoveredIndex(i)}
				     onMouseLeave={() => setHoveredIndex(null)}
				     onClick={() => onLevelSelect(i + 1)}>
					<div></div>
				</div>
			);
		}
		return levelItems;
	}

	return (
		<div className={styles['picker']}>
			{renderLevelItems()}
		</div>
	)
}

export default LevelPicker;