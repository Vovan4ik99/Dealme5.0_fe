import FreelancerOnboardingNavbar
	from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import styles from "./FreelancerOnboardingPage.module.scss";
import OnboardingSwitcher from "@components/features/freelancer-onboarding/OnboardingSwitcher.tsx";

const FreelancerOnboardingPage = () => {

	return (
		<section className={styles['onboarding']}>
			<FreelancerOnboardingNavbar/>
			<OnboardingSwitcher/>
		</section>
	);
};

export default FreelancerOnboardingPage;