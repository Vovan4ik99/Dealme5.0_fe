import { IOnboardingStep } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import ActivityDestinyStep
	from "@components/features/onboarding/components/investor/1_ActivityDestinyStep/ActivityDestinyStep.tsx";
import OrganizationStageStep
	from "@components/features/onboarding/components/investor/2_OrganizationStageStep/OrganizationStageStep.tsx";
import SalesDepartmentStep
	from "@components/features/onboarding/components/investor/3_SalesDepartmentStep/SalesDepartmentStep.tsx";
import { IInvestorData } from "@shared/investor/common.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";

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
		component: undefined
	},
	{
		title: 'Jakiego rodzaju biznes prowadzisz?',
		subtitle: 'Biznes / Organizacja',
		component: undefined
	},
	{
		title: 'Za co odpowiadasz w organizacji?',
		subtitle: 'Biznes / Organizacja',
		component: undefined
	},
	{
		title: 'Ile osób pracuje w Twojej organizacji?',
		subtitle: 'Biznes / Organizacja',
		component: undefined
	},
	{
		title: 'Uzupełnij szczegóły',
		subtitle: 'Biznes / Organizacja',
		component: undefined
	}
] as const;

export const FREELANCER_STEPS_DATA: IOnboardingStep<IFreelancerData>[] = [];




