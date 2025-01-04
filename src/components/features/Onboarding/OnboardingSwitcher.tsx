import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import WelcomeStep from "./steps/0_WelcomeStep/WelcomeStep.tsx";
import {useNavigate} from "react-router-dom";
import ExperienceLevelStep from "./steps/1_ExperienceLevelStep/ExperienceLevelStep.tsx";
import Footer from "../../layout/Footer/Footer.tsx";
import styles from "./Onboarding.module.scss";
import OnboardingModalItem from "./items/OnboardingModalItem/OnboardingModalItem.tsx";
import SpecializationStep from "./steps/2_SpecializationStep/SpecializationStep.tsx";
import {stepCategories} from "./stepCategories.ts";
import WorkingDaysStep from "./steps/3_WorkingDaysStep/WorkingDaysStep.tsx";
import WorkingHoursStep from "./steps/4_WorkingHoursStep/WorkingHoursStep.tsx";
import {WorkingDayKey} from "@constants/workingDays.ts";
import IncomeGoalStep from "./steps/5_IncomeGoalStep/IncomeGoalStep.tsx";
import IndustryStep from "./steps/6_IndustryStep/IndustryStep.tsx";
import TypeOfSalesStep from "./steps/7_TypeOfSalesStep/TypeOfSalesStep.tsx";
import SectorStep from "./steps/8_SectorStep/SectorStep.tsx";
import ActivitiesStep from "./steps/9_ActivitiesStep/ActivitiesStep.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import SalesToolsStep from "./steps/10_SalesToolsStep/SalesToolsStep.tsx";
import btn_back from '@icons/onboarding/btn_back_icon.svg';

const OnboardingSwitcher = () => {
	const {user, getLoggedUserData, loadingStatus} = useContext(AuthContext);
	const [step, setStep] = useState<number>(0);
	const navigate = useNavigate();

	const countStep = useCallback((): number => {
		if (user?.experienceLevel === null) {
			return 0;
		}
		if (user?.specialization === null) {
			return 2;
		}
		if (user?.workingDays.length === 0) {
			return 3;
		}
		if (user?.workingHours === null) {
			return 4;
		}
		if (user?.incomeGoal === null) {
			return 5;
		}
		if (user?.subIndustries.length === 0) {
			return 6;
		}
		if (user?.typeOfSales === null) {
			return 7;
		}
		if (user?.sectors.length === 0) {
			return 8;
		}
		if (user?.selectedActivities.length === 0) {
			return 9;
		}
		if (user?.salesTools.length === 0) {
			return 10;
		}
		return 11;
	}, [user]);

	useEffect(() => {
		setStep(countStep());
	}, [countStep]);

	useEffect(() => {
		if (step > 10) {
			navigate("/");
		}
	}, [navigate, step]);

	const incrementStep = useCallback(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			return;
		}
		if (step === 0) {
			setStep((step) => step + 1);
			return;
		}
		getLoggedUserData(token)
			.then(() => setStep((step) => step + 1))
			.catch((e) => console.log(e));
	}, [getLoggedUserData, step]);

	const decrementStep = () => {
		setStep((step) => step - 1);
	};

	const getStepTitle = () => {
		const category = stepCategories.find(({steps}) =>
			steps.some((category) => category.stepNumber === step)
		);
		if (!category) {
			return null;
		}
		return category.title.substring(0, category.title.length - 4);
	};

	const renderStepComponent = useCallback(() => {
		if (!user) return null;
		switch (step) {
			case 0:
				return (
					<WelcomeStep
						onNext={incrementStep}
						username={user.firstName + " " + user.lastName}
					/>
				);
			case 1:
				return (
					<ExperienceLevelStep
						selectedExperience={user.experienceLevel}
						onNext={incrementStep}
					/>
				);
			case 2:
				return (
					<SpecializationStep
						userSpecialization={user.specialization}
						onNext={incrementStep}
					/>
				);
			case 3:
				return (
					<WorkingDaysStep
						userWorkingDays={user.workingDays as WorkingDayKey[]}
						onNext={incrementStep}
					/>
				);
			case 4:
				return (
					<WorkingHoursStep
						userWorkingHours={user.workingHours}
						onNext={incrementStep}
					/>
				);
			case 5:
				return (
					<IncomeGoalStep userGoal={user.incomeGoal} onNext={incrementStep}/>
				);
			case 6:
				return (
					<IndustryStep
						userSubIndustries={user.subIndustries}
						onNext={incrementStep}
					/>
				);
			case 7:
				return (
					<TypeOfSalesStep
						userTypeOfSales={user.typeOfSales}
						onNext={incrementStep}
					/>
				);
			case 8:
				return <SectorStep userSectors={user.sectors} onNext={incrementStep}/>;
			case 9:
				return (
					<ActivitiesStep
						userActivities={user.selectedActivities}
						onNext={incrementStep}
					/>
				);
			case 10:
				return (
					<SalesToolsStep userTools={user.salesTools} onNext={incrementStep}/>
				);
			default:
				return <></>;
		}
	}, [step, incrementStep, user]);

	if (loadingStatus === "loading") {
		return <LoadingSpinner/>;
	}

	return (
		<>
			{step > 0 ? (
				<div className={styles["onboarding-step"]}>
					<div className={styles["onboarding-step__content"]}>
						<div className={styles["onboarding-step__info-wrapper"]}>
							{step > 1 && (
								<button
									onClick={() => decrementStep()}
									className={"btn btn--back"}
								>
									<img src={btn_back} alt={'btn back'} />
								</button>
							)}
							<p className={styles["onboarding-step__info"]}>
								{step} / 10{" "}
								<span className={styles["onboarding-step__circle"]}></span>{" "}
								{getStepTitle()}
							</p>
						</div>
						{renderStepComponent()}
					</div>
					<OnboardingModalItem currentStep={step}/>
				</div>
			) : (
				renderStepComponent()
			)}
			<Footer isHyphenated={step < 1} isCentered={step < 1}/>
		</>
	);
};

export default OnboardingSwitcher;
