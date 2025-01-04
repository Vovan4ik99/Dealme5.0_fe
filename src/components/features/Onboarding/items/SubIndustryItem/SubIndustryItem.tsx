import React from "react";
import {ISubIndustryItemProps} from "./subIndustryItemTypes.ts";
import styles from '../OnboardingItems.module.scss';import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";
import checkbox_checked from '@icons/auth/checkbox_checked.svg';

const SubIndustryItem: React.FC<ISubIndustryItemProps> = ({text, isSelected, onChange, info}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={onChange}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_checked} alt={'checkbox'}/>}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				<InfoIconBtn text={info}/>
			</label>
		</button>
	);
};

export default SubIndustryItem;