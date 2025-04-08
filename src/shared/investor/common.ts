import { ILoggedUserWithRole } from "@shared/userTypes.ts";

export interface IInvestorData extends ILoggedUserWithRole {
	phone: string;
	company: string;
	isMock: boolean
	activityDestiny: string;
	organizationStage: string;
	salesDepartment: boolean | null;
	companyEmails: string;
	goToMarketStrategy: string;
	businessType: string;
	investorRole: string;
	employeeCountRange: string;
	companySiteUrl: string;
	companyDescription: string;
}