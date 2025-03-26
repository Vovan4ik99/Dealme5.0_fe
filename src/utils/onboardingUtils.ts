import { IFreelancerData } from "@shared/freelancer/common.ts";
import { OnboardingUserData } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import { UserRole } from "@shared/userTypes.ts";

export const getUserCurrentStep = (userData: OnboardingUserData, role: UserRole) => {

	const getCurrentStepForFreelancer = (userData: IFreelancerData) => {
		return 0;
	};

	const getCurrentStepForInvestor = (userData: IInvestorData) => {
		if (!userData.activityDestiny) {
			return 0;
		}
		if (!userData.organizationStage) {
			return 1;
		}
		if (userData.salesDepartment === null) {
			return 2;
		}
		return 3;
	}

	if (role === 'FREELANCER') {
		return getCurrentStepForFreelancer(userData as IFreelancerData);
	}
	return getCurrentStepForInvestor(userData as IInvestorData);
};

export const getCurrentStepByUserAbsentData = (user: IFreelancerData): number => {
	if (user.experienceLevel === null) {
		return 0;
	}
	if (user.specialization === null) {
		return 2;
	}
	if (user.workingDays.length === 0) {
		return 3;
	}
	if (user.workingHours === null) {
		return 4;
	}
	if (user.incomeGoal === null) {
		return 5;
	}
	if (user.subIndustries.length === 0) {
		return 6;
	}
	if (user.typeOfSales === null) {
		return 7;
	}
	if (user.sectors.length === 0) {
		return 8;
	}
	if (user.selectedActivities.length === 0) {
		return 9;
	}
	if (user.salesTools.length === 0) {
		return 10;
	}
	return 11;
};