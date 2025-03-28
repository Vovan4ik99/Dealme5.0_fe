import { IFreelancerBarResponse } from "@shared/freelancer/common.ts";

export type FreelancerPrimaryInfo = Pick<IFreelancerBarResponse,
	'rate' | 'accountStatus' | 'visibilityStatus' | 'points' | 'count' | 'ordersCount'>;

export interface IFreelancerPrimaryInfoProps {
	freelancerId: number;
	isLoggedUserProfile: boolean;
}