import React from "react";
import {IncomeGoalItemProps} from "./incomeGoalItemTypes.ts";
import styles from "../OnboardingItems.module.scss";
import InfoIconBtn from "@ui/InfoIconBtn/InfoIconBtn.tsx";

const IncomeGoalItem: React.FC<IncomeGoalItemProps> = ({isSelected, onChange, text, description}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={() => onChange()}>
			<label htmlFor={text} className={`${styles['item__wrapper']}`}>
				<input type={"radio"} id={text} name={text} onClick={(e) => e.stopPropagation()}/>
				<div className={`${styles['item__add-wrapper']}`}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{text}
						<span className={`${styles['item__text']} ${styles['item__text--gray']}`}> / tydzień</span>
					</p>
				</div>
				<InfoIconBtn text={description}/>
			</label>
		</button>
	)
}

export default IncomeGoalItem;