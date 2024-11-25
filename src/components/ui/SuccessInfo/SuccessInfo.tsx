import React, {useRef} from "react";
import "./success-info.scss";
import success_icon from '@icons/success_icon.svg';
import {CSSTransition} from "react-transition-group";

interface SuccessInfoProps {
	text: string;
	isOpen: boolean;
}

const SuccessInfo: React.FC<SuccessInfoProps> = ({text, isOpen}) => {
	const ref = useRef(null);

	return (
		<CSSTransition in={isOpen} timeout={200} unmountOnExit nodeRef={ref} classNames={'success-info'}>
			<div className={'success-info'} ref={ref}>
				<img src={success_icon} alt={'success'}/>
				<p>{text}</p>
			</div>
		</CSSTransition>
	)
}

export default SuccessInfo;