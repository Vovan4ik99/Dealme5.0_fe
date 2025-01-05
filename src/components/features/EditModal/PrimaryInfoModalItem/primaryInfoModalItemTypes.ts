import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";
import {EXPERIENCE_LEVELS} from "@constants/experienceLevel.ts";

export interface IPrimaryInfoModalItemProps extends ISaveableChildProps, IPrimaryInfoEditFormData {
	onSave: () => void;
	freelancerId: number;
}

export interface IPrimaryInfoEditFormData {
	firstName: string;
	lastName: string;
	company: string;
	specialization: string;
	experience: keyof typeof EXPERIENCE_LEVELS;
	incomeGoal: string;
}