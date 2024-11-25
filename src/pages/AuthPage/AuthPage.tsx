import styles from "./AuthPage.module.scss";
import Navbar from "../../components/layout/Navbar/Navbar.tsx";
import google_icon from "@icons/google_login.svg";
import facebook_icon from "@icons/facebook_login.svg";
import React from "react";
import LoginForm from "../../components/features/Auth/LoginForm/LoginForm.tsx";
import RegistrationForm from "../../components/features/Auth/RegistrationForm/RegistrationForm.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";

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
					<button className={styles['login-page__social-link']}>
						<img src={google_icon} alt={'google icon'}/>Kontynuuj z Google
					</button>
					<button className={styles['login-page__social-link']}>
						<img src={facebook_icon} alt={'facebook icon'}/>Kontynuuj z Facebook
					</button>
				</div>
				<div className={styles['login-page__divider']}>
					<span className={styles['login-page__divider-text']}>lub</span>
				</div>
				{isLogin ? <LoginForm/> : <RegistrationForm/>}
			</div>
			<Footer isHyphenated={true} isCentered={true}/>
		</section>
	)
}

export default AuthPage;