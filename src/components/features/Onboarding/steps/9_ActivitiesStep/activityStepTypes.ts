import {IFreelancerActivity} from "@shared/onboardingTypes.ts";

export interface IActivitiesStepProps {
	userActivities: IFreelancerActivity[];
	onNext: () => void;
}