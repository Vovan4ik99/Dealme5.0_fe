import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";

export interface IWorkDayItemProps {
	onChange: (key: WorkingDayKey) => void;
	text: string;
	isSelected: boolean;
	workDayKey: WorkingDayKey
}