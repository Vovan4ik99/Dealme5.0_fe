import FreelancerOnboardingNavbar
	from "@components/layout/OnboardingLayout/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import styles from "./FreelancerOnboardingPage.module.scss";
import OnboardingSwitcher from "../../components/features/Onboarding/OnboardingSwitcher.tsx";

const FreelancerOnboardingPage = () => {

	return (
		<section className={styles['onboarding']}>
			<FreelancerOnboardingNavbar/>
			<OnboardingSwitcher/>
		</section>
	);
};

export default FreelancerOnboardingPage;