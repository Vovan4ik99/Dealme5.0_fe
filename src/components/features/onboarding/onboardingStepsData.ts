import { IOnboardingStep } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import ActivityDestinyStep
	from "@components/features/onboarding/step-components/investor/1_ActivityDestinyStep/ActivityDestinyStep.tsx";
import OrganizationStageStep
	from "@components/features/onboarding/step-components/investor/2_OrganizationStageStep/OrganizationStageStep.tsx";
import SalesDepartmentStep
	from "@components/features/onboarding/step-components/investor/3_SalesDepartmentStep/SalesDepartmentStep.tsx";
import { IInvestorData } from "@shared/investor/common.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import GoToMarketStrategyStep
	from "@components/features/onboarding/step-components/investor/4_GoToMarketStrategyStep/GoToMarketStrategyStep.tsx";
import BusinessTypeStep
	from "@components/features/onboarding/step-components/investor/5_BusinessTypeStep/BusinessTypeStep.tsx";
import InvestorRoleStep
	from "@components/features/onboarding/step-components/investor/6_InvestorRoleStep/InvestorRoleStep.tsx";
import EmployeeCountStep
	from "@components/features/onboarding/step-components/investor/7_EmployeeCountStep/EmployeeCountStep.tsx";
import CompanyDataStep
	from "@components/features/onboarding/step-components/investor/8_CompanyDataStep/CompanyDataStep.tsx";
import ExperienceStep
	from "@components/features/onboarding/step-components/freelancer/1_ExperienceStep/ExperienceStep.tsx";
import SpecializationStep
	from "@components/features/onboarding/step-components/freelancer/2_SpecializationStep/SpecializationStep.tsx";
import WorkingDaysStep
	from "@components/features/onboarding/step-components/freelancer/3_WorkingDaysStep/WorkingDaysStep.tsx";
import WorkingHoursStep
	from "@components/features/onboarding/step-components/freelancer/4_WorkingHoursStep/WorkingHoursStep.tsx";
import IncomeGoalStep
	from "@components/features/onboarding/step-components/freelancer/5_IncomeGoalStep/IncomeGoalStep.tsx";
import IndustryStep from "@components/features/onboarding/step-components/freelancer/6_IndustryStep/IndustryStep.tsx";
import TypeOfSalesStep
	from "@components/features/onboarding/step-components/freelancer/7_TypeOfSalesStep/TypeOfSalesStep.tsx";
import SectorStep from "@components/features/onboarding/step-components/freelancer/8_SectoStep/SectorStep.tsx";
import ActivitiesStep
	from "@components/features/onboarding/step-components/freelancer/9_ActivitiesStep/ActivitiesStep.tsx";
import SalesToolsStep
	from "@components/features/onboarding/step-components/freelancer/10_SalesToolsStep/SalesToolsStep.tsx";

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

export const FREELANCER_STEPS_DATA: IOnboardingStep<IFreelancerData>[] = [
	{
		title: 'Jakie jest Twoje doświadczenie w sprzedaży?',
		subtitle: 'Doświadczenie i specjalizacja',
		component: ExperienceStep
	},
	{
		title: 'Jakbyś określił siebie jako sprzedawcę?',
		subtitle: 'Doświadczenie i specjalizacja',
		component: SpecializationStep
	},
	{
		title: 'W jakie dni jesteś dostępny?',
		subtitle: 'Dostępność i zarobki',
		component: WorkingDaysStep
	},
	{
		title: 'Ile godzin w tygodniu jesteś w stanie poświecić na Dealme?',
		subtitle: 'Dostępność i zarobki',
		component: WorkingHoursStep
	},
	{
		title: 'Jakich tygodniowych zarobków oczekujesz od Dealme?',
		subtitle: 'Dostępność i zarobki',
		component: IncomeGoalStep
	},
	{
		title: 'Z produktami/usługami jakiej branży pracowałeś?',
		subtitle: 'Branża i sektor',
		component: IndustryStep
	},
	{
		title: 'Czy oferowałeś swoje produkty firmom czy osobom prywatnym?',
		subtitle: 'Branża i sektor',
		component: TypeOfSalesStep
	},
	{
		title: 'Do jakiego sektora kierowałeś swoje produkty/usługi?',
		subtitle: 'Branża i sektor',
		component: SectorStep
	},
	{
		title: 'Oceń swoje umiejętności',
		subtitle: 'Umiejętności',
		component: ActivitiesStep
	},
	{
		title: 'Z jakich narzędzi sprzedażowych korzystałeś?',
		subtitle: 'Umiejętności',
		component: SalesToolsStep
	},
];




