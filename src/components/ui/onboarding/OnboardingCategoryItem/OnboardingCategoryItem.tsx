import styles from './OnboardingCategoryItem.module.scss';
import arrow_right from '@icons/onboarding/arrow_right.svg';
import React, { useRef, useState } from "react";
import { IOnboardingCategoryItemProps } from "@ui/onboarding/OnboardingCategoryItem/onboardingCategoryItemTypes.ts";
import { CSSTransition } from "react-transition-group";

const OnboardingCategoryItem: React.FC<IOnboardingCategoryItemProps> = ({ text, categoryContent, isActive }) => {

	const [ isOpened, setIsOpened ] = useState<boolean>(isActive ?? false);

	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<div>
			<div role={ 'btn' }
			     className={ `${ styles['category'] } ${ isOpened && styles['category--active'] }` }
			     onClick={ () => setIsOpened(prevState => !prevState) }>
				<img src={ arrow_right } alt="arrow right"/>
				<span>{ text }</span>
			</div>
			<CSSTransition in={ isOpened }
			               timeout={ 300 }
			               nodeRef={nodeRef}
			               classNames={{
				               enter: styles['slide-enter'],
				               enterActive: styles['slide-enter-active'],
				               exit: styles['slide-exit'],
				               exitActive: styles['slide-exit-active'],
			               }}
			               unmountOnExit>
				<div ref={nodeRef} className={ styles['category__content'] }>
					{ categoryContent }
				</div>
			</CSSTransition>
		</div>
	);
};

export default OnboardingCategoryItem;