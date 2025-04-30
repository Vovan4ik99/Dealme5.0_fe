import { IInvestorData } from "@shared/investor/common.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";

export type UserRole = 'FREELANCER' | 'INVESTOR' | 'ADMIN';

export interface ICreateUserRequest {
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	password: string;
}

export interface ICreateUserResponse {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
}

export interface IGetLoggedUserResponse {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
}

export interface IFreelancerAvatarResponse {
	pictureId: number;
	pictureData: string,
}

export interface ILoggedUserWithRole extends IGetLoggedUserResponse {
	role: UserRole;
}

export interface ILoggedFreelancerData extends ILoggedUserWithRole {
	role: 'FREELANCER';
	isOnboardingPassed: boolean | undefined;
	isMock?: never;
}

export interface ILoggedInvestorData extends ILoggedUserWithRole {
	role: 'INVESTOR';
	isMock: boolean;
	isOnboardingPassed?: never;
}

export interface ILoggedAdminData extends ILoggedUserWithRole {
	role: 'ADMIN';
	isMock?: never;
	isOnboardingPassed?: never;
}

export type fetchResponse = IGetLoggedUserResponse | IInvestorData | IFreelancerData;

export type LoggedUserData = ILoggedFreelancerData | ILoggedInvestorData | ILoggedAdminData;