import React from "react";
import {ITypeOfSalesItemProps} from "./typeOfSalesItemTypes.ts";
import styles from "../OnboardingItems.module.scss";

const TypeOfSalesItem: React.FC<ITypeOfSalesItemProps> = ({text, isSelected, onSelect}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={() => onSelect()}>
			<label htmlFor={text} className={`${styles['item__wrapper']}`}>
				<input type={"radio"} id={text} name={text} onClick={(e) => e.stopPropagation()}/>
				<div className={`${styles['item__add-wrapper']}`}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{text}</p>
				</div>
			</label>
		</button>
	)

}

export default TypeOfSalesItem;