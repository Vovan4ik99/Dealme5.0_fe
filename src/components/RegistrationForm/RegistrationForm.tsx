import InputError from "../InputError/InputError.tsx";
import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import styles from "./RegistrationForm.module.scss";
import {CreateUserData, RegistrationFormData, UserRole} from "./registrationFormTypes.ts";
import freelancer_active from '../../assets/icons/freelancer_registration_active.svg';
import freelancer_icon from '../../assets/icons/freelancer_registration.svg';
import investor_active from '../../assets/icons/investor_registration_active.svg';
import investor_icon from '../../assets/icons/investor_registration.svg';
import {Link, useNavigate} from "react-router-dom";
import checkbox_checked from '../../assets/icons/checkbox_checked.svg';
import {useAuthService} from "../../services/authService.ts";
import SuccessInfo from "../SuccessInfo/SuccessInfo.tsx";

const RegistrationForm = () => {
	
	const navigate = useNavigate();
	
	const [isFreelancer, setIsFreelancer] = useState<boolean>(true);
	const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsFreelancer((prev) => !prev);
	};

	const {createUser, loadingStatus, errorMessage} = useAuthService();

	const {register, handleSubmit, watch, formState: {errors}} = useForm<RegistrationFormData>({
		shouldFocusError: false,
		mode: 'onTouched'
	});

	const password = watch('password', '');

	const onSubmit = useCallback((formData: RegistrationFormData) => {
		const role: UserRole = isFreelancer ? 'FREELANCER' : 'INVESTOR';
		const createUserData: CreateUserData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			company: formData.company,
			email: formData.email,
			password: formData.password,
		};
		createUser(createUserData, role)
			.then(() => {
				setIsUserCreated(true);
				const timeout = setTimeout(() => {
					setIsUserCreated(false);
					navigate('/login');
				}, 3000);
				return () => clearTimeout(timeout);
			}).catch((error) => {
				console.log(error);
			});
	}, [createUser, isFreelancer, navigate]);
	
	return (
		<form name={'registration-form'} className={styles['registration-form']}
		      onSubmit={handleSubmit(onSubmit)} autoComplete={'on'} noValidate={true}>
			<div>
				<p className={styles['registration-form__text']}>Wybierz rodzaj konta</p>
				<button className={styles['registration-form__switcher']} onClick={(e) => handleToggle(e)}>
					<div
						className={`${styles['registration-form__slider']} ${!isFreelancer ? styles['registration-form__slider--right'] : ''}`}></div>
					<span
						className={`${styles['registration-form__option']} ${isFreelancer ? styles['registration-form__option--active'] : ''}`}>
						<img src={isFreelancer ? freelancer_active : freelancer_icon} alt={'freelancer'}/>
						<p>Freelancer</p>
					</span>
					<span
						className={`${styles['registration-form__option']} ${!isFreelancer ? styles['registration-form__option--active'] : ''}`}>
						<img src={!isFreelancer ? investor_active : investor_icon} alt={'investor'}/>
						<p>Inwestor</p>
					</span>
				</button>
			</div>
			<div className={styles['registration-form__item']}>
				<div className={`${styles['registration-form__input']} form-item`}>
					<input
						className={`form-item__input ${errors.firstName ? 'form-item__input--error' : ''}`}
						id="firstName"
						type="text"
						placeholder={'np. Jan'}
						autoComplete={'given-name'}
						{...register('firstName', {
							required: 'Podaj imię',
							pattern: {
								value: /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*$/,
								message: "Imię powinno zaczynać się wielką literą i zawierać tylko litery"
							},
							min: {
								value: 2,
								message: 'Długość od 2 do 30 znaków',
							},
							max: {
								value: 30,
								message: 'Długość od 2 do 30 znaków',
							}
						})}
					/>
					{errors.firstName?.message && <InputError text={errors.firstName.message}/>}
					<label className={'form-item__label'} htmlFor="firstName">Imię</label>
				</div>
				<div className={`${styles['registration-form__input']} form-item`}>
					<input
						className={`form-item__input ${errors.lastName ? 'form-item__input--error' : ''}`}
						id="lastName"
						type="text"
						placeholder={'np. Kowalski'}
						autoComplete={'family-name'}
						{...register('lastName', {
							required: 'Podaj nazwisko',
							pattern: {
								value: /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*(?:-[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*)?$/,
								message: 'Nazwisko powinno zaczynać się wielką literą i może zawierać tylko litery' +
									' oraz jeden łącznik',
							},
							min: {
								value: 2,
								message: 'Długość od 2 do 50 znaków'
							},
							max: {
								value: 50,
								message: 'Długość od 2 do 50 znaków'
							}
						})}
					/>
					{errors.lastName?.message && <InputError text={errors.lastName.message}/>}
					<label className={'form-item__label'} htmlFor="lastName">Nazwisko</label>
				</div>
			</div>
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
					className={`form-item__input ${errors.company ? 'form-item__input--error' : ''}`}
					id="company"
					type="text"
					placeholder={'np. Dealme'}
					autoComplete={'organization'}
					{...register('company', {
						required: !isFreelancer ? 'Podaj firmę' : false,
					})}
				/>
				{errors.company?.message && <InputError text={errors.company.message}/>}
				<label className={'form-item__label'} htmlFor="company">Nazwa firmy</label>
			</div>
			<div className={styles['registration-form__item']}>
				<div className={`${styles['registration-form__input']} form-item`}>
					<input
						className={`form-item__input ${errors.password ? 'form-item__input--error' : ''}`}
						id="password"
						type="password"
						placeholder={'Wpisz hasło'}
						autoComplete={'new-password'}
						{...register('password', {
							required: 'Podaj hasło',
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
								message: "Hasło musi zawierać minimum jedną wielką literę, jedną małą literę, jedną" +
									" cyfrę oraz jeden znak specjalny (@$!%*?&)"
							},
							min: {
								value: 8,
								message: 'Hasło musi zawierać minimum 8 znaków',
							},
						})}
					/>
					{errors.password?.message && <InputError text={errors.password.message}/>}
					<label className={'form-item__label'} htmlFor="password">Hasło</label>
				</div>
				<div className={`${styles['registration-form__input']} form-item`}>
					<input
						className={`form-item__input ${errors.passwordConfirmation ? 'form-item__input--error' : ''}`}
						id="passwordConfirmation"
						type="password"
						placeholder={'Wpisz hasło'}
						autoComplete={'new-password'}
						{...register('passwordConfirmation', {
							required: 'Potwierdź hasło',
							validate: (value) => value === password || 'Podane hasła nie są zgodne'
						})}
					/>
					{errors.passwordConfirmation?.message && <InputError text={errors.passwordConfirmation.message}/>}
					<label className={'form-item__label'} htmlFor="passwordConfirmation">Powtórz hasło</label>
				</div>
			</div>
			<div className={styles['registration-form__terms']}>
				<div className={styles['registration-form__terms-wrapper']}>
					<input
						id={'terms'}
						className={`${styles['registration-form__terms-checkbox']} ${errors.terms ? 'form-item__input--error' : ''}`}
						type="checkbox"
						{...register('terms', {required: 'Aby kontynuować, musisz zaakceptować warunki korzystania z serwisu'})}
					/>
					<span
						className={`${styles['registration-form__terms-checkbox--custom']} ${errors.terms ? 'form-item__input--error' : ''}`}>
						<img src={checkbox_checked} alt={'checkbox checked'}/>
					</span>
					<label htmlFor={'terms'} className={styles['registration-form__terms-label']}>
						Akceptuję <Link to={'/terms'}><span>regulamin serwisu</span></Link>
					</label>
				</div>
				{errors.terms?.message && <InputError text={errors.terms.message}/>}
			</div>
			<SuccessInfo isOpen={isUserCreated}
			             text={'Użytkownik został zarejestrowany. Za chwilę przekierujemy Ci na stronę logowania.'}/>
			<button className={'btn'} type="submit" disabled={loadingStatus === 'loading'}>
				{loadingStatus === 'loading' ? 'Ładowanie' : 'Załóż konto'}
			</button>
			{errorMessage && <InputError text={errorMessage}/>}
		</form>
	)
}

export default RegistrationForm;