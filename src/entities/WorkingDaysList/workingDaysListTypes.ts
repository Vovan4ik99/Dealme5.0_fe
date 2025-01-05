import {WorkingDayKey} from "@constants/workingDays.ts";

export interface IWorkingDaysListProps {
	selectedWorkingDays: WorkingDayKey[];
	onChange: (key: WorkingDayKey) => void;
}