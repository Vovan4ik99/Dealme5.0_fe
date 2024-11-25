import {WorkingDayKey} from "@constants/workingDays.ts";

export interface IWorkingDayProps {
	onNext: () => void;
	userWorkingDays: WorkingDayKey[];
}