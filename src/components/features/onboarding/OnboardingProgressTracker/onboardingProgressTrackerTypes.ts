import {
	CategoryStatus
} from "@components/features/onboarding/OnboardingProgressCategory/onboardingProgressCategoryTypes.ts";
import {OnboardingUser} from "@pages/onboarding/OnboardingPage/onboardingPageTypes.ts";

export interface IOnboardingProgressTrackerCategory {
	category: string;
	subcategories: string[];
}

export interface IOnboardingProgressTrackerProps {
	step: number;
	maxSteps: number;
	userType: OnboardingUser;
}

export interface ICategoryWithStatus {
	category: string;
	subcategories: { name: string; status: CategoryStatus }[];
	status: CategoryStatus;
}