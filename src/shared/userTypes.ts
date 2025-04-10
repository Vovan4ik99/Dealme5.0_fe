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

export interface ILoggedAdminData extends ILoggedUserWithRole {
	role: 'ADMIN';
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

export type LoggedUserData = ILoggedFreelancerData | ILoggedInvestorData | ILoggedAdminData;