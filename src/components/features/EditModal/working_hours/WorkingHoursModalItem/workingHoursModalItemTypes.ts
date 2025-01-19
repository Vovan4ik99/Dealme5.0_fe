import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";

export interface IWorkingHoursModalItemProps extends ISaveableChildProps {
	onSave: (selectedHour: string) => void;
	userWorkingHour: string;
}