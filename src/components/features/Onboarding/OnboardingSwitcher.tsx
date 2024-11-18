import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext/AuthContext.ts";
import WelcomeStep from "./steps/0_WelcomeStep/WelcomeStep.tsx";
import {useNavigate} from "react-router-dom";
import ExperienceLevelStep from "./steps/1_ExperienceLevelStep/ExperienceLevelStep.tsx";
import Footer from "../../layout/Footer/Footer.tsx";
import styles from './Onboarding.module.scss';
import OnboardingModalItem from "./items/OnboardingModalItem/OnboardingModalItem.tsx";
import SpecializationStep from "./steps/2_SpecializationStep/SpecializationStep.tsx";
import icon_back from '../../../assets/icons/btn_back_icon.svg';
import {stepCategories} from "./stepCategories.ts";

const OnboardingSwitcher = () => {
	const {user} = useContext(AuthContext);
	const [step, setStep] = useState<number>(0);
	const navigate = useNavigate();

	const countStep = useCallback((): number => {
		if (user?.experienceLevel === null) {
			return 0;
		} else if (user?.specialization === null) {
			return 2;
		} else if (user?.workingDays.length === 0) {
			return 3;
		} else if (user?.workingHours === null) {
			return 4;
		} else if (user?.incomeGoal === null) {
			return 5;
		} else if (user?.subIndustries.length === 0) {
			return 6;
		} else if (user?.typeOfSales === null) {
			return 7;
		} else if (user?.sectors === null) {
			return 8;
		} else if (user?.selectedActivities.length === 0) {
			return 9;
		} else if (user?.salesTools.length === 0) {
			return 10;
		} else {
			return 11;
		}
	}, [user])

	useEffect(() => {
		setStep(countStep());
	}, [countStep]);

	useEffect(() => {
		if (step > 10) {
			navigate("/");
		}
	}, [step, navigate]);

	const incrementStep = () => {
		setStep((step) => step + 1);
	}

	const decrementStep = () => {
		setStep((step) => step - 1);
	}

	const getStepTitle = () => {
		const category = stepCategories.find(({ steps }) =>
			steps.some((category) => category.stepNumber === step)
		);

		if (!category) {
			return null;
		}

		return category.title.substring(0, category.title.length - 4);
	}

	const renderStepComponent = useCallback(() => {
		switch (step) {
			case 0:
				return <WelcomeStep onNext={incrementStep} username={user?.firstName + " " + user?.lastName}/>
			case 1:
				return <ExperienceLevelStep onNext={incrementStep}/>
			case 2:
				return <SpecializationStep onNext={incrementStep}/>
			default:
				return <></>;
		}
	}, [step, user])

	return (
		<>
			{ step > 0 ?
				<div className={styles['onboarding-step']}>
					<div className={styles['onboarding-step__content']}>
						<div className={styles['onboarding-step__info-wrapper']}>
							{step > 1 &&
								<button onClick={() => decrementStep()} className={'btn btn--back'}>
									<img src={icon_back} alt={'button back icon'}/>
								</button>
							}
							<p className={styles['onboarding-step__info']}>
								{step} / 10 <span className={styles['onboarding-step__circle']}></span> {getStepTitle()}
							</p>
						</div>
						{renderStepComponent()}
					</div>
					<OnboardingModalItem currentStep={step}/>
				</div> :
				renderStepComponent()}
			<Footer isHyphenated={step < 1} isCentered={step < 1}/>
		</>
	)
}

export default OnboardingSwitcher;
