import React from "react";
import {ISubIndustryItemProps} from "./subIndustryItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import checkbox_icon from "@icons/checkbox_checked.svg";
import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";

const SubIndustryItem: React.FC<ISubIndustryItemProps> = ({text, isSelected, onChange, info}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={onChange}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_icon} alt={'checked icon'}/>}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				<InfoIconBtn text={info}/>
			</label>
		</button>
	);
};

export default SubIndustryItem;