import { IFreelancerState, IFreelancerWorkExperience } from "@shared/freelancerTypes.ts";

interface IWorkExperienceBaseItem {
	workExperience: IFreelancerWorkExperience;
	states: IFreelancerState[];
}

type WorkExperienceModalItem = {
	isModalItem: true;
	onEdit: () => void;
	onDelete: () => void;
}

type WorkExperiencePageItem = {
	isModalItem: false;
	onEdit?: never;
	onDelete?: never;
}

export type WorkExperienceItemProps = IWorkExperienceBaseItem & (WorkExperienceModalItem | WorkExperiencePageItem);

