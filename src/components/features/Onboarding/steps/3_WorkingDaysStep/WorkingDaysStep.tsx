import React, {useState} from "react";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import {WORKING_DAYS, WorkingDayKey} from "@constants/workingDays.ts";
import WorkingDayItem from "../../items/WorkingDayItem/WorkingDayItem.tsx";
import {IWorkingDayProps} from "./workingDayStepTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const WorkingDaysStep: React.FC<IWorkingDayProps> = ({onNext, userWorkingDays}) => {

	const [selectedDays, setSelectedDays] = useState<WorkingDayKey[]>(userWorkingDays);
	const {loadingStatus, errorMessage, patchWorkingDays} = useOnboardingService();

	const onChange = (newDay: WorkingDayKey) => {
		setSelectedDays((prevState) => {
			return prevState.includes(newDay)
				? prevState.filter(day => day !== newDay)
				: [...prevState, newDay];
		})
	};

	const renderDays = () => {
		return Object.entries(WORKING_DAYS).map(([key, entry]) => {
			const isSelected = selectedDays.includes(key as WorkingDayKey);
			return (
				<WorkingDayItem
					key={key}
					text={entry}
					isSelected={isSelected}
					onChange={onChange}
					workDayKey={key as WorkingDayKey}
				/>
			);
		});
	};

	const onSubmit = () => {
		if (selectedDays.length > 0) {
			patchWorkingDays(selectedDays).then(() => {
				onNext();
			}).catch(e => console.log(e));
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={'title title--fs40'}>W jakie dni jesteś dostępny?</h1>
			<div className={styles['onboarding-step__items']}>
				{renderDays()}
			</div>
			<button disabled={selectedDays.length === 0}
			        onClick={() => onSubmit()}
			        className={'btn'}>Przejdż dalej
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</AnimatedStep>
	);
}

export default WorkingDaysStep;