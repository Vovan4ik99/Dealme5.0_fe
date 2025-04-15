import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import React, { useCallback, useEffect, useState } from "react";
import {
	IFreelancerLocalizationForm,
	ILocalizationModalItemProps
} from "@components/features/modals/localization/LocalizationModalItem/localizationModalItemTypes.ts";
import { WORKING_AREAS } from "@constants/workingAreas.ts";
import {
	getCountryNameByDescription,
	getDescriptionByCountryName,
	getStateDescriptionByStateName,
	getStateNameByDescription,
	getStatesAsSelectItems,
	sortCountries
} from "@utils/localizationUtils.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { useForm, useWatch } from "react-hook-form";
import LocalizationForm from "@components/features/modals/localization/LocalizationForm/LocalizationForm.tsx";
import styles from "@components/features/modals/localization/LocalizationModalItem/LocalizationModalItem.module.scss";
import SwitchBtn from "@ui/button/SwitchBtn/SwitchBtn.tsx";
import SelectFormInput from "@ui/select/SelectFormInput/SelectFormInput.tsx";
import { ISelectItem } from "@ui/select/SelectFormInput/selectFormInputTypes.ts";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { IFreelancerCountry, IFreelancerLocalization, IFreelancerState } from "@shared/freelancer/localization.ts";

const LocalizationModalItem: React.FC<ILocalizationModalItemProps> = ({
	                                                                      userLocalization,
	                                                                      onSave,
	                                                                      registerOnSave,
	                                                                      freelancerWorkingArea,
	                                                                      freelancerWorkingAreaValue,
	                                                                      handleClose
                                                                      }) => {

	const [ countries, setCountries ] = useState<IFreelancerCountry[]>([]);
	const [ states, setStates ] = useState<IFreelancerState[]>([]);

	const {
		patchFreelancerLocalization,
		patchFreelancerWorkingArea,
		getStates,
		getCountries,
		loadingStatus
	} = useFreelancerProfileAsideInfoService();

	const {
		register,
		trigger,
		setValue,
		formState: { errors },
		handleSubmit,
		control
	} = useForm<IFreelancerLocalizationForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			country: userLocalization?.country,
			state: userLocalization?.state,
			city: userLocalization?.city,
			workingArea: freelancerWorkingArea ?? 'COUNTRY',
			workingAreaValue: freelancerWorkingAreaValue ?? undefined
		}
	});

	const country = useWatch({ name: 'country', control });
	const state = useWatch({ name: 'state', control });
	const city = useWatch({ name: 'city', control });
	const workingArea = useWatch({ name: 'workingArea', control });
	const workingAreaValue = useWatch({ name: 'workingAreaValue', control });

	useEffect(() => {
		getCountries()
			.then(setCountries)
			.catch(console.error);
	}, [ getCountries ]);

	useEffect(() => {
		getStates()
			.then(setStates)
			.catch(console.error);
	}, [ getStates ]);

	const chooseWorkingArea = () => {
		if (workingArea === 'COUNTRY') {
			setValue('workingArea', 'STATE');
		} else {
			setValue('workingArea', 'COUNTRY');
		}
		setValue('workingAreaValue', '');
	};

	const renderWorkingAreaInfo = () => {
		const areaToPaste = workingArea === "STATE" ? 'województwa' : 'kraju';
		return `Wybranie ${ areaToPaste } oznacza świadczenie usług na terenie całego ${ areaToPaste }`;
	};

	//Workaround, because now working area is only Poland
	const renderWorkingAreaValueSelectItems = (): ISelectItem[] => {
		if (countries.length === 0) return [];
		if (workingArea === "COUNTRY") {
			return [ { text: sortCountries(countries)[0].description, info: null } ];
		}
		return getStatesAsSelectItems(states);
	};

	const onWorkingAreaValueChange = (workingAreaValue: string) => {
		if (workingArea === "COUNTRY") {
			setValue('workingAreaValue', getCountryNameByDescription(countries, workingAreaValue) ?? '')
			return;
		}
		setValue('workingAreaValue', getStateNameByDescription(states, workingAreaValue) ?? '');
	};

	const getWorkingAreaValueDescription = () => {
		if (workingArea === "COUNTRY") {
			return getDescriptionByCountryName(countries, workingAreaValue);
		}
		return getStateDescriptionByStateName(states, workingAreaValue);
	};

	const patchWorkingArea = useCallback((
		workingArea: keyof typeof WORKING_AREAS, workingAreaValue: string
	) => {
		const request = { workingArea: workingArea, workingAreaValue: workingAreaValue };
		patchFreelancerWorkingArea(request)
			.then(onSave)
			.catch(console.error);
		handleClose!();
	}, [ handleClose, onSave, patchFreelancerWorkingArea ]);

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			const localizationData: IFreelancerLocalization = {
				country: data.country,
				state: data.state,
			};
			if (data.city && data.city.trim() !== '') {
				localizationData.city = data.city.trim();
			}
			patchFreelancerLocalization(localizationData)
				.then(() => patchWorkingArea(data.workingArea, data.workingAreaValue))
				.catch(console.error);
		})();
	}, [ handleSubmit, patchFreelancerLocalization, patchWorkingArea ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			<p className={ styles['item__title'] }>Ustaw swoją lokalizację</p>
			<div className={ styles['item__wrapper'] }>
				<LocalizationForm
					formData={ { country, state, city } }
					register={ register }
					setValue={ setValue }
					trigger={ trigger }
					errors={ errors }
					isCityRequired={ false }/>
			</div>
			<p className={ styles['item__title'] }>Określ obszar świadczenia usług</p>
			<SwitchBtn currentIndex={ workingArea === "COUNTRY" ? 0 : 1 }
			           onClick={ chooseWorkingArea }
			           items={[
						   <p className={styles['item__text']}>{WORKING_AREAS.COUNTRY}</p>,
						   <p>{ WORKING_AREAS.STATE }</p>
					   ]}/>
			<div className={ styles['item__footer'] }>
				<div className={ styles['item__icon'] }>
					<InfoIcon width={ 14 } height={ 14 }/>
				</div>
				<p className={ styles['item__info'] }>{ renderWorkingAreaInfo() }</p>
			</div>
			<SelectFormInput text={ getWorkingAreaValueDescription() ?? null }
			                 labelText={ workingArea === "COUNTRY" ? WORKING_AREAS.COUNTRY : WORKING_AREAS.STATE }
			                 id={ "workingAreaValue" }
			                 selectItems={ renderWorkingAreaValueSelectItems() }
			                 register={ register }
			                 trigger={ trigger }
			                 onValueChange={ onWorkingAreaValueChange }
			                 validationRules={ {
				                 required: 'Wybierz obszar świadczenia usług'
			                 } }
			                 error={ errors?.workingAreaValue ?? null }/>
		</div>
	)
}

export default LocalizationModalItem;