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

export interface IActivity {
	activityId: number;
	name: string;
	level: number;
}

export interface ISalesTool {
	id: number;
	toolName: string;
	kind: string;
}