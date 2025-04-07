import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";

export interface IWorkingDaysProfileItemProps {
	userWorkingDays: WorkingDayKey[];
	onSave: () => void;
	isLoggedUserProfile: boolean;
}
