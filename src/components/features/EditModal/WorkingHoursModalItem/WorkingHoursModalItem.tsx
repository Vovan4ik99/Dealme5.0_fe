import React, {useCallback, useEffect, useState} from "react";
import {
	IWorkingHoursModalItemProps
} from "@components/features/EditModal/WorkingHoursModalItem/workingHoursModalItemTypes.ts";
import WorkingHoursList from "@entities/WorkingHoursList/WorkingHoursList.tsx";

const WorkingHoursModalItem: React.FC<IWorkingHoursModalItemProps> = ({userWorkingHour, onSave, registerOnSave}) => {
	
	const [selectedWorkingHour, setSelectedWorkingHour] = useState<string>(userWorkingHour);
	
	const handleSave = useCallback(() => {
		if (selectedWorkingHour) {
			onSave(selectedWorkingHour);
		}
	}, [onSave, selectedWorkingHour]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, onSave, registerOnSave]);
	
	return (
		<WorkingHoursList selectedHour={selectedWorkingHour} onChange={setSelectedWorkingHour}/>	
	);
};

export default WorkingHoursModalItem;