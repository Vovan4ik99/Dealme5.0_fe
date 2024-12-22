import {WorkingDayKey} from "@constants/workingDays.ts";

export interface IWorkingDaysProps {
	onClose: () => void;
	userWorkingDays: WorkingDayKey[];
    onSave: (newDays: string[]) => void;
}