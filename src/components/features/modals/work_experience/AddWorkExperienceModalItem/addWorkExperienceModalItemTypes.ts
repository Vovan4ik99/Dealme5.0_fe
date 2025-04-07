import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IFreelancerWorkExperienceRequest } from "@shared/freelancer/work-experience.ts";

export interface IAddWorkExperienceModalItemProps extends ISaveableChildProps {
	onSave: (request: IFreelancerWorkExperienceRequest) => void;
	workExperience?: IFreelancerWorkExperienceRequest;
	isEdit?: boolean;
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