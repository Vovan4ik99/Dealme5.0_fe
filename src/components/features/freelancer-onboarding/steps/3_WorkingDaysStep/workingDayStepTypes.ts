import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";

export interface IWorkingDayProps {
	onNext: () => void;
	userWorkingDays: WorkingDayKey[];
}