import React, {useState} from "react";
import {ISpecializationItemProps} from "./specializationItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const SpecializationItem: React.FC<ISpecializationItemProps> = ({item, onSelect, isSelected}) => {

	const [isHovered, setIsHovered] = useState(false);

	const modifyDescription = (description: string) => {
		return description.substring(0, 1).toUpperCase() + description.substring(1);
	}

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onClick={() => onSelect()}
		        onMouseEnter={() => setIsHovered(true)}
		        onMouseLeave={() => setIsHovered(false)}>
			<label className={styles['item__wrapper']} htmlFor={`specialization-${item.id}`}>
				<input type={'radio'} name={'specialization'} id={`specialization-${item.id}`}/>
				<div className={styles['item__add-wrapper']}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{item.name}</p>
				</div>
				<TooltipIcon text={modifyDescription(item.description)} isActive={isHovered}/>
			</label>
		</button>
	)
}

export default SpecializationItem;