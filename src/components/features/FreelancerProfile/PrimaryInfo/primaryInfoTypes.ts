import {IFreelancerBarResponse} from "@shared/freelancerTypes.ts";

export type FreelancerPrimaryInfo = Pick<IFreelancerBarResponse,
	'rate' | 'accountStatus' | 'visibilityStatus' | 'points' | 'count' | 'ordersCount'>;