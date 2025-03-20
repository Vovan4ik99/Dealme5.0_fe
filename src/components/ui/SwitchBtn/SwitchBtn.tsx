import styles from "./SwitchBtn.module.scss";
import React from "react";
import {ISwitchBtnProps} from "@ui/SwitchBtn/switchBtnTypes.ts";

const SwitchBtn: React.FC<ISwitchBtnProps> = ({onClick, isActive, leftContent, rightContent}) => {

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		onClick();
	}

	return (
		<button className={styles['btn']} onClick={(e) => handleToggle(e)}>
			<div style={isActive ? {marginLeft: '8px'} : {marginRight: '8px'}}
			     className={`${styles['btn__slider']} ${!isActive && styles['btn__slider--right']}`}>
			</div>
			<span className={`${styles['btn__option']} ${isActive && styles['btn__option--active']}`}>
				{leftContent}
			</span>
			<span className={`${styles['btn__option']} ${!isActive ? styles['btn__option--active'] : ''}`}>
				{rightContent}
			</span>
		</button>
	)
};

export default SwitchBtn;