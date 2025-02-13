export interface IFreelancerEducation {
	id: number;
	nameOfEducation: string;
	titleOfEducation: string;
	startDate: string;
	endDate?: string | null;
	localization: {
		country: string;
		state: string;
		city: string;
	};
}

export type IFreelancerEducationRequest = Omit<IFreelancerEducation, "id">;