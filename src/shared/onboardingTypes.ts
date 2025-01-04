export interface ISpecialization {
	id: number;
	name: string;
	description: string;
	pipeline: boolean;
	pipelineDescription: string;
}

export interface ISubIndustry {
	id: number;
	name: string;
	info: string;
}

export interface ISector {
	id: number;
	name: string;
	description: string;
}

export interface IFreelancerActivity {
	activityId: number;
	name: string;
	level: number;
}

export interface IActivity {
	id: number;
	name: string;
	info: string;
}

export interface IActivityRequest {
	activityId: number;
	level: number;
}

export interface ISalesTool {
	id: number;
	toolName: string;
	kind: string;
}

export interface IWorkingHour {
	workingHour: string;
	description: string;
}

export interface IIncomeGoal {
	incomeGoal: string;
	description: string;
	range: string;
}

export interface IIndustry {
	id: number;
	name: string;
	subIndustries: ISubIndustry[];
}

export interface ITypeOfSale {
	typeOfSales: string;
	description: string;
}