import React, {useCallback, useContext, useEffect, useState} from "react";
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
import { useAuthService } from "@services/auth/authService.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";

const OnboardingSwitcher = () => {
	const { user, loadingStatus } = useContext(AuthContext);

	const { fetchLoggedUserData } = useAuthService();

	const navigate = useNavigate();

	const [ step, setStep ] = useState<number>(0);
	const [ userData, setUserData ] = useState<IFreelancerData | undefined>(undefined);

	const refreshUserData = useCallback(() => {
		if (!user) return;

		fetchLoggedUserData(user.role)
			.then(setUserData)
			.catch(console.error);
	}, [ user, fetchLoggedUserData]);

	useEffect(refreshUserData, [ refreshUserData ]);

	useEffect(() => {
		if (!userData) return;

		setStep(getCurrentStepByUserAbsentData(userData));
	}, [ userData ]);

	useEffect(() => {
		if (step > 10) {
			navigate("/profile");
		}
	}, [ step, navigate ]);

	const incrementStep = () => {
		if (step !== 0) {
			refreshUserData();
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
		if(!userData) return <LoadingSpinner/>;

		switch (step) {
			case 1:
				return <ExperienceLevelStep selectedExperience={ userData.experienceLevel } onNext={ incrementStep }/>;
			case 2:
				return <SpecializationStep userSpecialization={ userData.specialization } onNext={ incrementStep }/>;
			case 3:
				return <WorkingDaysStep userWorkingDays={ userData.workingDays } onNext={ incrementStep }/>;
			case 4:
				return <WorkingHoursStep userWorkingHours={ userData.workingHours } onNext={ incrementStep }/>;
			case 5:
				return <IncomeGoalStep userGoal={ userData.incomeGoal } onNext={ incrementStep }/>;
			case 6:
				return <IndustryStep userSubIndustries={ userData.subIndustries } onNext={ incrementStep }/>;
			case 7:
				return <TypeOfSalesStep userTypeOfSales={ userData.typeOfSales } onNext={ incrementStep }/>;
			case 8:
				return <SectorStep userSectors={ userData.sectors } onNext={ incrementStep }/>;
			case 9:
				return <ActivitiesStep userActivities={ userData.selectedActivities } onNext={ incrementStep }/>;
			case 10:
				return <SalesToolsStep onNext={ incrementStep }/>;
			default:
				return <LoadingSpinner/>;
		}
	};

	if (loadingStatus === "loading") {
		return <LoadingSpinner/>;
	}

	if (step === 0 && userData) {
		return <WelcomeStep onNext={ incrementStep } username={ userData.firstName + " " + userData.lastName }/>;
	}

	return (
		<>
			<div className={ styles["onboarding-step"] }>
				<div className={ styles["onboarding-step__content"] }>
					<div className={ styles["onboarding-step__info-wrapper"] }>
						{ step > 1 && (
							<button
								onClick={ decrementStep }
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
