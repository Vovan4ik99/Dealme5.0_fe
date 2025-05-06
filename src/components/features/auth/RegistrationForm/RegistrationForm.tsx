import React, {useCallback, useContext, useRef, useState} from "react";
import { RegisterOptions, useForm, useWatch } from "react-hook-form";
import styles from "./RegistrationForm.module.scss";
import { RegistrationFormData } from "./registrationFormTypes.ts";
import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "@services/auth/authService.ts";
import { ICreateUserRequest, UserRole } from "@shared/userTypes.ts";
import { ReactComponent as FreelancerIcon } from "@icons/named_exported/freelancer_registration.svg";
import { ReactComponent as InvestorIcon } from "@icons/named_exported/investor_registration.svg";
import AlertItem from "@ui/common/AlertItem/AlertItem.tsx";
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import SwitchBtn from "@ui/button/SwitchBtn/SwitchBtn.tsx";
import CustomCheckbox from "@ui/form/CustomCheckbox/CustomCheckbox.tsx";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";

const RegistrationForm = () => {

	const navigate = useNavigate();

	const { logout } = useContext(AuthContext);

	const [ currentRole, setCurrentRole ] = useState<UserRole>("FREELANCER");
	const [ isUserCreated, setIsUserCreated ] = useState<boolean>(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleRoleSelect = () => {
		navigate('/investor/start');
	};

	const { createUser, loadingStatus, errorMessage } = useAuthService();

	const { register, handleSubmit, control, reset, formState: { errors } } = useForm<RegistrationFormData>({
		shouldFocusError: false,
		mode: 'onTouched',
	});

	const password = useWatch({ name: 'password', control, defaultValue: '' });

	const termsRegister = register('terms', {
		required: 'Aby kontynuować, musisz zaakceptować warunki korzystania z serwisu'
	});

	const validatePassword: RegisterOptions['validate'] = (value) =>
		value === password || 'Podane hasła nie są zgodne';

	const onSubmit = useCallback((formData: RegistrationFormData) => {
		const createUserData: ICreateUserRequest = { ...formData };

		if(localStorage.getItem('token')){
			logout();
		}

		createUser(createUserData, currentRole)
			.then(() => {
				setIsUserCreated(true);
				reset();
				timeoutRef.current = setTimeout(() => {
					setIsUserCreated(false);
					navigate('/login');
				}, 1000);
			}).catch(console.error);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [ createUser, navigate, reset ]);

	return (
		<form name={ 'registration-form' } className={ styles['registration-form'] }
		      onSubmit={ handleSubmit(onSubmit) } autoComplete={ 'on' } noValidate={ true }>
			<div>
				<p className={ styles['registration-form__text'] }>Wybierz rodzaj konta</p>
				<SwitchBtn onClick={ handleRoleSelect }
				           currentIndex={ currentRole === "FREELANCER" ? 0 : 1 }
				           items={[
							   <>
								   <FreelancerIcon/>
								   <p>Freelancer</p>
							   </>,
							   <>
								   <InvestorIcon/>
								   <p>Inwestor</p>
							   </>
						   ]} />
			</div>
			<div className={ styles['registration-form__item'] }>
				<CustomInput key={ 'firstName' }
				             preset={ 'firstName' }
				             errorMessage={ errors.firstName?.message }
				             register={ register }/>
				<CustomInput key={ 'lastName' }
				             preset={ 'lastName' }
				             errorMessage={ errors.lastName?.message }
				             register={ register }/>
			</div>
			<CustomInput key={ 'email' }
			             preset={ 'email' }
			             errorMessage={ errors.email?.message }
			             register={ register }/>
			<CustomInput key={ 'company' }
			             preset={ 'company' }
			             errorMessage={ errors.company?.message }
			             validation={ {
				             required: !currentRole ? 'Podaj firmę' : false,
			             } }
			             register={ register }/>
			<div className={ styles['registration-form__item'] }>
				<CustomInput key={ 'password' }
				             preset={ 'password' }
				             register={ register }
				             errorMessage={ errors.password?.message }/>
				<CustomInput key={ 'passwordConfirmation' }
				             type={ 'password' }
				             id={ 'passwordConfirmation' }
				             placeholder={ 'Powtórz hasło' }
				             autoComplete={ 'new-password' }
				             register={ register }
				             validation={ {
					             required: 'Potwierdź hasło',
					             validate: validatePassword
				             } }
				             labelText={ 'Powtórz hasło' }
				             errorMessage={ errors.passwordConfirmation?.message }/>
			</div>
			<div className={ styles['registration-form__terms'] }>
				<CustomCheckbox register={ termsRegister }
				                errorMessage={ errors.terms?.message }
				                isError={ errors.terms?.message !== undefined }
				                id={ 'terms' }
				                label={
					                <>
						                Akceptuję{ ' ' }
						                <Link to={ '/terms' }>
							                <span className={ styles['registration-form__terms-underline'] }>
								                regulamin serwisu
											</span>
						                </Link>
					                </>
				                }/>
			</div>
			{ isUserCreated && <AlertItem kind={ 'success' }
                                          text={
				                              'Użytkownik został zarejestrowany. ' +
				                              'Za chwilę przekierujemy Ci na stronę logowania.'
			                              }/> }
			<button className={ 'btn btn--mt0' } type="submit" disabled={ loadingStatus === 'loading' }>
				{ loadingStatus === 'loading' ? 'Ładowanie' : 'Załóż konto' }
			</button>
			{ errorMessage && <AlertItem kind={ 'error' } text={ errorMessage } hasMarginTop={ true }/> }
		</form>
	)
}

export default RegistrationForm;