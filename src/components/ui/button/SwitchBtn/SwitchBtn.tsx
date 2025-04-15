import styles from "./SwitchBtn.module.scss";
import React from "react";
import { ISwitchBtnProps } from "@ui/button/SwitchBtn/switchBtnTypes.ts";

const SwitchBtn: React.FC<ISwitchBtnProps> = ({onClick, items, currentIndex}) => {
	const grid= Array(items.length).fill("1fr").join(" ");

	const handleToggle = (selected: number) => {
		onClick(selected);
	}

	const handleSwitch = () => {
		return items.map((item, index) => (
			 <span className={`${styles['btn__option']} 
			 				   ${currentIndex === index && styles['btn__option--active']}`}
				   key={ index }
				   onClick={ () => handleToggle(index) }
			 >
				{ item }
			</span>
			))
	}

	return (
		<button className={ styles['btn'] }
				type="button"
				style={{gridTemplateColumns: `${grid}`}}>
			{ handleSwitch() }
		</button>
	)
};

export default SwitchBtn;