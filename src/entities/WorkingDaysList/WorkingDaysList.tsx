import React from "react";
import { WORKING_DAYS, WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { IWorkingDaysListProps } from "@entities/WorkingDaysList/workingDaysListTypes.ts";
import OnboardingOption from "@ui/onboarding/OnboardingOption/OnboardingOption.tsx";

const WorkingDaysList: React.FC<IWorkingDaysListProps> = ({ selectedDays, setSelectedDays }) => {

	const selectDay = (day: WorkingDayKey) => {
		setSelectedDays(
			selectedDays.includes(day)
				? selectedDays.filter(d => d !== day)
				: [...selectedDays, day]
		);
	};

	const renderDays = () => {
		return Object.entries(WORKING_DAYS).map(([ key, entry ]) => {
			const isActive = selectedDays.includes(key as WorkingDayKey);
			return (
				<OnboardingOption key={ key }
				                  title={ entry }
				                  onClick={ () => selectDay(key as WorkingDayKey) }
				                  withCheckboxInput
				                  titleFontSize={ 16 }
				                  isActive={ isActive }/>
			);
		});
	};

	return (
		<>
			{ renderDays() }
		</>
	);
}

export default WorkingDaysList;