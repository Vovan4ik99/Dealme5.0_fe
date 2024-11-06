import styles from './InputError.module.scss';
import error_icon from '../../assets/icons/error_icon.svg';
import React from "react";

interface InputErrorProps {
	text: string;
}

const InputError: React.FC<InputErrorProps> = ({text}) => {
	return (
		<div className={styles.error}>
			<img src={error_icon} alt={'error icon'}/>
			<span>{text}</span>
		</div>
	)
}

export default InputError;