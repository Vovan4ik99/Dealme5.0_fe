import styles from "./OnboardingPage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import { IOnboardingPageProps } from "@pages/onboarding/OnboardingPage/onboardingPageTypes.ts";
import FreelancerOnboardingNavbar
	from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import InvestorOnboardingNavbar from "@components/layout/navbar/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import OnboardingManager from "@components/features/onboarding/OnboardingManager/OnboardingManager.tsx";
import { IInvestorData } from "@shared/investor/common.ts";
import { FREELANCER_STEPS_DATA, INVESTOR_STEPS_DATA } from "@components/features/onboarding/onboardingStepsData.ts";
import { useAuthService } from "@services/auth/authService.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";

const OnboardingPage: React.FC<IOnboardingPageProps> = ({ userRole }) => {

	const { fetchFreelancerData, fetchInvestorData } = useAuthService();

	const getNavbar = () => {
		if (userRole === 'FREELANCER') {
			return <FreelancerOnboardingNavbar/>;
		}
		return <InvestorOnboardingNavbar/>;
	};

	const getOnboardingManagerByUserRole = () => {
		if (userRole === 'FREELANCER') {
			return <OnboardingManager<IFreelancerData> userRole={ userRole }
			                                           fetchData={ fetchFreelancerData }
			                                           stepData={ FREELANCER_STEPS_DATA }/>
		}
		return <OnboardingManager<IInvestorData> userRole={ userRole }
		                                        fetchData={ fetchInvestorData }
		                                        stepData={ INVESTOR_STEPS_DATA }/>;
	}

	return (
		<section className={ styles['onboarding'] }>
			<div className={ styles['onboarding__content'] }>
				{ getNavbar() }
				{ getOnboardingManagerByUserRole() }
			</div>
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	);
}

export default OnboardingPage;