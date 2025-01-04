import React from "react";
import styles from "../OnboardingItems.module.scss";
import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";
import {ISectorItemProps} from "./sectorItemTypes.ts";
import checkbox_checked from '@icons/auth/checkbox_checked.svg';

const SectorItem: React.FC<ISectorItemProps> = ({isSelected, text, description, onSelect}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onClick={() => onSelect()}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_checked} alt={'checkbox'} />}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				<InfoIconBtn text={description}/>
			</label>
		</button>
	)
}

export default SectorItem;