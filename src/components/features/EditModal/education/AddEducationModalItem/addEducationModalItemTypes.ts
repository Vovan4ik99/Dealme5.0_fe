import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import { IFreelancerEducationRequest } from "@shared/freelancer/education.ts";

export interface IAddEducationModalItemProps extends ISaveableChildProps {
	onSave: (request: IFreelancerEducationRequest) => void;
	education?: IFreelancerEducationRequest;
	isEdit?: boolean;
}

export interface IEducationForm {
	educationName: string;
	organization: string;
	country: string;
	state: string;
	city: string;
	startMonth: number;
	startYear: number;
	endMonth: number;
	endYear: number;
}