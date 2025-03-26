import { UserRole } from "@shared/userTypes.ts";
import React from "react";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IInvestorData } from "@shared/investor/common.ts";

export type OnboardingUserData = IFreelancerData | IInvestorData;

export interface IStepComponentProps<T extends OnboardingUserData> {
	onSubmit: () => void;
	userData: T;
}

export interface IOnboardingStep<T extends OnboardingUserData> {
	title: string;
	subtitle: string;
	component: React.ComponentType<IStepComponentProps<T>> | undefined;
}

export interface IOnboardingManagerProps<T extends OnboardingUserData> {
	userRole: UserRole;
	fetchData: () => Promise<T>;
	stepData: IOnboardingStep<T>[];
}


