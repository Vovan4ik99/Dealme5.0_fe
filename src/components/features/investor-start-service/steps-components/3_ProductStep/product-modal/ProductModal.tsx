import React, {FC, useCallback, useEffect, useState} from 'react';
import styles from "./ProductModal.module.scss"
import {FieldError, useForm, useWatch} from "react-hook-form";
import SwitchBtn from "@ui/button/SwitchBtn/SwitchBtn.tsx";
import {
    AreaKeys, FormKeys, ICompanySizeItem, IProductModalProps, ISectorItem, IStateItem, ISubIndustryItem
} from "@components/features/investor-start-service/steps-components/3_ProductStep/product-modal/ProductModalTypes.ts";
import SelectFormInput from "@ui/select/SelectFormInput/SelectFormInput.tsx";
import {useFreelancerProfileAsideInfoService} from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import {
    AREA_VALUES,
    areaKeyToFormKey,
    currentAreaSwitch,
    getBuyerPersonSelects,
    getCompanySizeSelects,
    getCurrentAreaIndex,
    getSectorsSelects,
    getSelectedStates,
    getSubIndustriesSelects
} from "@utils/investorServiceUtils.ts";
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import CustomTextArea from "@ui/form/CustomTextArea/CustomTextArea.tsx";
import {useFreelancerOnboardingService} from "@services/onboarding/freelancerOnboardingService.ts";
import {useInvestorStartService} from "@services/start/useInvestorStartService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import {IBuyerPersonResponse, IProductItem, IProductRequest} from "@shared/start-service/investorStartServiceTypes.ts";

const ProductModal: FC<IProductModalProps> = ({ onSubmit, registerOnSave, handleClose, currentProduct, mode }) => {
    const { getStates } = useFreelancerProfileAsideInfoService();
    const { getIndustries }= useFreelancerOnboardingService();
    const { getSectors } = useFreelancerOnboardingService();
    const { getCompanySize, loadingStatus, getBuyerPerson, createProduct } = useInvestorStartService();

    const [ sectors, setSectors ] = useState<ISectorItem[]>([]);
    const [buyerPersons, setBuyerPersons] = useState<IBuyerPersonResponse[]>([]);
    const [ companySizes, setCompanySize ] = useState<ICompanySizeItem[]>([]);
    const [area, setArea] = useState<AreaKeys>(() => currentAreaSwitch(currentProduct));
    const [ subIndustries, setSubIndustries ] = useState<ISubIndustryItem[]>([]);
    const [ states, setStates ] = useState<IStateItem[]>([]);

    const { register, formState: { errors, isValid }, trigger, setValue, control, handleSubmit, clearErrors }= useForm<IProductItem>({
        shouldFocusError: false,
        mode: 'onTouched',
        defaultValues: {
            name: currentProduct?.name,
            subIndustry: currentProduct?.subIndustry ,
            description: currentProduct?.description ,
            sector: currentProduct?.sector,
            companySize: currentProduct?.companySize ,
            buyerPerson: currentProduct?.buyerPerson ,
            additionalNotes: currentProduct?.additionalNotes ,
            country: currentProduct?.country,
            state: currentProduct?.state,
            city: currentProduct?.city
        }
    });

    const formValue = useWatch({ control });

    const submitForm = useCallback(() => {
        handleSubmit((data) => {
            handleClose!();

            if (mode === "edit") {
                onSubmit(data, currentProduct.id!);
                return;
            }

            const request = prepareData(data);

            createProduct(request)
                .then((res) => {
                    onSubmit({ id: res.id, ...data});
                })
                .catch(console.error);
        })();
    }, [ handleSubmit, onSubmit, handleClose, isValid, createProduct ]);


    useEffect(() => {
        registerOnSave!(submitForm);
    });

    useEffect(() => {
        getSectors()
            .then(setSectors)
            .catch(console.error)
    }, [ getSectors ])

    useEffect(() => {
        getCompanySize()
            .then(setCompanySize)
            .catch(console.error)
    }, [ getCompanySize ]);

    useEffect(() => {
        getBuyerPerson()
            .then(setBuyerPersons)
            .catch(console.error)
    }, [ getBuyerPerson ]);

    useEffect(() => {
        getIndustries()
            .then((res) => {
                res.map((industry) => setSubIndustries((prev) => [...prev , ...industry.subIndustries]))
            })
            .catch(console.error)
    }, [ getIndustries ])

    useEffect(() => {
        getStates()
            .then(setStates)
            .catch(console.error)
    }, [ getStates ]);

    const setData = (data: string, currentState: string[] | undefined, key: FormKeys) => {
        const current = currentState ?? [];

        setValue(key, [...current, data]);
    }

    const onDelete = (id: string, currentState: string[], key: FormKeys) => {
        const updated = currentState!.filter(s => s !== id);

        setValue(key, updated ?? []);
    }

    const switchArea = (selectedArea: AreaKeys) => {
        AREA_VALUES.map(a => {
            if (a !== selectedArea) {
                return setValue(areaKeyToFormKey(a), undefined)
            }
        });

        setArea(selectedArea);
    }

    const setProductName = (value: string) => {
        clearErrors('name');
        setValue('name', value);
        trigger("name");
    }

    const prepareData= (data: IProductItem) => {
        const sectorsIds = sectors.filter(sec => data.sector.includes(sec.name))
                                            .map(sec => sec.id);
        const subIndustryId = subIndustries!.find(sub => sub.name === data.subIndustry)!.id
        const buyerPersonIds = buyerPersons.filter(buy => data.buyerPerson.includes(buy.name))
                                                  .map(buy => buy.id);
        const companySize = companySizes.filter(buy => data.companySize.includes(buy.description))
                                               .map(buy => buy.name);
        const country = data.country === "Polska" ? "POLAND" : undefined ;
        return {
            name: data.name,
            subIndustryId: subIndustryId,
            description: data.description,
            sectorIds: sectorsIds,
            companySize: companySize,
            buyerPersonIds: buyerPersonIds,
            additionalNotes: data.additionalNotes,
            country: country,
            state: data.state,
            city: data.city
        } as IProductRequest;
    }

    if (loadingStatus === 'loading') {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div>
                <h3 className={styles["modal__section-name"]}>Podstawowe</h3>
                <div className={styles["modal__section"]}>
                    <CustomInput id={'name'}
                                 type={"text"}
                                 existedValue={ formValue.name }
                                 onChange={(value) => setProductName(value)}
                                 placeholder={"Wpisz"}
                                 labelText={"Nazwa produktu"}
                                 validation={ {
                                     required: 'Podaj nazwę produktu',
                                     max: {
                                         value: 50,
                                         message: 'Maksymalnie 50 znaków'
                                     }
                                  } }
                                 register={register}
                                 errorMessage={errors.name?.message}/>
                    <SelectFormInput text={ formValue.subIndustry ??  null }
                                     id={ 'subIndustry' }
                                     labelText={ 'Z jakiej branży jest Twój produkt/usługa?' }
                                     selectItems={ getSubIndustriesSelects(subIndustries) }
                                     register={ register }
                                     trigger={ trigger }
                                     validationRules={ {
                                         required: "Wybierz sektor"
                                     } }
                                     error={ errors.subIndustry ?? null }
                                     onValueChange={ (value) => setValue("subIndustry" ,value) }/>
                    <CustomTextArea label={ 'Opis produktu (opcjonalne)' }
                                    maxSymbols={ 1000 }
                                    minHeight={ 150 }
                                    placeholder={ 'Wpisz tutaj opis..' }
                                    fontWeight={ 400 }
                                    value={ formValue.description }
                                    id={ 'description' }
                                    trigger={ trigger }
                                    register={ register }
                                    onTextChange={ (newText: string) => setValue('description', newText) }/>
                </div>
            </div>
            <div>
                <h3 className={styles["modal__section-name"]}>Sczegóły</h3>
                <div className={styles["modal__section"]}>
                    <SelectFormInput text={ formValue.sector ??  null }
                                     id={ 'sector' }
                                     labelText={ 'Do jakiego sektora kierujesz swoją ofertę?' }
                                     selectItems={ getSectorsSelects(sectors) }
                                     register={ register }
                                     trigger={ trigger }
                                     onDelete={(id) => onDelete(id , formValue.sector!, 'sector') }
                                     validationRules={ {
                                         required: "Wybierz sektor"
                                     } }
                                     error={ errors.sector as FieldError ?? null }
                                     onValueChange={ (data) => setData(data, formValue?.sector, 'sector') }/>
                    <SelectFormInput text={ formValue.companySize ??  null }
                                     id={ 'companySize' }
                                     labelText={ 'Jak duże podmioty są Twoim celem?' }
                                     selectItems={ getCompanySizeSelects(companySizes) }
                                     register={ register }
                                     trigger={ trigger }
                                     onDelete={(id) => onDelete(id , formValue.companySize!, 'companySize') }
                                     validationRules={ {
                                         required: "Wybierz target"
                                     } }
                                     error={ errors.companySize as FieldError ?? null }
                                     onValueChange={(data) => setData(data, formValue?.companySize, 'companySize') }/>
                    <SelectFormInput text={ formValue.buyerPerson ??  null }
                                     id={ 'buyerPerson' }
                                     labelText={ 'Wybierz Buyer Personę, do której skierowana jest Twoja oferta ' }
                                     selectItems={ getBuyerPersonSelects(buyerPersons) }
                                     register={ register }
                                     trigger={ trigger }
                                     onDelete={(id) => onDelete(id , formValue.buyerPerson!, 'buyerPerson') }
                                     validationRules={ {
                                         required: "Wybierz Buyer Persone"
                                     } }
                                     error={ errors.buyerPerson as FieldError ?? null }
                                     onValueChange={(data) => setData(data, formValue?.buyerPerson, 'buyerPerson') }/>
                    <CustomTextArea label={ 'Opis buyer persony (opcjonalne)' }
                                    maxSymbols={ 1000 }
                                    minHeight={ 150 }
                                    placeholder={ 'Wpisz tutaj opis..' }
                                    fontWeight={ 400 }
                                    value={ formValue.additionalNotes }
                                    id={ 'additionalNotes' }
                                    trigger={ trigger }
                                    register={ register }
                                    onTextChange={ (newText: string) => setValue('additionalNotes', newText) }/>
                </div>
            </div>
            <div>
                <h3 className={ styles["modal__section-name"] }>Określ obszar sprzedaży produktu</h3>
                <div className={ styles["modal__section"] }>
                    <SwitchBtn items={ [...AREA_VALUES] }
                               currentIndex={ getCurrentAreaIndex(area) }
                               onClick={ (index) => switchArea(AREA_VALUES[index]) }/>
                    { area === "Kraj" && (
                        <SelectFormInput
                            text={formValue.country ?? null}
                            id="country"
                            labelText="Kraj"
                            selectItems={ [{ text: "Polska", info: null }] }
                            register={ register }
                            trigger={ trigger }
                            validationRules={ { required: "Wybierz Kraj" } }
                            error={ errors.country ?? null }
                            onValueChange={ (value) => setValue("country", value) }
                        />
                    )}

                    { area === "Województwo" && (
                        <SelectFormInput
                            text={ formValue.state ?? null }
                            id={ "state" }
                            labelText={ "Województwo" }
                            selectItems={ getSelectedStates(states) }
                            register={ register }
                            trigger={ trigger }
                            validationRules={ { required: "Wybierz Województwo" } }
                            error={ errors.state ?? null }
                            onValueChange={(value) => setValue("state", value)}
                        />
                    ) }

                    { area === "Miasto" && (
                        <CustomInput
                            preset="city"
                            register={ register }
                            errorMessage={ errors.city?.message }
                        />
                    ) }
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
