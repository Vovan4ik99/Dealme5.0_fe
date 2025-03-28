import React, { useState } from "react";
import { IOnboardingOptionProps } from "@ui/onboarding/OnboardingOption/onboardingOptionTypes.ts";
import styles from './OnboardingOption.module.scss';
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";

const OnboardingOption: React.FC<IOnboardingOptionProps> = ({
	                                                            title,
	                                                            description,
	                                                            onClick,
	                                                            isActive = false,
	                                                            withTooltipIcon = false,
	                                                            tooltipText
                                                            }) => {

	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	return (
		<button className={ `${ styles['option'] } ${ isActive && styles['option--active'] }` }
		        onClick={ onClick }
		        onMouseEnter={ () => setIsHovered(true) }
		        onMouseLeave={ () => setIsHovered(false) }>
			<div className={ styles['option__wrapper'] }>
				<div className={ `${ styles['option__circle'] } ${ isActive && styles['option__circle--active'] }` }>
					{ isActive && <span></span> }
				</div>
				<div className={ styles['option__content'] }>
					<p className={ styles['option__title'] }>{ title }</p>
					{ description !== undefined &&
                        <p className={ styles['option__description'] }>{ description }</p>
					}
				</div>
			</div>
			{ withTooltipIcon &&
                <TooltipIcon text={ tooltipText ?? 'Brak' } isActive={ isHovered }/>
			}
		</button>
	);
};

export default OnboardingOption;