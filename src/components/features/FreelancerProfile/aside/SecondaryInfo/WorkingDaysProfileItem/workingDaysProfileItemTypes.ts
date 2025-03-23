import { WorkingDayKey } from "@constants/workingDays.ts";

export interface IWorkingDaysProfileItemProps {
	userWorkingDays: WorkingDayKey[];
	onSave: () => void;
	isLoggedUserProfile: boolean;
}
