import React, { useCallback, useContext, useEffect, useState } from "react";
import { IOnboardingManagerProps, OnboardingUserData } from "./onboardingManagerTypes.ts";
import styles from "./OnboardingManager.module.scss";
import { ReactComponent as BackIcon } from "@icons/named_exported/onboarding/arrow_left.svg";
import OnboardingProgressTracker
	from "@components/features/onboarding/OnboardingProgressTracker/OnboardingProgressTracker.tsx";
import { useAuthService } from "@services/auth/authService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { useLoadingStatus } from "@hooks/loadingStatus.hook.ts";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { getUserCurrentStep } from "@utils/onboardingUtils.ts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const OnboardingManager = <T extends OnboardingUserData>({
	                                                         userRole,
	                                                         fetchData,
	                                                         stepData
                                                         }: IOnboardingManagerProps<T>) => {

	const navigate = useNavigate();

	const isRequestLoading = useLoadingStatus(
		useAuthService(),
		useInvestorOnboardingService(),
		useFreelancerOnboardingService(),
		useContext(AuthContext)
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

		const step = getUserCurrentStep(onboardingUserData, userRole);

		setCurrentStep(step);
		setIsComponentLoading(false);
	}, [ navigate, onboardingUserData, stepData.length, userRole ]);

	const handleFinishOnboarding = useCallback(() => {
		if (userRole === 'INVESTOR') {
			navigate('/investor/onboarding/summary');
			return;
		}
		navigate('/freelancer/profile');
	}, [ navigate, userRole ]);

	useEffect(() => {
		if (currentStep + 1 > stepData.length) {
			handleFinishOnboarding();
		}
	}, [ currentStep, handleFinishOnboarding, navigate, stepData.length ]);

	const getStepComponent = () => {
		if (!onboardingUserData) return <></>;

		const Component = stepData[currentStep].component;

		if (!Component) return <></>;

		const onSubmit = () => {
			getLoggedUserData();
			setCurrentStep((prevState) => (prevState + 1));
		};

		return <Component userData={ onboardingUserData } onSubmit={ onSubmit }/>;
	};

	if (isRequestLoading || isComponentLoading || currentStep >= stepData.length) {
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
			                           maxSteps={ stepData.length }/>
		</div>
	);
};

export default OnboardingManager;