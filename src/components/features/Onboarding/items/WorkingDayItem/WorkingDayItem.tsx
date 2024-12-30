import React from "react";
import {IWorkDayItemProps} from "./workingDayItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import checkbox_checked from "@icons/auth/checkbox_checked.svg";

const WorkingDayItem: React.FC<IWorkDayItemProps> = ({onChange, text, isSelected, workDayKey}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={() => onChange(workDayKey)}>
			<label className={`${styles['item__wrapper']} ${styles['item__wrapper--centered']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__checkbox']}>
					{isSelected && <img src={checkbox_checked} alt={'checkbox'}/>}
				</div>
				<p className={styles['item__text']}>{text}</p>
			</label>
		</button>
	)
};

export default WorkingDayItem;