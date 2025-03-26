import React from "react";
import { IOnboardingOptionProps } from "@ui/onboarding/OnboardingOption/onboardingOptionTypes.ts";
import styles from './OnboardingOption.module.scss';

const OnboardingOption: React.FC<IOnboardingOptionProps> = ({ title, description, onClick, isActive = false }) => {

	return (
		<button className={ `${ styles['option'] } ${ isActive && styles['option--active'] }` }
		        onClick={ onClick }>
			<div className={ `${ styles['option__circle'] } ${ isActive && styles['option__circle--active'] }` }>
				{isActive && <span></span>}
			</div>
			<div className={ styles['option__content'] }>
				<p className={ styles['option__title'] }>{ title }</p>
				{description !== undefined &&
					<p className={ styles['option__description'] }>{ description }</p>
				}
			</div>
		</button>
	);
};

export default OnboardingOption;