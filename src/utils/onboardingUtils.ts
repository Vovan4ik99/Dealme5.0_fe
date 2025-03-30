import { IFreelancerData } from "@shared/freelancer/common.ts";
import { OnboardingUserData } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import { UserRole } from "@shared/userTypes.ts";
import pipedrive from "@icons/sales_tools/pipedrive.svg";
import salesforce from "@icons/sales_tools/salesforce.svg";
import hubspot from "@icons/sales_tools/hubspot.svg";
import zoho from "@icons/sales_tools/zoho.svg";
import msc_dynamics_365 from "@icons/sales_tools/msc_dynamics_365.svg";
import copper from "@icons/sales_tools/copper.svg";
import livespace from "@icons/sales_tools/livespace.svg";
import monday from "@icons/sales_tools/monday.svg";

export const getUserCurrentStep = (userData: OnboardingUserData, role: UserRole) => {

	const getCurrentStepForFreelancer = (userData: IFreelancerData) => {
		if (!userData.experienceLevel) {
			return 0;
		}
		if (!userData.specialization) {
			return 1;
		}
		if (userData.workingDays.length === 0) {
			return 2;
		}
		if (!userData.workingHours) {
			return 3;
		}
		if (!userData.incomeGoal) {
			return 4;
		}
		if(userData.subIndustries.length === 0) {
			return 5;
		}
		if (!userData.typeOfSales) {
			return 6;
		}
		if (userData.sectors.length === 0) {
			return 7;
		}
		if (userData.selectedActivities.length === 0) {
			return 8;
		}
		if (userData.salesTools.length === 0) {
			return 9;
		}
		return 10;
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
		if (!userData.goToMarketStrategy) {
			return 3;
		}
		if (!userData.businessType) {
			return 4;
		}
		if (!userData.investorRole) {
			return 5;
		}
		if (!userData.employeeCountRange) {
			return 6;
		}
		if (!userData.companySiteUrl) {
			return 7;
		}
		return 8;
	};

	if (role === 'FREELANCER') {
		return getCurrentStepForFreelancer(userData as IFreelancerData);
	}
	return getCurrentStepForInvestor(userData as IInvestorData);
};

export const getToolKindNameByKind = (kind: string) => {
	switch (kind) {
		case 'COLD_MAILING':
			return 'Cold mailing';
		case 'PROSPECTING':
			return 'Prospecting';
		case 'AUTOMATYZACJA_MARKETINGU':
			return 'Automatyzacja marketingu';
		case 'COLD_CALLING':
			return 'Cold calling';
		case 'ANALITYKA':
			return 'Analityka';
		case 'ZARZADZANIE_PROJEKTAMI':
			return 'Zarządzanie projektami / zadaniami';
		case 'NEWSLETTER':
			return 'Newsletter';
		case 'INNE':
			return 'Inne narzędzia wspierające sprzedaż';
		default:
			return kind;
	}
};

const salesToolsPictures: Record<string, string> = {
	Pipedrive: pipedrive,
	Salesforce: salesforce,
	HubSpot: hubspot,
	Zoho: zoho,
	"MSC Dynamics 365": msc_dynamics_365,
	Copper: copper,
	Livespace: livespace,
	Monday: monday,
};

export const getPictureForSalesTools = (toolName: string): string => {
	return salesToolsPictures[toolName] || '';
};

//To Remove
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