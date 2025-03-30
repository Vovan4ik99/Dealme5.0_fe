import React from "react";
import {IExperienceLevelItemProps} from "./experienceLevelItemTypes.ts";
import styles from "../OnboardingItems.module.scss";

const ExperienceLevelItem: React.FC<IExperienceLevelItemProps> = ({title, info, id, onChange, isSelected}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}>
			<label htmlFor={id}>
				<input id={id} type={'radio'} name={'experience_level'}/>
				<div style={{alignItems: 'flex-start'}}
				     role="button"
				     className={`${styles['item__wrapper']} ${styles['item__wrapper--centered']}`}
				     onClick={() => onChange()}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<div className={styles['item__text']}>
						<p className={`${styles['item__text']} ${styles['item__text--title']}`}>{title}</p>
						<p className={`${styles['item__text']} ${styles['item__text--gray']}`}>{info}</p>
					</div>
				</div>
			</label>
		</button>
	)
}

export default ExperienceLevelItem;