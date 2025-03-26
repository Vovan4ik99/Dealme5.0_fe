import styles from "../Entity.module.scss";
import React from "react";
import { WORKING_DAYS, WorkingDayKey } from "@constants/workingDays.ts";
import WorkingDayItem from "@components/features/freelancer-onboarding/items/WorkingDayItem/WorkingDayItem.tsx";
import { IWorkingDaysListProps } from "@entities/WorkingDaysList/workingDaysListTypes.ts";

const WorkingDaysList: React.FC<IWorkingDaysListProps> = ({selectedWorkingDays, onChange}) => {

	const renderDays = () => {
		return Object.entries(WORKING_DAYS).map(([key, entry]) => {
			const isSelected = selectedWorkingDays.includes(key as WorkingDayKey);
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

	return (
		<div className={styles['item']}>
			{renderDays()}
		</div>
	);
}

export default WorkingDaysList;