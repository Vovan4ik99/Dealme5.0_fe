import WorkingDaysList from "@entities/WorkingDaysList/WorkingDaysList.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { IWorkingDaysModalItemProps } from "./workingDaysModalItemTypes.ts";

const WorkingDaysModalItem: React.FC<IWorkingDaysModalItemProps> = ({ userWorkingDays, onSave, registerOnSave }) => {

	const [ selectedDays, setSelectedDays ] = useState<WorkingDayKey[]>(userWorkingDays);

	const handleSave = useCallback(() => {
		onSave(selectedDays);
	}, [ onSave, selectedDays ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	const onChange = (newDay: WorkingDayKey) => {
		setSelectedDays((prevState) => {
			return prevState.includes(newDay)
				? prevState.filter(day => day !== newDay)
				: [ ...prevState, newDay ];
		})
	};

	return (
		<WorkingDaysList selectedWorkingDays={ selectedDays } onChange={ onChange }/>
	)
};

export default WorkingDaysModalItem;