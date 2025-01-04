import Navbar from "../../components/layout/OnboardingNavbar/Navbar.tsx";
import styles from "./OnboardingPage.module.scss";
import OnboardingSwitcher from "../../components/features/Onboarding/OnboardingSwitcher.tsx";

const OnboardingPage = () => {

	return (
		<section className={styles['onboarding']}>
			<Navbar/>
			<OnboardingSwitcher/>
		</section>
	);
};

export default OnboardingPage;