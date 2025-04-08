import InvestorOnboardingNavbar from "@components/layout/navbar/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import styles from "./InvestorStartPage.module.scss";
import InvestorIntentSelector
	from "@components/features/investor-start-service/InvestorIntentSelector/InvestorIntentSelector.tsx";

const InvestorStartPage = () => {

	return (
		<section className={ styles['start'] }>
			<div className={ styles['start__content'] }>
				<InvestorOnboardingNavbar/>
				<div>
					<h1 className={ styles['start__title'] }>
						Czy potrzebujesz pomocy w wyborze usługi?
					</h1>
					<InvestorIntentSelector/>
				</div>
			</div>
			<Footer isCentered={ false } isHyphenated={ false }/>
		</section>
	);
}

export default InvestorStartPage;