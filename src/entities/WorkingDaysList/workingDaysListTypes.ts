import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";

export interface IWorkingDaysListProps {
	selectedWorkingDays: WorkingDayKey[];
	onChange: (key: WorkingDayKey) => void;
}