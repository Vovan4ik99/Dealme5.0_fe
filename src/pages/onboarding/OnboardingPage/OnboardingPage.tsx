import styles from "./OnboardingPage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import { IOnboardingPageProps } from "@pages/onboarding/OnboardingPage/onboardingPageTypes.ts";
import FreelancerOnboardingNavbar
	from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import InvestorOnboardingNavbar from "@components/layout/navbar/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import OnboardingManager from "@components/features/onboarding/OnboardingManager/OnboardingManager.tsx";
import { IInvestorData } from "@shared/investor/common.ts";
import { INVESTOR_STEPS_DATA } from "@components/features/onboarding/onboardingStepsData.ts";
import { useAuthService } from "@services/auth/authService.ts";

const OnboardingPage: React.FC<IOnboardingPageProps> = ({ userRole }) => {

	const getNavbar = () => {
		if (userRole === 'FREELANCER') {
			return <FreelancerOnboardingNavbar/>;
		}
		return <InvestorOnboardingNavbar/>;
	};

	return (
		<section className={ styles['onboarding'] }>
			<div className={ styles['onboarding__content'] }>
				{ getNavbar() }
				<OnboardingManager<IInvestorData> userRole={ userRole }
				                                  stepData={ INVESTOR_STEPS_DATA }
				                                  fetchData={ useAuthService().fetchInvestorData }/>
			</div>
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	);
}

export default OnboardingPage;