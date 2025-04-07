import styles from "./InvestorOnboardingNavbar.module.scss";
import Logo from "@ui/common/Logo/Logo.tsx";
import { Link } from "react-router-dom";
import question_icon from '@icons/onboarding/question_icon.svg';

const InvestorOnboardingNavbar = () => {

	return (
		<nav className={ styles['navbar'] }>
			<Logo/>
			<Link to={ "/" } className={ styles['navbar__link'] }>
				<img src={ question_icon } alt={ 'question icon' }/>
				<span>Potrzebujesz pomocy?</span>
			</Link>
		</nav>
	);
};

export default InvestorOnboardingNavbar;