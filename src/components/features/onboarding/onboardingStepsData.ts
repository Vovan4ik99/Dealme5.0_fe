import { IOnboardingStep } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import ActivityDestinyStep
	from "@components/features/onboarding/components/investor/1_ActivityDestinyStep/ActivityDestinyStep.tsx";
import OrganizationStageStep
	from "@components/features/onboarding/components/investor/2_OrganizationStageStep/OrganizationStageStep.tsx";
import SalesDepartmentStep
	from "@components/features/onboarding/components/investor/3_SalesDepartmentStep/SalesDepartmentStep.tsx";
import { IInvestorData } from "@shared/investor/common.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import GoToMarketStrategyStep
	from "@components/features/onboarding/components/investor/4_GoToMarketStrategyStep/GoToMarketStrategyStep.tsx";
import BusinessTypeStep
	from "@components/features/onboarding/components/investor/5_BusinessTypeStep/BusinessTypeStep.tsx";
import InvestorRoleStep
	from "@components/features/onboarding/components/investor/6_InvestorRoleStep/InvestorRoleStep.tsx";
import EmployeeCountStep
	from "@components/features/onboarding/components/investor/7_EmployeeCountStep/EmployeeCountStep.tsx";
import CompanyDataStep from "@components/features/onboarding/components/investor/8_CompanyDataStep/CompanyDataStep.tsx";

export const INVESTOR_STEPS_DATA: IOnboardingStep<IInvestorData>[] = [
	{
		title: 'Dla jakich celów potrzebujesz aktywności sprzedażowych?',
		subtitle: 'Potrzeby sprzedażowe',
		component: ActivityDestinyStep,
	},
	{
		title: 'Na jakim etapie jest Twoja organizacja?',
		subtitle: 'Potrzeby sprzedażowe',
		component: OrganizationStageStep,
	},
	{
		title: 'Czy posiadasz dział sprzedaży, który będzie korzystał z aplikacji?',
		subtitle: 'Potrzeby sprzedażowe',
		component: SalesDepartmentStep
	},
	{
		title: 'Czy posiadasz strategie “go to market” lub proces sprzedaży?',
		subtitle: 'Potrzeby sprzedażowe',
		component: GoToMarketStrategyStep
	},
	{
		title: 'Jakiego rodzaju biznes prowadzisz?',
		subtitle: 'Biznes / Organizacja',
		component: BusinessTypeStep
	},
	{
		title: 'Za co odpowiadasz w organizacji?',
		subtitle: 'Biznes / Organizacja',
		component: InvestorRoleStep
	},
	{
		title: 'Ile osób pracuje w Twojej organizacji?',
		subtitle: 'Biznes / Organizacja',
		component: EmployeeCountStep
	},
	{
		title: 'Uzupełnij szczegóły',
		subtitle: 'Biznes / Organizacja',
		component: CompanyDataStep
	}
] as const;

export const FREELANCER_STEPS_DATA: IOnboardingStep<IFreelancerData>[] = [];




