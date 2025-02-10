import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useCallback, useContext, useState } from "react";
import styles from './LoginForm.module.scss';
import InputError from "../../../ui/InputError/InputError.tsx";
import { ILoginRequest, ILoginResponse } from "@shared/authTypes.ts";
import { useAuthService } from '@services/authService.ts';
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";

const LoginForm = () => {

	const {login, errorMessage, loadingStatus} = useAuthService();
	const {getLoggedUserData} = useContext(AuthContext);

	const [formData, setFormData] = useState<ILoginRequest>({
		email: '',
		password: '',
	});

	const {register, handleSubmit, formState: {errors}} = useForm<ILoginRequest>({
		shouldFocusError: true,
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
			}
		);
		setFormData(request);
	}, [login, loginUser]);

	return (
		<form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
			<CustomInput preset={'email'}
			             errorMessage={errors?.email?.message}
			             register={register}/>
			<CustomInput preset={'password'}
			             register={register}
			             validation={{
				             required: 'Podaj hasło',
			             }}
			             errorMessage={errors?.password?.message}/>
			<div className={styles['login-form__wrapper']}>
				<Link className={styles['login-form__link']} to={'/reset-password'}>Zapomniałeś hasło?</Link>
			</div>

			<button className={'btn'} type="submit" disabled={loadingStatus === 'loading'}>
				{loadingStatus === 'loading' ? 'Ładowanie' : 'Zaloguj się'}
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</form>
	)
}

export default LoginForm;