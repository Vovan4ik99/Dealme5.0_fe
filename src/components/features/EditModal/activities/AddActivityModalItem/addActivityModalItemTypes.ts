import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IActivity } from "@shared/onboardingTypes.ts";

export interface IAddActivityModalItemProps extends ISaveableChildProps {
	onSave: (newActivity: IActivity, level: number) => void;
	activitiesToRender: IActivity[];
}

export interface IActivityAddForm {
	name: string;
	level: number;
}