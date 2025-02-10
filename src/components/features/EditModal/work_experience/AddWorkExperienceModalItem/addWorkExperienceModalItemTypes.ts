import { IFreelancerWorkExperienceRequest } from "@shared/freelancerTypes.ts";
import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";

export interface IAddWorkExperienceModalItemProps extends ISaveableChildProps {
	onSave: (request: IFreelancerWorkExperienceRequest) => void;
}

export interface IWorkExperienceForm {
	jobTitle: string;
	companyName: string;
	country: string;
	state: string;
	city: string;
	startMonth: number;
	startYear: number;
	endMonth: number;
	endYear: number;
}