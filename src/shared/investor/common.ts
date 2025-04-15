import { ILoggedUserWithRole } from "@shared/userTypes.ts";
import {
	IInvestorPipelineSupportStageResponse, IProductResponse
} from "@shared/start-service/investorStartServiceTypes.ts";

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
	products: IProductResponse[];
	pipelineSupportStage: IInvestorPipelineSupportStageResponse;
}
