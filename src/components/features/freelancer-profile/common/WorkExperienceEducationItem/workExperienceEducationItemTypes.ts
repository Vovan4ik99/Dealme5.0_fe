import { IFreelancerState } from "@shared/freelancer/localization.ts";

type ItemType = 'workExperience' | 'education';

interface IWorkExperienceEducationItem {
	title: string;
	organization: string;
	startDate: string;
	endDate?: string;
	city: string;
	state: string;
	itemType: ItemType;
	states: IFreelancerState[];
}

type WorkExperienceEducationModalItem = {
	isModalItem: true;
	onEdit: () => void;
	onDelete: () => void;
}

type WorkExperienceEducationPageItem = {
	isModalItem: false;
	onEdit?: never;
	onDelete?: never;
}

export type WorkExperienceEducationItemProps = IWorkExperienceEducationItem &
	(WorkExperienceEducationModalItem | WorkExperienceEducationPageItem);

