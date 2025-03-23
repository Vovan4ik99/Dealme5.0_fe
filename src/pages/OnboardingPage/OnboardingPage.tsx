import styles from "./OnboardingPage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";

const OnboardingPage = () => {


	return (
		<section className={ styles['onboarding'] }>
			<div></div>
			<Footer isCentered={false} isHyphenated={false}/>
		</section>
	);
}