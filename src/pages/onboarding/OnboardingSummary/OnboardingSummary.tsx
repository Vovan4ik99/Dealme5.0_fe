import styles from "./OnboardingSummary.module.scss";
import InvestorOnboardingNavbar from "@components/layout/navbar/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import OnboardingRegistrationForm
	from "@components/features/onboarding/OnboardingRegistrationForm/OnboardingRegistrationForm.tsx";
import { useAuthService } from "@services/auth/authService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

const OnboardingSummary = () => {

	const { loadingStatus } = useAuthService();

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<section className={ styles['summary'] }>
			<div>
				<InvestorOnboardingNavbar/>
				<h1 className={ styles['summary__title'] }>
					<span className={ styles['summary__title--gray'] }>Dziękujemy za poświęcony czas.</span><br/>
					<span>Oto podsumowanie Twoich potrzeb.</span>
				</h1>
				<OnboardingRegistrationForm/>
			</div>
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	);
};

export default OnboardingSummary;