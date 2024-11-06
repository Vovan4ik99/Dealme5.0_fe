import google_icon from '../../assets/icons/google_login.svg'
import facebook_icon from '../../assets/icons/facebook_login.svg'
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {LoginData} from "./types.ts";
import React, {useCallback, useContext} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.ts";
import Navbar from "../Navbar/Navbar.tsx";
import styles from './LoginPage.module.scss';
import InputError from "../ErrorField/InputError.tsx";

const LoginPage = () => {

	const {login, errorMessage, loadingStatus} = useContext(AuthContext);
	const {register, handleSubmit, formState: {errors}} = useForm<LoginData>({shouldFocusError: false, mode: 'onChange'});

	const onSubmit = useCallback((data: LoginData) => {
		login(data);
	}, [login]);

	console.log('rendering component');

	return (
		<section className={styles['login-page']}>
			<Navbar/>
			<div className={styles['login-page__content']}>
				<h1 className={'title'}>Zaloguj się</h1>
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
				<form className={styles['login-page__form']} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
					<div className={styles['login-page__form-group']}>
						<input
							className={`${styles['login-page__input']} ${errors.email ? styles['login-page__input--error'] : ''}`}
							id="email"
							type="email"
							placeholder={'example@email.com'}
							autoComplete={'on'}
							{...register('email', {
								required: 'Podaj email',
								pattern: {
									value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
									message: 'Podaj poprawny adres email',
								},
							})}
						/>
						{errors.email?.message && <InputError text={errors.email.message}/>}
						<label className={styles['login-page__label']} htmlFor="email">E-mail</label>
					</div>
					<div className={styles['login-page__form-group']}>
						<input
							className={`${styles['login-page__input']} ${errors.password ? styles['login-page__input--error'] : ''}`}
							id="password"
							type="password"
							placeholder={'Wpisz hasło'}
							autoComplete={'on'}
							{...register('password', {
								required: 'Podaj hasło',
							})}
						/>
						{errors.password?.message && <InputError text={errors.password.message}/>}
						<label className={styles['login-page__label']} htmlFor="password">Hasło</label>
					</div>
					<div className={styles['login-page__link-wrapper']}>
						<Link className={styles['login-page__link']} to={'/'}>Zapomniałeś hasło?</Link>
					</div>

					<button className={styles['login-page__btn']} type="submit" disabled={loadingStatus === 'loading'}>
						{loadingStatus === 'loading' ? 'Ładowanie' : 'Zaloguj się'}
					</button>
					{errorMessage && <InputError text={errorMessage} />}
				</form>
			</div>
			<div className={styles['login-page__footer']}>
				<p>2024 © Copyright Dealme. Wszelkie prawa zastrzeżone.</p>
				<p>Design by: <span>Poprotsky - premium design for your digital products</span></p>
			</div>
		</section>
	)
}

export default LoginPage;