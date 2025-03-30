import React, { useContext } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import styles from "./FreelancerOnboardingStartPage.module.scss";
import { ReactComponent as FreelancerIcon } from '@icons/named_exported/freelancer_registration.svg';
import { useNavigate } from "react-router-dom";
import FreelancerOnboardingNavbar
	from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";

const FreelancerOnboardingStartPage = () => {

	const { user, loadingStatus } = useContext(AuthContext);

	const navigate = useNavigate();

	const onSubmit = () => {
		navigate('/freelancer/onboarding');
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<section className={ styles['start'] }>
			<FreelancerOnboardingNavbar/>
			<div className={ styles['start__content'] }>
				<FreelancerIcon width={ 36 } height={ 40 }/>
				<h1 className={ styles['start__title'] }>
					Cześć, { `${ user?.firstName } ${ user?.lastName }` }
				</h1>
				<p className={ styles['start__text'] }>
					Miło widzieć Cię na pokładzie Dealme. Na początek uzupełnij swój profil niezbędnymi danymi,
					które pomogą dopasować Twoje usługi do inwestorów
				</p>
				<p className={ styles['start__description'] }>
					Będziesz mógł zaktualizować te dane później w profilu użytkownika
				</p>
				<button onClick={ onSubmit }
				        className={ 'btn btn--mw134' }>
					Zaczynajmy
				</button>
			</div>
			<Footer isCentered={ true } isHyphenated={ true }/>
		</section>
	);
}

export default FreelancerOnboardingStartPage;