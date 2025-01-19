import React, {useEffect, useState} from "react";
import {IPrimaryInfoEditFormData, IPrimaryInfoModalItemProps} from "./primaryInfoModalItemTypes.ts";
import {ReactComponent as FreelancerIcon} from "@icons/named_exported/freelancer_registration.svg";
import styles from "./PrimaryInfoModalItem.module.scss";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import {useForm, useWatch} from "react-hook-form";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import {useOnboardingService} from "@services/onboardingService.ts";
import {IIncomeGoal, ISpecialization} from "@shared/onboardingTypes.ts";
import {EXPERIENCE_LEVELS, ExperienceLevelKey} from "@constants/experienceLevel.ts";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";

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

	const [specializations, setSpecializations] = useState<ISpecialization[]>([]);
	const [incomeGoals, setIncomeGoals] = useState<IIncomeGoal[]>([]);
	const {getSpecializations, getIncomeGoals, patchSpecialization, patchIncomeGoal, patchExperienceLevel} = useOnboardingService();
	const {patchFreelancerName, patchFreelancerCompany} = useFreelancerProfileService();

	const {register, handleSubmit, formState: {errors}, control, setValue} = useForm<IPrimaryInfoEditFormData>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {firstName, lastName, company, specialization, experience, incomeGoal},
	});

	const currentSpecialization = useWatch({name: 'specialization', control, defaultValue: specialization});
	const currentExperience = useWatch({name: 'experience', control, defaultValue: experience});
	const currentIncomeGoal = useWatch({name: 'incomeGoal', control, defaultValue: incomeGoal});

	useEffect(() => {
		registerOnSave!(handleSave);
	});

	useEffect(() => {
		getSpecializations()
			.then(response => setSpecializations(response))
			.catch(error => console.error('Failed to fetch specializations:', error));
	}, [getSpecializations]);

	useEffect(() => {
		getIncomeGoals()
			.then(response => setIncomeGoals(response))
			.catch(error => console.error('Failed to fetch income goals:', error));
	}, [getIncomeGoals]);

	const getSpecializationSelectItems = () => {
		return specializations.map(specialization => {
			return {
				text: specialization.name,
				info: specialization.description
			}
		});
	};

	const getExperienceLevelSelectItems = () => {
		return Object.entries(EXPERIENCE_LEVELS).map(([, value]) => {
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
		return {range: '', description: '', incomeGoal: ''};
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
		<form className={styles['item']} noValidate={true}>
			<div className={styles['item__role']}>
				<FreelancerIcon width={16.2} height={18}/>
				<div className={styles['item__role-wrapper']}>
					<span>Rodzaj konta</span>{''}
					Freelancer
				</div>
			</div>
			<div className={styles['item__wrapper']}>
				<div className={styles['item__wrapper']}>
					<CustomInput key={'firstName'}
					             preset={'firstName'}
					             errorMessage={errors.firstName?.message}
					             register={register}/>
					<CustomInput key={'lastName'}
					             preset={'lastName'}
					             errorMessage={errors.lastName?.message}
					             register={register}/>
				</div>
			</div>
			<SelectInput labelText={'Specjalizacja handlowa'}
			             text={currentSpecialization}
			             selectItems={getSpecializationSelectItems()}
			             onClick={chooseSpecialization}/>
			<CustomInput key={'company'}
			             preset={'company'}
			             register={register}
			             errorMessage={errors.company?.message}/>
			<SelectInput labelText={'Doświadczenie w sprzedaży'}
			             text={EXPERIENCE_LEVELS[currentExperience].title}
			             selectItems={getExperienceLevelSelectItems()}
			             additionalText={EXPERIENCE_LEVELS[currentExperience].info}
			             onClick={chooseExperience}/>
			<SelectInput labelText={'Oczekiwane zarobki w Dealme'}
			             text={`${getUserIncomeGoal().range} / tydzień`}
			             additionalText={getUserIncomeGoal().description}
			             onClick={chooseIncomeGoal}
			             selectItems={getIncomeGoalSelectItems()}
			/>
		</form>
	);
};

export default PrimaryInfoModalItem;