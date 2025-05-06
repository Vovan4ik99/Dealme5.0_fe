import {IFreelancerData} from "@shared/freelancer/common.ts";

export interface ISecondaryInfoProps {
	freelancerId: number;
	isLoggedUserProfile: boolean;
	onSubmit: () => void;
	freelancerData: IFreelancerData;
}