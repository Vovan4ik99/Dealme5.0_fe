import { useAuthService } from "@services/auth/authService.ts";
import { useForm, useWatch } from "react-hook-form";
import { IOnboardingRegistrationForm } from "./onboardingRegistrationFormTypes.ts";
import styles from './OnboardingRegistrationForm.module.scss';
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import { IRegisterMockInvestorRequest } from "@shared/authTypes.ts";
import CustomCheckbox from "@ui/form/CustomCheckbox/CustomCheckbox.tsx";

const OnboardingRegistrationForm = () => {

	const { registerMockedInvestor } = useAuthService();

	const { handleSubmit, formState: { errors }, register, control, setValue } = useForm<IOnboardingRegistrationForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			privacy: false,
			regulations: false
		}
	});

	const phone = useWatch({ name: 'phone', control });
	const privacy = useWatch({ name: 'privacy', control });
	const regulations = useWatch({ name: 'regulations', control });

	const handleSubmitForm = () => {
		handleSubmit(data => {
			const request: IRegisterMockInvestorRequest = {
				email: data.email,
			};

			if (data.phone?.length === 17) {
				request.phone = data.phone;
			}

			registerMockedInvestor(request)
				.then(() => {
					console.log(request);
					console.log('success');
				})
				.catch(console.error);
		})();
	};

	return (
		<div className={ styles['form'] }>
			<h2 className={ styles['form__title'] }>
				<span>Mamy dla Ciebie specjalistę!</span><br/>
				<span className={ styles['form__title--gray'] }>Załóż konto aby poznać szczegóły</span>
			</h2>
			<div className={ styles['form__inputs'] }>
				<div className={ styles['form__name'] }>
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
				             register={ register }
				             errorMessage={ errors.email?.message }/>
				<CustomInput key={ 'phone' }
				             id={ 'phone' }
				             type={ 'tel' }
				             existedValue={ phone ?? '' }
				             register={ null }
				             onChange={ (phoneNumber: string) => setValue('phone', phoneNumber) }
				             placeholder={ '+48 ___-___-___' }
				             labelText={ 'Numer telefonu (opcjonalnie)' }
				             autoComplete={ 'phone' }/>
			</div>
			<div className={ styles['form__regulations'] }>
				<CustomCheckbox key={ 'privacy' }
				                id={ 'privacy' }
				                isChecked={ privacy }
				                isError={ errors.privacy !== undefined }
				                errorMessage={ errors.privacy?.message }
				                label={
					                <span className={ styles['form__checkbox'] }>
						                Wyrażam zgodę na przetwarzanie{ ' ' }
						                <span className={ styles['form__checkbox--underline'] }>
								                moich danych osobowych
											</span>
					                </span>
				                }
				                register={ register('privacy', {
					                required: 'Aby kontynuować, musisz zaakceptować warunki korzystania z serwisu'
				                }) }/>
				<CustomCheckbox key={ 'regulations' }
				                id={ 'regulations' }
				                isChecked={ regulations }
				                isError={ errors.regulations !== undefined }
				                errorMessage={ errors.regulations?.message }
				                label={
					                <span className={ styles['form__checkbox'] }>
						                Akceptuje{ ' ' }
						                <span className={ styles['form__checkbox--underline'] }>
								                regulamin serwisu
											</span>
					                </span>
				                }
				                register={ register('regulations', {
					                required: 'Aby kontynuować, musisz zaakceptować regulamin serwisu'
				                }) }/>
			</div>
			<button className={ 'btn btn--mt0' }
			        onClick={ handleSubmitForm }>
				Załóż konto
			</button>
		</div>
	);
};

export default OnboardingRegistrationForm;