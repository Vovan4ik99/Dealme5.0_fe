import { UserRole } from "@shared/userTypes.ts";
import { FC } from "react";

export interface IOnboardingLayoutProps {
	userType: UserRole;
}

export interface IStepComponentProps {
	onSubmit: () => void;
}

export interface IStepData {
	title: string;
	subtitle: string;
	component: FC<IStepComponentProps> | undefined;
}