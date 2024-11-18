import React, {useState} from "react";
import styles from '../../Onboarding.module.scss';
import ExperienceLevelItem from "../../items/ExperienceLeveIItem/ExperienceLevelItem.tsx";
import InputError from "../../../../ui/InputError/InputError.tsx";
import {EXPERIENCE_LEVELS, ExperienceLevelKey} from "../../../../../constans/experienceLevel.ts";
import {useOnboardingService} from "../../../../../services/onboardingService.ts";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";

const ExperienceLevelStep: React.FC<{onNext: () => void}> = ({onNext}) => {
	const {errorMessage, patchExperienceLevel} = useOnboardingService();
	const [selectedLevel, setSelectedLevel] = useState<ExperienceLevelKey | null>(null);

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
		return Object.entries(EXPERIENCE_LEVELS).map(([key, {info, title}]) => {
			const isSelected = selectedLevel == key;
			return <ExperienceLevelItem
				key={key}
				title={title}
				info={info}
				id={key}
				isSelected={isSelected}
				onChange={() => onItemChange(key as ExperienceLevelKey)}/>
		});
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>
				Jakie jest Twoje doświadczenie w sprzedaży?
			</h1>
			<div className={styles['onboarding-step__items']}>
				{renderExperienceLevels()}
			</div>
			<button disabled={selectedLevel === null}
			        onClick={() => onSubmit()} className={'btn'}>Przejdź dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)

};

export default ExperienceLevelStep;