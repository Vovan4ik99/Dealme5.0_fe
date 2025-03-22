import { IFreelancerData } from "@shared/freelancer/common.ts";

export const getCurrentStepByUserAbsentData = (user: IFreelancerData | null): number => {
	const undefinedNumber = 11;
	if (!user) {
		return undefinedNumber;
	}
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
	return undefinedNumber;
};