import styles from "./LoginPage.module.scss";
import Navbar from "../../components/Navbar/Navbar.tsx";
import google_icon from "../../assets/icons/google_login.svg";
import facebook_icon from "../../assets/icons/facebook_login.svg";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm.tsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.tsx";

interface LoginPageProps {
	isLogin: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({isLogin}) => {
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
			<div className={styles['login-page__footer']}>
				<p>2024 © Copyright Dealme. Wszelkie prawa zastrzeżone.</p>
				<p>Design by: <span>Poprotsky - premium design for your digital products</span></p>
			</div>
		</section>
	)
}

export default LoginPage;