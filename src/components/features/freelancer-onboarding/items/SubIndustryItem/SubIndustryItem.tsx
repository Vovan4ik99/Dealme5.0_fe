import React, {useState} from "react";
import {ISubIndustryItemProps} from "./subIndustryItemTypes.ts";
import styles from '../OnboardingItems.module.scss';
import checkbox_checked from '@icons/auth/checkbox_checked.svg';
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const SubIndustryItem: React.FC<ISubIndustryItemProps> = ({text, isSelected, onChange, info}) => {

	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onMouseEnter={() => setIsHovered(true)}
		        onMouseLeave={() => setIsHovered(false)}
		        onClick={onChange}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_checked} alt={'checkbox'}/>}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				<TooltipIcon key={info} text={info} isActive={isHovered}/>
			</label>
		</button>
	);
};

export default SubIndustryItem;