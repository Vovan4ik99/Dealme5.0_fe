export interface IFreelancerBackgroundResponse {
	id: number;
    freelancerId: number;
	pictureData: string;
}

export interface IFreelancerBarResponse {
	visibilityStatus: "NORMAL" | "LIMITED";
	accountStatus: "NORMAL" | "LIMITED";
	rate: number;
	count: number;
	points: number;
	ordersCount: number;
}

export interface IFreelancerNameRequest {
	firstName: string;
	lastName: string;
}