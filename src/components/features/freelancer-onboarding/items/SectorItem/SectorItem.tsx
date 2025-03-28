import React, {useState} from "react";
import styles from "../OnboardingItems.module.scss";
import {ISectorItemProps} from "./sectorItemTypes.ts";
import checkbox_checked from '@icons/auth/checkbox_checked.svg';
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const SectorItem: React.FC<ISectorItemProps> = ({isSelected, text, description, onSelect}) => {

	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onMouseEnter={() => setIsHovered(true)}
		        onMouseLeave={() => setIsHovered(false)}
		        onClick={() => onSelect()}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_checked} alt={'checkbox'} />}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				<TooltipIcon key={description} text={description} isActive={isHovered}/>
			</label>
		</button>
	)
}

export default SectorItem;