import { WorkingDayKey } from "@constants/onboarding/workingDays.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IWorkingDaysModalItemProps extends ISaveableChildProps {
	userWorkingDays: WorkingDayKey[];
	onSave: (items: WorkingDayKey[]) => void;
}