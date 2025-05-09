import styles from "./AuthPage.module.scss";

import google_icon from "@icons/auth/google_login.svg";
import facebook_login from "@icons/auth/facebook_login.svg";
import React from "react";

import CustomDivider from "@ui/common/CustomDivider/CustomDivider.tsx";
import LoginForm from "@components/features/auth/LoginForm/LoginForm.tsx";
import FreelancerOnboardingNavbar
	from "@components/layout/navbar/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import RegistrationForm from "@components/features/auth/RegistrationForm/RegistrationForm.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";

interface LoginPageProps {
	isLogin: boolean;
}

const AuthPage: React.FC<LoginPageProps> = ({isLogin}) => {
	return (
		<section className={styles['login-page']}>
			<FreelancerOnboardingNavbar/>
			<div className={styles['login-page__content']}>
				<h1 className={'title'}>{isLogin ? 'Zaloguj się' : 'Załóż konto'}</h1>
				<div className={styles['login-page__social']}>
					<button className={ `btn 
										 btn--tertiary-alternative
										 ${ styles['login-page__btn'] } ` }
							disabled={ true }>
						<img src={google_icon} alt={'google'}/>{''}
						Kontynuuj z Google
					</button>
					<button className={`btn 
										 btn--tertiary-alternative
										 ${ styles['login-page__btn'] } `}
							disabled={ true }>
						<img src={facebook_login} alt={'facebook'}/>{''}
						Kontynuuj z Facebook
					</button>
				</div>
				<CustomDivider/>
				{isLogin ? <LoginForm/> : <RegistrationForm/>}
			</div>
			<Footer isHyphenated={true} isCentered={true}/>
		</section>
	)
}

export default AuthPage;