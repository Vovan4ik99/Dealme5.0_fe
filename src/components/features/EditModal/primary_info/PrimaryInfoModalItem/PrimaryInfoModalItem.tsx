import React, { useEffect, useState } from "react";
import { IPrimaryInfoEditFormData, IPrimaryInfoModalItemProps } from "./primaryInfoModalItemTypes.ts";
import { ReactComponent as FreelancerIcon } from "@icons/named_exported/freelancer_registration.svg";
import styles from "./PrimaryInfoModalItem.module.scss";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import { useForm, useWatch } from "react-hook-form";
import SelectFormInput from "@ui/SelectFormInput/SelectFormInput.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { IIncomeGoal, ISpecialization } from "@shared/onboardingTypes.ts";
import { EXPERIENCE_LEVELS, ExperienceLevelKey } from "@constants/experienceLevel.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import InputError from "@ui/InputError/InputError.tsx";

const PrimaryInfoModalItem: React.FC<IPrimaryInfoModalItemProps> = ({
	                                                                    onSave,
	                                                                    registerOnSave,
	                                                                    freelancerId,
	                                                                    firstName,
	                                                                    lastName,
	                                                                    specialization,
	                                                                    experience,
	                                                                    company,
	                                                                    incomeGoal
                                                                    }) => {
	const {
		getSpecializations,
		getIncomeGoals,
		patchSpecialization,
		patchIncomeGoal,
		patchExperienceLevel
	} = useFreelancerOnboardingService();
	const { patchFreelancerName, patchFreelancerCompany } = useFreelancerProfileAsideInfoService();

	const [ specializations, setSpecializations ] = useState<ISpecialization[]>([]);
	const [ incomeGoals, setIncomeGoals ] = useState<IIncomeGoal[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		trigger
	} = useForm<IPrimaryInfoEditFormData>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: { firstName, lastName, company, specialization, experience, incomeGoal },
	});

	const currentSpecialization = useWatch({ name: 'specialization', control });
	const currentExperience = useWatch({ name: 'experience', control });
	const currentIncomeGoal = useWatch({ name: 'incomeGoal', control });

	useEffect(() => {
		registerOnSave!(handleSave);
	});

	useEffect(() => {
		getSpecializations()
			.then(response => setSpecializations(response))
			.catch(error => console.error('Failed to fetch specializations:', error));
	}, [ getSpecializations ]);

	useEffect(() => {
		getIncomeGoals()
			.then(response => setIncomeGoals(response))
			.catch(error => console.error('Failed to fetch income goals:', error));
	}, [ getIncomeGoals ]);

	const getSpecializationSelectItems = () => {
		return specializations.map(specialization => {
			return {
				text: specialization.name,
				info: specialization.description
			}
		});
	};

	const getExperienceLevelSelectItems = () => {
		return Object.entries(EXPERIENCE_LEVELS).map(([ , value ]) => {
			return {
				text: value.title,
				info: value.info
			}
		})
	};

	const getUserIncomeGoal = () => {
		for (const incomeGoalItem of incomeGoals) {
			if (incomeGoalItem.incomeGoal == currentIncomeGoal) {
				return incomeGoalItem;
			}
		}
		return { range: '', description: '', incomeGoal: '' };
	};

	const getIncomeGoalSelectItems = () => {
		return incomeGoals.map(incomeGoal => {
			return {
				text: incomeGoal.range,
				info: incomeGoal.description
			}
		});
	};

	const chooseSpecialization = (specialization: string) => {
		setValue('specialization', specialization);
	};

	const chooseExperience = (experienceTitle: string) => {
		for (const key in EXPERIENCE_LEVELS) {
			if (EXPERIENCE_LEVELS[key as ExperienceLevelKey].title === experienceTitle) {
				setValue('experience', key as ExperienceLevelKey);
				return;
			}
		}
	};

	const chooseIncomeGoal = (incomeGoalRange: string) => {
		for (const key in incomeGoals) {
			if (incomeGoals[key].range === incomeGoalRange.split(' / ')[0]) {
				setValue('incomeGoal', incomeGoals[key].incomeGoal);
				return;
			}
		}
	};

	const getSpecializationId = (specializationName: string) => {
		for (const key of specializations) {
			if (key.name === specializationName) {
				return key.id;
			}
		}
		return -1;
	};

	const onSubmit = async (formData: IPrimaryInfoEditFormData) => {
		try {
			await patchSpecialization(freelancerId, getSpecializationId(formData.specialization));
			await patchFreelancerName({ ...formData });
			await patchFreelancerCompany(formData.company);
			await patchExperienceLevel(formData.experience);
			await patchIncomeGoal(formData.incomeGoal);
		} catch (error) {
			console.error('Failed to update:', error);
		}
	};

	const handleSave = async () => {
		await handleSubmit(onSubmit)();
		onSave();
	};

	return (
		<form className={ styles['item'] } noValidate={ true }>
			<div className={ styles['item__role'] }>
				<FreelancerIcon width={ 16.2 } height={ 18 }/>
				<div className={ styles['item__role-wrapper'] }>
					<span>Rodzaj konta</span>{ '' }
					Freelancer
				</div>
			</div>
			<div className={ styles['item__wrapper'] }>
				<div className={ styles['item__wrapper'] }>
					<CustomInput key={ 'firstName' }
					             preset={ 'firstName' }
					             errorMessage={ errors.firstName?.message }
					             register={ register }/>
					<CustomInput key={ 'lastName' }
					             preset={ 'lastName' }
					             errorMessage={ errors.lastName?.message }
					             register={ register }/>
				</div>
			</div>
			<div>
				<SelectFormInput key={ 'specialization' }
				                 labelText={ 'Specjalizacja handlowa' }
				                 text={ currentSpecialization }
				                 selectItems={ getSpecializationSelectItems() }
				                 id={ 'specialization' }
				                 error={ errors.specialization ?? null }
				                 register={ register }
				                 trigger={ trigger }
				                 validationRules={ {
					                 required: 'Wybierz specjalizacje'
				                 } }
				                 onValueChange={ chooseSpecialization }/>
				{ errors.specialization?.message && <InputError text={ errors.specialization.message }/> }
			</div>
			<CustomInput key={ 'company' }
			             preset={ 'company' }
			             register={ register }
			             errorMessage={ errors.company?.message }/>
			<div>
				<SelectFormInput key={ 'Experience' }
				                 id={ 'experience' }
				                 register={ register }
				                 trigger={ trigger }
				                 error={ errors.experience ?? null }
				                 onValueChange={ chooseExperience }
				                 validationRules={ {
					                 required: 'Wybierz doświadczenie w sprzedaży'
				                 } }
				                 labelText={ 'Doświadczenie w sprzedaży' }
				                 text={ EXPERIENCE_LEVELS[currentExperience].title }
				                 selectItems={ getExperienceLevelSelectItems() }
				                 additionalText={ EXPERIENCE_LEVELS[currentExperience].info }/>
				{ errors.specialization?.message && <InputError text={ errors.specialization.message }/> }
			</div>
			<div>
				<SelectFormInput key={ 'incomeGoal' }
				                 id={ 'incomeGoal' }
				                 register={ register }
				                 trigger={ trigger }
				                 error={ errors.incomeGoal ?? null }
				                 onValueChange={ chooseIncomeGoal }
				                 validationRules={ {
					                 required: 'Wybierz oczekiwane zarobki w Dealme'
				                 } }
				                 labelText={ 'Oczekiwane zarobki w Dealme' }
				                 text={ `${ getUserIncomeGoal().range } / tydzień` }
				                 additionalText={ getUserIncomeGoal().description }
				                 selectItems={ getIncomeGoalSelectItems() }/>
				{ errors.specialization?.message && <InputError text={ errors.specialization.message }/> }
			</div>
		</form>
	);
};

export default PrimaryInfoModalItem;