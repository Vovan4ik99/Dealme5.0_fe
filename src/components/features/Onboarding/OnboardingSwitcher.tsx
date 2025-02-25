import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import WelcomeStep from "./steps/0_WelcomeStep/WelcomeStep.tsx";
import { useNavigate } from "react-router-dom";
import ExperienceLevelStep from "./steps/1_ExperienceLevelStep/ExperienceLevelStep.tsx";
import Footer from "../../layout/Footer/Footer.tsx";
import styles from "./Onboarding.module.scss";
import OnboardingModalItem from "./items/OnboardingModalItem/OnboardingModalItem.tsx";
import SpecializationStep from "./steps/2_SpecializationStep/SpecializationStep.tsx";
import { stepCategories } from "./stepCategories.ts";
import WorkingDaysStep from "./steps/3_WorkingDaysStep/WorkingDaysStep.tsx";
import WorkingHoursStep from "./steps/4_WorkingHoursStep/WorkingHoursStep.tsx";
import IncomeGoalStep from "./steps/5_IncomeGoalStep/IncomeGoalStep.tsx";
import IndustryStep from "./steps/6_IndustryStep/IndustryStep.tsx";
import TypeOfSalesStep from "./steps/7_TypeOfSalesStep/TypeOfSalesStep.tsx";
import SectorStep from "./steps/8_SectorStep/SectorStep.tsx";
import ActivitiesStep from "./steps/9_ActivitiesStep/ActivitiesStep.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import SalesToolsStep from "./steps/10_SalesToolsStep/SalesToolsStep.tsx";
import btn_back from '@icons/onboarding/btn_back_icon.svg';
import { getCurrentStepByUserAbsentData } from "@utils/onboardingUtils.ts";

const OnboardingSwitcher = () => {
	const { user, getLoggedUserData, loadingStatus } = useContext(AuthContext);
	const [ step, setStep ] = useState<number>(0);
	const navigate = useNavigate();

	useEffect(() => {
		setStep(getCurrentStepByUserAbsentData(user));
	}, [ user ]);

	useEffect(() => {
		if (step > 10) {
			navigate("/profile");
		}
	}, [ navigate, step ]);

	if (!user) {
		return null;
	}

	const incrementStep = () => {
		const token = localStorage.getItem("token");
		//We need this check to render 0 greeting step component
		if (step !== 0) {
			getLoggedUserData(token!);
		}
		setStep((step) => step + 1);
	};

	const decrementStep = () => {
		setStep((step) => step - 1);
	};

	const getStepTitle = () => {
		const category = stepCategories.find(({ steps }) =>
			steps.some((category) => category.stepNumber === step)
		);
		return category?.title.substring(0, category.title.length - 4);
	};

	const renderStepComponent = () => {
		switch (step) {
			case 1:
				return <ExperienceLevelStep selectedExperience={ user.experienceLevel } onNext={ incrementStep }/>;
			case 2:
				return <SpecializationStep userSpecialization={ user.specialization } onNext={ incrementStep }/>;
			case 3:
				return <WorkingDaysStep userWorkingDays={ user.workingDays } onNext={ incrementStep }/>;
			case 4:
				return <WorkingHoursStep userWorkingHours={ user.workingHours } onNext={ incrementStep }/>;
			case 5:
				return <IncomeGoalStep userGoal={ user.incomeGoal } onNext={ incrementStep }/>;
			case 6:
				return <IndustryStep userSubIndustries={ user.subIndustries } onNext={ incrementStep }/>;
			case 7:
				return <TypeOfSalesStep userTypeOfSales={ user.typeOfSales } onNext={ incrementStep }/>;
			case 8:
				return <SectorStep userSectors={ user.sectors } onNext={ incrementStep }/>;
			case 9:
				return <ActivitiesStep userActivities={ user.selectedActivities } onNext={ incrementStep }/>;
			case 10:
				return <SalesToolsStep userTools={ user.salesTools } onNext={ incrementStep }/>;
			default:
				return <></>;
		}
	};

	if (loadingStatus === "loading") {
		return <LoadingSpinner/>;
	}

	if (step === 0) {
		return <WelcomeStep onNext={ incrementStep } username={ user.firstName + " " + user.lastName }/>;
	}

	return (
		<>
			<div className={ styles["onboarding-step"] }>
				<div className={ styles["onboarding-step__content"] }>
					<div className={ styles["onboarding-step__info-wrapper"] }>
						{ step > 1 && (
							<button
								onClick={ () => decrementStep() }
								className={ "btn btn--back" }
							>
								<img src={ btn_back } alt={ 'btn back' }/>
							</button>
						) }
						<p className={ styles["onboarding-step__info"] }>
							{ step } / 10{ " " }
							<span className={ styles["onboarding-step__circle"] }></span>{ " " }
							{ getStepTitle() }
						</p>
					</div>
					{ renderStepComponent() }
				</div>
				<OnboardingModalItem currentStep={ step }/>
			</div>
			<Footer isHyphenated={ step < 1 } isCentered={ step < 1 }/>
		</>
	);
};

export default OnboardingSwitcher;
