import styles from "./AuthPage.module.scss";
import Navbar from "@components/layout/OnboardingNavbar/Navbar.tsx";
import google_icon from "@icons/auth/google_login.svg";
import facebook_login from "@icons/auth/facebook_login.svg";
import React from "react";
import LoginForm from "@components/features/Auth/LoginForm/LoginForm.tsx";
import RegistrationForm from "@components/features/Auth/RegistrationForm/RegistrationForm.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import CustomDivider from "@ui/CustomDivider/CustomDivider.tsx";

interface LoginPageProps {
	isLogin: boolean;
}

const AuthPage: React.FC<LoginPageProps> = ({isLogin}) => {
	return (
		<section className={styles['login-page']}>
			<Navbar/>
			<div className={styles['login-page__content']}>
				<h1 className={'title'}>{isLogin ? 'Zaloguj się' : 'Załóż konto'}</h1>
				<div className={styles['login-page__social']}>
					<button className={`${styles['login-page__social-link']} ${styles['login-page__social-link--disabled']}`}>
						<img src={google_icon} alt={'google'}/>{''}
						Kontynuuj z Google
					</button>
					<button className={`${styles['login-page__social-link']} ${styles['login-page__social-link--disabled']}`}>
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