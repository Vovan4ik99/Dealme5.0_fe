import React, { useState } from "react";
import { IOnboardingLayoutProps, IStepData } from "@components/layout/OnboardingLayout/onboardingLayoutTypes.ts";
import styles from "./OnboardingLayout.module.scss";
import FreelancerOnboardingNavbar
	from "@components/layout/OnboardingLayout/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import InvestorOnboardingNavbar
	from "@components/layout/OnboardingLayout/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import { ONBOARDING_STEPS_DATA } from "@components/layout/OnboardingLayout/onboardingStepsData.ts";
import { ReactComponent as BackIcon } from "@icons/named_exported/onboarding/arrow_left.svg";
import OnboardingProgressTracker
	from "@components/layout/OnboardingLayout/OnboardingProgressTracker/OnboardingProgressTracker.tsx";

const OnboardingLayout: React.FC<IOnboardingLayoutProps> = ({ userType }) => {

	const [ currentStep, setCurrentStep ] = useState<number>(0);

	const stepData: IStepData = ONBOARDING_STEPS_DATA[userType][currentStep];

	const getOnboardingNavbar = () => {
		switch (userType) {
			case 'INVESTOR':
				return <InvestorOnboardingNavbar/>;
			case 'FREELANCER':
				return <FreelancerOnboardingNavbar/>;
			default:
				return undefined;
		}
	};

	const getStepComponent = () => {
		const Component = stepData.component;

		//temporary until components will not be ready, then to remove
		if (!Component) {
			return <></>;
		}

		return <Component onSubmit={
			() => setCurrentStep((prevState) => (prevState + 1))
		}/>;
	};

	return (
		<section className={ styles['onboarding'] }>
			<div>
				{ getOnboardingNavbar() }
				<div className={ styles['onboarding__content'] }>
					<div>
						<header className={ styles['onboarding__header'] }>
							<button className={ styles['onboarding__back'] }
							        onClick={ () => setCurrentStep((prevState) => (prevState - 1)) }>
								<BackIcon width={ 5 } height={ 8 }/>
							</button>
							<span className={ styles['onboarding__subtitle'] }>
							{ currentStep + 1 } / { ONBOARDING_STEPS_DATA[userType].length }
						</span>
							<span className={ styles['onboarding__circle'] }></span>
							<span className={ styles['onboarding__subtitle'] }>
							{ stepData.subtitle }
						</span>
						</header>
						<h1 className={ styles['onboarding__title'] }>{ stepData.title }</h1>
						{ getStepComponent() }
					</div>
					<OnboardingProgressTracker step={ currentStep }
					                           userType={ userType }
					                           maxSteps={ ONBOARDING_STEPS_DATA[userType].length }/>
				</div>
			</div>
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	)
};

export default OnboardingLayout;