import {WorkingDayKey} from "@constants/workingDays.ts";

export interface WorkingDaysProps {
	onClose: () => void;
	userWorkingDays: WorkingDayKey[];
    onSave: (newDays: string[]) => void;
}


