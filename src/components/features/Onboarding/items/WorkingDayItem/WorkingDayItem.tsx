import React from "react";
import {IWorkDayItemProps} from "./workDayItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import checkbox_icon from '@icons/checkbox_checked.svg';

const WorkingDayItem: React.FC<IWorkDayItemProps> = ({onChange, text, isSelected, workDayKey}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={() => onChange(workDayKey)}>
			<label className={`${styles['item__wrapper']} ${styles['item__wrapper--centered']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__checkbox']}>
					{isSelected && <img src={checkbox_icon} alt={'checked icon'}/>}
				</div>
				<p className={styles['item__text']}>{text}</p>
			</label>
		</button>
	)
};

export default WorkingDayItem;