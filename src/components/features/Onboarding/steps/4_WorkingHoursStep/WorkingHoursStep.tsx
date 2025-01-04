import React, {useEffect, useState} from "react";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import {IWorkingHour} from "@shared/onboardingTypes.ts";
import WorkingHourItem from "../../items/WorkingHourItem/WorkingHourItem.tsx";
import {IWorkingHoursStepProps} from "./workingHoursStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const WorkingHoursStep: React.FC<IWorkingHoursStepProps> = ({onNext, userWorkingHours}) => {

	const [selectedHour, setSelectedHour] = useState<string | null>(userWorkingHours);
	const [workingHours, setWorkingHours] = useState<IWorkingHour[]>([]);
	const {loadingStatus, errorMessage, getWorkingHours, patchWorkingHours} = useOnboardingService();

	const selectWorkingHour = (newHour: string) => {
		setSelectedHour(newHour);
	}

	useEffect(() => {
		getWorkingHours()
			.then(response => setWorkingHours(response))
			.catch(e => console.error(e));
	}, [getWorkingHours]);

	const onSubmit = () => {
		if (selectedHour) {
			patchWorkingHours(selectedHour)
				.then(() => onNext())
				.catch(e => console.error(e));
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>Ile godzin w tygodniu jesteś w stanie poświecić na Dealme?</h1>
			<div className={styles['onboarding-step__items']}>
				{loadingStatus === 'idle' && workingHours.map(hour => {
					const isSelected = selectedHour === hour.workingHour;
					return <WorkingHourItem key={hour.workingHour}
					                        text={hour.description}
					                        isSelected={isSelected}
					                        onChange={() => selectWorkingHour(hour.workingHour)}/>
				})}
			</div>
			<button disabled={selectedHour === null}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	)
}

export default WorkingHoursStep;