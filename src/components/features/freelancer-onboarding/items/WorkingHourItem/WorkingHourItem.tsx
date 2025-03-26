import styles from '../OnboardingItems.module.scss';
import React from "react";
import {IWorkingHourItemProps} from "./workingHourItemTypes.ts";

const WorkingHourItem: React.FC<IWorkingHourItemProps> = ({text, onChange, isSelected}) => {
	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={() => onChange()}>
			<label htmlFor={text} className={`${styles['item__wrapper']} ${styles['item__wrapper--centered']}`}>
				<input type={"radio"} id={text} name={text} onClick={(e) => e.stopPropagation()}/>
				<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
				<p className={styles['item__text']}>{text}
					<span className={`${styles['item__text']} ${styles['item__text--gray']}`}> / tydzień</span>
				</p>
			</label>
		</button>
	)
}

export default WorkingHourItem;