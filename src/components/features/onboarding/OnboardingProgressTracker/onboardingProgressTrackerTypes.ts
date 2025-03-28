import { UserRole } from "@shared/userTypes.ts";
import {
	CategoryStatus
} from "@components/features/onboarding/OnboardingProgressCategory/onboardingProgressCategoryTypes.ts";

export interface IOnboardingProgressTrackerCategory {
	category: string;
	subcategories: string[];
}

export interface IOnboardingProgressTrackerProps {
	step: number;
	maxSteps: number;
	userType: UserRole;
}

export interface ICategoryWithStatus {
	category: string;
	subcategories: { name: string; status: CategoryStatus }[];
	status: CategoryStatus;
}