import React, { useState } from "react";
import { IOnboardingOptionProps } from "@ui/onboarding/OnboardingOption/onboardingOptionTypes.ts";
import styles from './OnboardingOption.module.scss';
import TooltipIcon from "@ui/common/TooltipIcon/TooltipIcon.tsx";
import checked_icon from "@icons/auth/checkbox_checked.svg"

const OnboardingOption: React.FC<IOnboardingOptionProps> = ({
	                                                            title,
	                                                            description,
	                                                            onClick,
	                                                            isActive = false,
	                                                            withTooltipIcon = false,
	                                                            tooltipText,
	                                                            withCheckboxInput = false,
	                                                            titleAddText = undefined,
	                                                            titleFontSize = 18,
	                                                            titleAddTextFontSize = titleFontSize,
	                                                            image
                                                            }) => {

	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	return (
		<button className={ `${ styles['option'] } ${ isActive && styles['option--active'] }` }
		        onClick={ onClick }
		        onMouseEnter={ () => setIsHovered(true) }
		        onMouseLeave={ () => setIsHovered(false) }>
			<div className={ styles['option__wrapper'] }>
				{ withCheckboxInput
					? <div className={ ` 
							${ styles['option__checkbox'] }
							${ isActive && styles['option__checkbox--active'] }
						` }>
						{ isActive && <img src={ checked_icon } alt="checked"/> }
					</div>
					: <div className={ `
						${ styles['option__circle'] } 
						${ isActive && styles['option__circle--active'] }
					` }>
						{ isActive && <span></span> }
					</div>
				}
				<div className={ styles['option__content'] }>
					<p className={ styles['option__title'] }
					   style={ { fontSize: titleFontSize } }>
						{ title }
						{ titleAddText &&
                            <span className={ styles['option__title--gray'] }
                                  style={ { fontSize: titleAddTextFontSize } }>
	                            { titleAddText }
							</span>
						}
					</p>
					{ description &&
                        <p className={ styles['option__description'] }>{ description }</p>
					}
				</div>
			</div>
			{ withTooltipIcon &&
                <TooltipIcon text={ tooltipText ?? 'Brak' } isActive={ isHovered }/>
			}
			{ !image || image.length !== 0 &&
				<img src={ image } alt="tool image"/>
			}
		</button>
	);
};

export default OnboardingOption;