import React, {useRef} from "react";
import styles from "./SuccessInfo.module.scss";
import success_icon from '../../assets/icons/success_icon.svg';
import {CSSTransition} from "react-transition-group";

interface SuccessInfoProps {
	text: string;
	isOpen: boolean;
}

const SuccessInfo: React.FC<SuccessInfoProps> = ({text, isOpen}) => {
	const ref = useRef(null);

	return (
		<CSSTransition in={isOpen} timeout={{enter: 300, exit: 300}} unmountOnExit nodeRef={ref} classNames={styles['success-info']}>
			<div className={styles['success-info']} ref={ref}>
				<img src={success_icon} alt={'success'}/>
				<p>{text}</p>
			</div>
		</CSSTransition>
	)
}

export default SuccessInfo;