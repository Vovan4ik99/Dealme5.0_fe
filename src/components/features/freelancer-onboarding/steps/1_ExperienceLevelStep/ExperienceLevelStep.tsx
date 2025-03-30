import React, { useState } from "react";
import styles from '../../Onboarding.module.scss';
import ExperienceLevelItem
	from "@components/features/freelancer-onboarding/items/ExperienceLeveIItem/ExperienceLevelItem.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import { EXPERIENCE_LEVELS, ExperienceLevelKey } from "@constants/onboarding/experienceLevel.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import { IExperienceLevelProps } from "./experienceLevelStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const ExperienceLevelStep: React.FC<IExperienceLevelProps> = ({ onNext, selectedExperience }) => {

	const [ selectedLevel, setSelectedLevel ] = useState<ExperienceLevelKey | null>(selectedExperience as ExperienceLevelKey);

	const { errorMessage, patchExperienceLevel, loadingStatus } = useFreelancerOnboardingService();

	const onItemChange = (selectedLevel: ExperienceLevelKey) => {
		setSelectedLevel(selectedLevel);
	}

	const onSubmit = async () => {
		await patchExperienceLevel(selectedLevel!)
			.then(() => {
				setSelectedLevel(null);
				onNext();
			}).catch((error) => {
				console.log(error);
			});
	}

	const renderExperienceLevels = (): React.ReactNode[] => {
		return Object.entries(EXPERIENCE_LEVELS).map(([ key, { info, title } ]) => {
			const isSelected = selectedLevel == key;
			return <ExperienceLevelItem
				key={ key }
				title={ title }
				info={ info }
				id={ key }
				isSelected={ isSelected }
				onChange={ () => onItemChange(key as ExperienceLevelKey) }/>
		});
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>
				Jakie jest Twoje doświadczenie w sprzedaży?
			</h1>
			<div className={ styles['onboarding-step__items'] }>
				{ renderExperienceLevels() }
			</div>
			<button disabled={ selectedLevel === null }
			        onClick={ () => onSubmit() } className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</AnimatedStep>
	)

};

export default ExperienceLevelStep;