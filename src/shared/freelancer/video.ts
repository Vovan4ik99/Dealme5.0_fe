export interface IFreelancerVideo {
	id: number,
	fileName: string,
	fileUrl: string,
	title: string,
	description: string,
	date: string
}

export interface IPatchVideoRequest {
	title: string;
}