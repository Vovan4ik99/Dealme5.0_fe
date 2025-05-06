import {IFreelancerBarResponse, IFreelancerData} from "@shared/freelancer/common.ts";

export type FreelancerPrimaryInfo = Pick<IFreelancerBarResponse,
	'rate' | 'accountStatus' | 'visibilityStatus' | 'points' | 'count' | 'ordersCount'>;

export interface IFreelancerPrimaryInfoProps {
	freelancerId: number;
	isLoggedUserProfile: boolean;
	freelancerData: IFreelancerData;
	onSubmit: () => void;
}