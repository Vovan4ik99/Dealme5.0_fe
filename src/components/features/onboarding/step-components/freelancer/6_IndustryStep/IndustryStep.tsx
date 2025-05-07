import React, { useEffect, useState } from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import styles from './IndustryStep.module.scss';
import { IIndustry, ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import IndustryList from "@entities/IndustryList/IndustryList.tsx";

const IndustryStep: React.FC<IStepComponentProps<IFreelancerData>> = ({ userData, onSubmit }) => {

	const { getIndustries, patchSubIndustries } = useFreelancerOnboardingService();

	const [ industries, setIndustries ] = useState<IIndustry[]>([]);
	const [ selectedSubIndustries, setSelectedSubIndustries ] = useState<ISubIndustry[]>(userData.subIndustries);

	useEffect(() => {
		getIndustries()
			.then(setIndustries)
			.catch(console.error);
	}, [ getIndustries ]);

	const handleSubmit = () => {
		if (selectedSubIndustries.length === 0) return;

		patchSubIndustries(selectedSubIndustries.map(subIndustry => subIndustry.id))
			.then(onSubmit)
			.catch(console.error);
	};

	return (
		<div className={ styles['industry'] }>
			<IndustryList industries={ industries }
			              selectedSubIndustries={ selectedSubIndustries }
			              setSelectedSubIndustries={ setSelectedSubIndustries }/>
			<button className={ styles["industry__btn"] }
			        onClick={ handleSubmit }
			        disabled={ selectedSubIndustries.length === 0 }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default IndustryStep;