import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useCallback, useContext } from "react";
import styles from './LoginForm.module.scss';
import InputError from "@ui/form/InputError/InputError.tsx";
import { ILoginRequest, ILoginResponse } from "@shared/authTypes.ts";
import { useAuthService } from '@services/auth/authService.ts';
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";

const LoginForm = () => {

	const navigate = useNavigate();
	const { login, errorMessage, loadingStatus } = useAuthService();
	const { getLoggedUserData } = useContext(AuthContext);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<ILoginRequest>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const loginUser = useCallback((token: string) => {
		getLoggedUserData(token)
			.then(loggedUser => {
				if (loggedUser) {
					navigate(loggedUser.role === "FREELANCER" ? "/freelancer/profile" : "/investor/start");
				}
			})
			.catch(error => console.log(error));
		reset();
	}, [ getLoggedUserData, navigate, reset ]);

	const onSubmit = useCallback((request: ILoginRequest) => {
		localStorage.removeItem('token');
		login(request)
			.then((response: ILoginResponse) => {
				localStorage.setItem('token', response.token);
				loginUser(response.token);
			}).catch((error) => {
				console.log(error);
			}
		);
	}, [ login, loginUser ]);

	return (
		<form className={ styles['login-form'] } onSubmit={ handleSubmit(onSubmit) } noValidate={ true }>
			<CustomInput preset={ 'email' }
			             errorMessage={ errors?.email?.message }
			             register={ register }/>
			<CustomInput preset={ 'password' }
			             register={ register }
			             validation={ {
				             required: 'Podaj hasło',
			             } }
			             errorMessage={ errors?.password?.message }/>
			<div className={ styles['login-form__wrapper'] }>
				<Link className={ styles['login-form__link'] } to={ '/reset-password' }>Zapomniałeś hasło?</Link>
			</div>

			<button className={ 'btn' } type="submit" disabled={ loadingStatus === 'loading' }>
				{ loadingStatus === 'loading' ? 'Ładowanie' : 'Zaloguj się' }
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
		</form>
	)
}

export default LoginForm;