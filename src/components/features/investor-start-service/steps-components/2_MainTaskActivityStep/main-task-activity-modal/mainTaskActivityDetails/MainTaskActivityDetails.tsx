import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import styles from './MainTaskActivityDetails.module.scss';
import {
    IPipelineMainTaskDetailsForm,
    IPipelineMainTaskDetailsProps,
    IPipelineMainTaskDetailsRef
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetailsTypes.ts";
import {useForm, useWatch} from "react-hook-form";
import NumberInput from "@ui/form/NumberInput/NumberInput.tsx";
import {
    getLabelFromMonths,
    getMonthsFromLabel,
    mainTaskActivityPeriodData
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityPeriodData.ts";
import {
    PipelineFormValidation
} from "@components/features/investor-start-service/steps-components/2_MainTaskActivityStep/main-task-activity-modal/mainTaskActivityDetails/MainTaskActivityDetailsFormValidation.ts";
import CustomTextArea from "@ui/form/CustomTextArea/CustomTextArea.tsx";
import {ISelectItem} from "@ui/select/SelectFormInput/selectFormInputTypes.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import SelectFormInput from "@ui/select/SelectFormInput/SelectFormInput.tsx";
import DatePicker from "@ui/select/DatePicker/DatePicker.tsx";

const MainTaskActivityDetails  = forwardRef< IPipelineMainTaskDetailsRef, IPipelineMainTaskDetailsProps>(
    ({ orderDetails,
       mainTaskName,
       isDisabled,
       onSave,
       onEdit }, ref) => {

    const {
        register,
        formState: {errors, isValid: isFormValid},
        trigger,
        setValue,
        control,
        handleSubmit,
        clearErrors
    } = useForm<IPipelineMainTaskDetailsForm>({
        shouldFocusError: false,
        mode: 'onTouched',
        defaultValues: {
            startDate: orderDetails?.startDate ? new Date(orderDetails.startDate) : undefined,
            period: orderDetails?.period,
            description: orderDetails?.description,
            amount: orderDetails?.amount,
        }
    });

    const formValue = useWatch({ control });

    const handleMainTaskEdit = () => {
        onEdit(formValue)
    }

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit((data) => {
                if (!isFormValid) return;
                onSave(data);
            })();
        }
    }));

    const getPeriodOptions = (): ISelectItem[] => {
        return mainTaskActivityPeriodData.map((period) => {
            return { text: period, info: null };
        })
    }

    const setStartDate = (startDate: Date) => {
            clearErrors('startDate');
            setValue("startDate", startDate);
    }

    const setAmount = (amount: number) => {
        clearErrors('amount');
        setValue('amount', amount);
        trigger('amount');
    }

    useEffect(() => isDisabled(!isFormValid), [ isFormValid, trigger, isDisabled ]);

    return (
        <div className={styles["details"]}>
            <div className={styles["details__edit-btn"]}>
                <div className={styles["details__btn-text"]}>
                    <p className={styles["details__label"]}>Wybrana usługa</p>
                    <p className={styles["details__value"]}>{ mainTaskName }</p>
                </div>
                <ActionBtn onClick={handleMainTaskEdit}
                           withBorder={true}
                           backgroundColor={"white"}
                           kind={"Edit"}/>
            </div>
            <div className={styles["details__row"]}>
                <NumberInput id={ "amount" }
                             register={ register }
                             existedValue={ formValue.amount }
                             onChange={ (amount) => setAmount(amount) }
                             errorMessage={ errors.amount?.message }
                             validation={ PipelineFormValidation.amount }
                             labelText={ "Ilość" }/>
                <SelectFormInput text={formValue.period ? getLabelFromMonths(formValue.period) : 'Okres'}
                                 id={'period'}
                                 labelText={'Okres'}
                                 selectItems={getPeriodOptions()}
                                 register={register}
                                 trigger={trigger}
                                 validationRules={PipelineFormValidation.period}
                                 error={errors.period ?? null}
                                 onValueChange={ (period) => setValue("period", getMonthsFromLabel(period)) }/>
            </div>
            <DatePicker labelText={ "Od" }
                        id={ "startDate" }
                        value={ formValue?.startDate }
                        onValueChange={ (startDate) => setStartDate(startDate) }
                        register={ register }
                        error={ errors.startDate ?? null }
                        validationRules={ PipelineFormValidation.startDate }
                        trigger={ trigger } />
            <CustomTextArea label={ 'Dodatkowe informacje' }
                            maxSymbols={ 250 }
                            placeholder={ 'Wpisz tutaj dodatkowe informacje..' }
                            fontWeight={ 400 }
                            value={ formValue.description }
                            id={ 'description' }
                            validation={ PipelineFormValidation.description }
                            trigger={ trigger }
                            register={ register }
                            error={ errors.description }
                            onTextChange={ (description: string) => setValue('description', description) }/>
        </div>
    );
});

export default MainTaskActivityDetails;
