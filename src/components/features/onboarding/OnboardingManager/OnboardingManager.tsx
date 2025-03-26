import React, { useCallback, useEffect, useState } from "react";
import { IOnboardingManagerProps, OnboardingUserData } from "./onboardingManagerTypes.ts";
import styles from "./OnboardingManager.module.scss";
import { ReactComponent as BackIcon } from "@icons/named_exported/onboarding/arrow_left.svg";
import OnboardingProgressTracker
	from "@components/features/onboarding/OnboardingProgressTracker/OnboardingProgressTracker.tsx";
import { useAuthService } from "@services/auth/authService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { useLoadingStatus } from "@hooks/loadingStatus.hook.ts";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { getUserCurrentStep } from "@utils/onboardingUtils.ts";

const OnboardingManager = <T extends OnboardingUserData>({
	                                                         userRole,
	                                                         fetchData,
	                                                         stepData
                                                         }: IOnboardingManagerProps<T>) => {

	const isRequestLoading = useLoadingStatus(
		useAuthService(),
		useInvestorOnboardingService(),
		useFreelancerOnboardingService()
	);

	const [ currentStep, setCurrentStep ] = useState<number>(0);
	const [ onboardingUserData, setOnboardingUserData ] = useState<T>();
	const [ isComponentLoading, setIsComponentLoading ] = useState<boolean>(true);

	const getLoggedUserData = useCallback(() => {
		fetchData()
			.then(setOnboardingUserData)
			.catch(console.error);
	}, [ fetchData ]);

	useEffect(getLoggedUserData, [ getLoggedUserData ]);

	useEffect(() => {
		if (!onboardingUserData) return;

		setCurrentStep(getUserCurrentStep(onboardingUserData, userRole));
		setIsComponentLoading(false);
	}, [ onboardingUserData, userRole ]);

	const getStepComponent = () => {
		const Component = stepData[currentStep].component;

		if (!Component || !onboardingUserData) {
			return <></>;
		}

		const onSubmit = () => {
			getLoggedUserData();
			setCurrentStep((prevState) => (prevState + 1));
		};

		return <Component userData={ onboardingUserData } onSubmit={ onSubmit }/>;
	};

	if (isRequestLoading || isComponentLoading) {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['manager'] }>
			<div>
				<header className={ styles['manager__header'] }>
					<button className={ styles['manager__back'] }
					        disabled={ currentStep === 0 }
					        onClick={ () => setCurrentStep((prevState) => (prevState - 1)) }>
						<BackIcon width={ 5 } height={ 8 }/>
					</button>
					<span className={ styles['manager__subtitle'] }>
						{ currentStep + 1 } / { stepData.length }
					</span>
					<span className={ styles['manager__circle'] }/>
					<span className={ styles['manager__subtitle'] }>
						{ stepData[currentStep].subtitle }
					</span>
				</header>
				<h1 className={ styles['manager__title'] }>{ stepData[currentStep].title }</h1>
				{ getStepComponent() }
			</div>
			<OnboardingProgressTracker step={ currentStep }
			                           userType={ userRole }
			                           maxSteps={ 10 }/>
		</div>
	);
};

export default OnboardingManager;