import { IFreelancerActivity } from "@shared/onboarding/freelancerOnboardingTypes.ts";

export interface IActivitiesStepProps {
	userActivities: IFreelancerActivity[];
	onNext: () => void;
}