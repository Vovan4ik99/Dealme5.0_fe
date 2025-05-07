import React, { useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { EXPERIENCE_LEVELS, ExperienceLevelKey } from "@constants/onboarding/experienceLevel.ts";
import styles from "./ExperienceStep.module.scss";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const ExperienceStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { patchExperienceLevel } = useFreelancerOnboardingService();

	const [ selectedLevel, setSelectedLevel ] = useState<ExperienceLevelKey | undefined>(
		userData.experienceLevel as ExperienceLevelKey
	);

	const renderExperienceLevels = (): React.ReactNode[] => {
		return Object.entries(EXPERIENCE_LEVELS).map(([ key, { info, title } ]) => {
			const isActive = selectedLevel == key;
			return <OnboardingOption key={ key }
			                         title={ title }
			                         description={ info }
			                         isActive={ isActive }
			                         onClick={ () => setSelectedLevel(key as ExperienceLevelKey) }/>
		});
	};

	const handleSubmit = () => {
		if (!selectedLevel) return;

		patchExperienceLevel(selectedLevel)
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['experience'] }>
			<div className={ styles['experience__content'] }>
				{ renderExperienceLevels() }
			</div>
			<button className={ styles["experience__btn"] }
			        disabled={ !selectedLevel }
			        onClick={ handleSubmit } >
				Przejdż dalej
			</button>
		</div>
	);
};

export default ExperienceStep;