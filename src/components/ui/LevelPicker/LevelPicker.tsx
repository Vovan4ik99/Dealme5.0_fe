import styles from './LevelPicker.module.scss';
import React, { ReactNode, useState } from "react";
import { ILevelPickerProps } from "@ui/LevelPicker/levelPickerTypes.ts";

const LevelPicker: React.FC<ILevelPickerProps> = ({selectedLevel, withoutHoverEffect, onLevelSelect}) => {

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const onLevelClick = (i: number) => {
		if (withoutHoverEffect) {
			return undefined;
		}
		return onLevelSelect(i + 1);
	};

	const onMouseEnter = (i: number) => {
		if (withoutHoverEffect) {
			return undefined;
		}
		return setHoveredIndex(i);
	};

	const onMouseLeave = () => {
		if (withoutHoverEffect) {
			return undefined;
		}
		return setHoveredIndex(null);
	};

	const getItemClassName = (isActive: boolean | 0 | null) => {
		return `${styles['picker__item']} ${isActive && styles['picker__item--active']} 
		${withoutHoverEffect ? styles['picker__item--without-hover'] : styles['picker__item--default']}`;
	};

	const renderLevelItems = (): ReactNode[] => {
		const levelItems = [];
		for (let i = 0; i < 5; i++) {
			const isActive = (i < (selectedLevel ?? 0)) || (hoveredIndex && i <= hoveredIndex);
			levelItems.push(
				<div role="button" key={i}
				     className={getItemClassName(isActive)}
				     onMouseEnter={() => onMouseEnter(i)}
				     onMouseLeave={onMouseLeave}
				     onClick={() => onLevelClick(i)}>
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