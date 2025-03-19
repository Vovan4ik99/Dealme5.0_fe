import FreelancerOnboardingNavbar
	from "@components/layout/onboarding/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import styles from "./OnboardingPage.module.scss";
import OnboardingSwitcher from "../../components/features/Onboarding/OnboardingSwitcher.tsx";

const OnboardingPage = () => {

	return (
		<section className={styles['onboarding']}>
			<FreelancerOnboardingNavbar/>
			<OnboardingSwitcher/>
		</section>
	);
};

export default OnboardingPage;