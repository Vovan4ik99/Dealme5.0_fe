import React, {useState} from "react";
import {IncomeGoalItemProps} from "./incomeGoalItemTypes.ts";
import styles from "../OnboardingItems.module.scss";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const IncomeGoalItem: React.FC<IncomeGoalItemProps> = ({isSelected, onChange, text, description}) => {

	const [isHovered, setIsHovered] = useState(false);

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`}
		        onMouseEnter={() => setIsHovered(true)}
		        onMouseLeave={() => setIsHovered(false)}
		        onClick={() => onChange()}>
			<label htmlFor={text} className={`${styles['item__wrapper']}`}>
				<input type={"radio"} id={text} name={text} onClick={(e) => e.stopPropagation()}/>
				<div className={`${styles['item__add-wrapper']}`}>
					<div className={`${styles['item__radio']} ${isSelected && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{text}
						<span className={`${styles['item__text']} ${styles['item__text--gray']}`}> / tydzień</span>
					</p>
				</div>
				<TooltipIcon key={description} text={description} isActive={isHovered}/>
			</label>
		</button>
	)
}

export default IncomeGoalItem;