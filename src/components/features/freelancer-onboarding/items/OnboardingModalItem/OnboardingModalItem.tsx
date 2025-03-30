import React, { useRef } from "react";
import styles from "./OnboardingModalItem.module.scss";
import OnboardingModalCategory from "../OnboardingModalCategory/OnboardingModalCategory.tsx";
import { stepCategories } from "../../stepCategories.ts";
import { CSSTransition } from "react-transition-group";

const OnboardingModalItem: React.FC<{ currentStep: number }> = ({currentStep}) => {
	const ref = useRef<HTMLDivElement>(null);

	const getProgressPercent = () => {
		const totalSteps = stepCategories
			.reduce((sum, category) => sum + category.steps.length, 0);
		return Math.min(((currentStep - 1) / totalSteps) * 100, 100);
	}

	const getModalMainCategoryKind = (isActive: boolean, isFinished: boolean) => {
		if (isActive) return 'active';
		if (isFinished) return 'finished';
		return 'default';
	}

	const getModalInnerCategoryKind = (isActiveStep: boolean, stepNumber: number) => {
		if (isActiveStep) return 'withIconActive';
		if (stepNumber < currentStep) return 'finished';
		return 'withIcon';
	}

	const renderStepsCategories = () => {

		return <div className={styles['modal__wrapper']}>
			{stepCategories.map(({id, title, steps}) => {
				const isActive = steps.some((step) => step.stepNumber === currentStep);
				const isFinished = steps.every((step) => step.stepNumber < currentStep);

				return (
					<OnboardingModalCategory
						key={id}
						text={title}
						kind={getModalMainCategoryKind(isActive, isFinished)}
					>
						{isActive &&
							steps.map(({id: stepId, text, stepNumber}) => {
								const isActiveStep = stepNumber === currentStep;
								return (
									<OnboardingModalCategory
										key={stepId}
										text={text}
										kind={getModalInnerCategoryKind(isActiveStep, stepNumber)}
									/>
								);
							})}
					</OnboardingModalCategory>
				);
			})}
		</div>
	}

	return (
		<CSSTransition in appear timeout={{enter: 700, exit: 700}} unmountOnExit nodeRef={ref}
		               classNames={'animated--700'}>
			<div className={`${styles['modal']} animated--700`} ref={ref}>
				<div className={styles['modal__progress']}>
					<div className={styles['modal__progress-bar']}>
						<span style={{width: `${getProgressPercent()}%`}}></span>
					</div>
					<p className={styles['modal__progress-text']}>{getProgressPercent()} / 100%</p>
				</div>
				{renderStepsCategories()}
			</div>
		</CSSTransition>
	)
}

export default OnboardingModalItem;