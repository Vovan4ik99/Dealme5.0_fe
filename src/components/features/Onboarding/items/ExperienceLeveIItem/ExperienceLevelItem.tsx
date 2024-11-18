import React from "react";
import {IExperienceLevelItemProps} from "./experienceLevelItemTypes.ts";
import styles from "./ExperienceLevelItem.module.scss";

const ExperienceLevelItem: React.FC<IExperienceLevelItemProps> = ({title, info, id, onChange, isSelected}) => {

	return (
		<div className={`${styles['item']} ${isSelected ? styles['item__selected'] : ''}`}>
			<label htmlFor={id}>
				<input id={id} type={'radio'} name={'experience_level'}/>
				<button className={styles['item__wrapper']} onClick={() => onChange()}>
					<div className={styles['item__radio']}></div>
					<div className={styles['item__text']}>
						<p className={styles['item__title']}>{title}</p>
						<p className={styles['item__info']}>{info}</p>
					</div>
				</button>
				<div className={''}></div>
			</label>
		</div>
	)
}

export default ExperienceLevelItem;