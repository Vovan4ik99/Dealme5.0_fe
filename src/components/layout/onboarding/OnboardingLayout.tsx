import React from "react";
import { IOnboardingLayoutProps } from "@components/layout/onboarding/onboardingLayoutTypes.ts";
import styles from "./OnboardingLayout.module.scss";
import FreelancerOnboardingNavbar
	from "@components/layout/onboarding/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import InvestorOnboardingNavbar
	from "@components/layout/onboarding/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";

const OnboardingLayout: React.FC<IOnboardingLayoutProps> = ({userType}) => {

	const getOnboardingNavbar = () => {
		if (userType === 'FREELANCER') {
			return <FreelancerOnboardingNavbar/>;
		}
		return <InvestorOnboardingNavbar/>;
	};

	return (
		<section className={ styles['onboarding'] }>
			{getOnboardingNavbar()}
		</section>
	);
};

export default OnboardingLayout;