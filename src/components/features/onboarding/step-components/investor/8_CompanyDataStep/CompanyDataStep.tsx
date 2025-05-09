import React from "react";
import { IStepComponentProps } from "@components/features/onboarding/OnboardingManager/onboardingManagerTypes.ts";
import { IInvestorData } from "@shared/investor/common.ts";
import styles from './CompanyDataStep.module.scss';
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import { useForm, useWatch } from "react-hook-form";
import CustomTextArea from "@ui/form/CustomTextArea/CustomTextArea.tsx";
import { useInvestorOnboardingService } from "@services/onboarding/investorOnboardingService.ts";

const CompanyDataStep: React.FC<IStepComponentProps<IInvestorData>> = ({ userData, onSubmit }) => {

	const { patchCompanyUrl, patchCompanyDescription } = useInvestorOnboardingService();

	const { register, formState: { errors, isValid }, trigger, setValue, control, handleSubmit } = useForm<{
		url: string,
		description: string | undefined
	}>({
		mode: 'onChange',
		shouldFocusError: false,
		defaultValues: {
			url: userData.companySiteUrl,
			description: userData.companyDescription ?? undefined
		}
	});

	const url = useWatch({ name: 'url', control });
	const description = useWatch({ name: 'description', control });

	const patchDescription = (description: string) => {
		patchCompanyDescription(description)
			.then(onSubmit)
			.catch(console.error);
	};

	const handleSubmitForm = () => {
		handleSubmit(data => {
			patchCompanyUrl(data.url)
				.then(() => {
					if (data.description) {
						patchDescription(data.description);
					} else {
						onSubmit();
					}
				})
				.then(onSubmit)
				.catch(console.error);
		})();
	};

	return (
		<div className={ styles['company'] }>
			<div className={ styles['company__content'] }>
				<CustomInput id={ 'url' }
				             type={ 'text' }
				             autoComplete={ 'url' }
				             labelText={ 'Podaj swoją stronę internetową Twojego projektu ' }
				             register={ register }
				             errorMessage={ errors.url?.message }
				             validation={ { required: 'Podaj adres URL swojej strony internetowej' } }
				             placeholder={ 'np. np. dealme.pl' }
				             existedValue={ url }/>
				<CustomTextArea id={ 'description' }
				                register={ register }
				                trigger={ trigger }
				                value={ description }
				                label={ 'Opis działalności (opcjonalne)' }
				                maxSymbols={ 1000 }
				                fontSize={ 18 }
				                fontWeight={ 500 }
				                minHeight={ 150 }
				                onTextChange={ (value: string) => setValue('description', value) }
				                placeholder={ 'Opisz w kilku zdaniach swoją firmę oraz jej unikalną propozycje wartości' }/>
			</div>
			<button className={ `btn 
								 btn--primary 
								 ${ styles['company__btn'] }` }
					disabled={ !isValid }
			        onClick={ handleSubmitForm }>
				Przejdź dalej
			</button>
		</div>
	);
};

export default CompanyDataStep;