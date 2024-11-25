import React from "react";
import {ISpecializationItemProps} from "./specializationItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";

const SpecializationItem: React.FC<ISpecializationItemProps> = ({item, onSelect, isSelected}) => {

	const modifyDescription = (description: string) => {
		return description.substring(0, 1).toUpperCase() + description.substring(1);
	}

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onClick={() => onSelect()}>
			<label className={styles['item__wrapper']} htmlFor={`specialization-${item.id}`}>
				<input type={'radio'} name={'specialization'} id={`specialization-${item.id}`}/>
				<div className={styles['item__add-wrapper']}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{item.name}</p>
				</div>
				<InfoIconBtn text={modifyDescription(item.description)}/>
			</label>
		</button>
	)
}

export default SpecializationItem;