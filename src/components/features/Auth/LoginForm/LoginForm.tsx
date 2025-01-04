import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useCallback, useContext, useState} from "react";
import styles from './LoginForm.module.scss';
import InputError from "../../../ui/InputError/InputError.tsx";
import {ILoginRequest, ILoginResponse} from "@shared/loginTypes.ts";
import {useAuthService} from '@services/authService.ts';
import {AuthContext} from "@context/AuthContext/AuthContext.ts";

const LoginForm = () => {

	const {login, errorMessage, loadingStatus} = useAuthService();
	const {getLoggedUserData} = useContext(AuthContext);

	const [formData, setFormData] = useState<ILoginRequest>({
		email: '',
		password: '',
	});

	const {register, handleSubmit, formState: {errors}} = useForm<ILoginRequest>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: formData,
	});

	const loginUser = useCallback((token: string) => {
		getLoggedUserData(token);
		setFormData({
			email: '',
			password: '',
		});
	}, [getLoggedUserData]);

	const onSubmit = useCallback((request: ILoginRequest) => {
		login(request)
			.then((response: ILoginResponse) => {
				localStorage.setItem('token', response.token);
				loginUser(response.token);
			}).catch((error) => {
				console.log(error);
				setFormData(request);
			});
		setFormData(request);
	}, [login, loginUser]);

	return (
		<form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
			<div className={'form-item'}>
				<input
					className={`form-item__input ${errors.email ? 'form-item__input--error' : ''}`}
					id="email"
					type="email"
					placeholder={'example@email.com'}
					autoComplete={'email'}
					{...register('email', {
						required: 'Podaj email',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Podaj poprawny adres email',
						},
					})}
				/>
				{errors.email?.message && <InputError text={errors.email.message}/>}
				<label className={'form-item__label'} htmlFor="email">E-mail</label>
			</div>
			<div className={'form-item'}>
				<input
					className={`form-item__input ${errors.password ? 'form-item__input--error' : ''}`}
					id="password"
					type="password"
					placeholder={'Wpisz hasło'}
					autoComplete={'current-password'}
					{...register('password', {
						required: 'Podaj hasło',
					})}
				/>
				{errors.password?.message && <InputError text={errors.password.message}/>}
				<label className={'form-item__label'} htmlFor="password">Hasło</label>
			</div>
			<div className={styles['login-form__link-wrapper']}>
				<Link className={styles['login-form__link']} to={'/'}>Zapomniałeś hasło?</Link>
			</div>

			<button className={'btn'} type="submit" disabled={loadingStatus === 'loading'}>
				{loadingStatus === 'loading' ? 'Ładowanie' : 'Zaloguj się'}
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</form>
	)
}

export default LoginForm;