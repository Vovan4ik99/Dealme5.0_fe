import React, {useRef} from "react";
import {CSSTransition} from "react-transition-group";

const AnimatedStep: React.FC<{children: React.ReactNode}> = ({children}) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<CSSTransition in appear timeout={{enter: 500, exit: 500}} unmountOnExit nodeRef={ref} classNames='animated'>
			<div className={'animated'} ref={ref}>
				{children}
			</div>
		</CSSTransition>
	)
}

export default AnimatedStep;