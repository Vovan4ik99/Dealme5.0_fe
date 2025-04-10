import React, { useCallback, useEffect, useState } from "react";
import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { IWorkingDaysModalItemProps } from "./workingDaysModalItemTypes.ts";
import styles from "./WorkingDaysModalItem.module.scss";
import WorkingDaysList from "@entities/WorkingDaysList/WorkingDaysList.tsx";

const WorkingDaysModalItem: React.FC<IWorkingDaysModalItemProps> = ({
	                                                                    userWorkingDays,
	                                                                    onSave,
	                                                                    registerOnSave
                                                                    }) => {

	const [ selectedDays, setSelectedDays ] = useState<WorkingDayKey[]>(userWorkingDays);

	const handleSave = useCallback(() => {
		onSave(selectedDays);
	}, [ onSave, selectedDays ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<div className={ styles['items'] }>
			<WorkingDaysList setSelectedDays={ setSelectedDays }
			                 selectedDays={ selectedDays }/>
		</div>
	)
};

export default WorkingDaysModalItem;