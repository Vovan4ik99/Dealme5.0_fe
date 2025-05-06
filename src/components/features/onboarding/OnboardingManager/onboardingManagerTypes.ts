import React from "react";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import { OnboardingUser } from "@pages/onboarding/OnboardingPage/onboardingPageTypes";

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
	userRole: OnboardingUser;
	fetchData: () => Promise<T>;
	stepData: IOnboardingStep<T>[];
}


