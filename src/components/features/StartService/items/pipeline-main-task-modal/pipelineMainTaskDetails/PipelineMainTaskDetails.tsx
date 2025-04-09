import React, {forwardRef, useImperativeHandle} from 'react';
import styles from './PipelineMainTaskDetails.module.scss';
import {
    IPipelineMainTaskDetailsForm,
    IPipelineMainTaskDetailsProps,
    IPipelineMainTaskDetailsRef
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetailsTypes.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useForm, useWatch} from "react-hook-form";
import NumberInput from "@ui/NumberInput/NumberInput.tsx";
import SelectFormInput from "@ui/SelectFormInput/SelectFormInput.tsx";
import {
    getLabelFromMonths,
    getMonthsFromLabel,
    pipelineMainTaskPeriodData
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskPeriodData.ts";
import {ISelectItem} from "@ui/SelectFormInput/selectFormInputTypes.ts";
import CustomTextArea from "@ui/CustomTextArea/CustomTextArea.tsx";
import {format, isValid, parse} from "date-fns";
import {
    PipelineFormValidation
} from "@components/features/StartService/items/pipeline-main-task-modal/pipelineMainTaskDetails/PipelineMainTaskDetailsFormValidation.ts";

const PipelineMainTaskDetails  = forwardRef< IPipelineMainTaskDetailsRef, IPipelineMainTaskDetailsProps>(
    ({ orderDetails, mainTaskName, onSave, onEdit }, ref) => {

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
            startDate: orderDetails?.startDate,
            period: orderDetails?.period,
            description: orderDetails?.description,
            amount: orderDetails?.amount,
        }
    });

    const formValue = useWatch({control});

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
        return pipelineMainTaskPeriodData.map((period) => {
            return {text: period, info: null};
        })
    }

    const setStartDate = (startDate: string) => {
        const parsed = parse(startDate, "yyyy-MM-dd", new Date());
        if (isValid(parsed)) {
            clearErrors('startDate');
            return setValue("startDate", parsed);
        }
    }

    const setAmount = (amount: number) => {
        clearErrors('amount');
        setValue('amount', amount);
        trigger('amount');
    }

    return (
        <div className={styles["details"]}>
            <div className={styles["details__edit-btn"]}>
                <div className={styles["details__btn-text"]}>
                    <p className={styles["details__label"]}>Wybrana usługa</p>
                    <p className={styles["details__value"]}>{mainTaskName}</p>
                </div>
                <ActionBtn onClick={handleMainTaskEdit}
                           withBorder={true}
                           backgroundColor={"white"}
                           kind={"Edit"}/>
            </div>
            <div className={styles["details__row"]}>
                <NumberInput id={"amount"}
                             register={register}
                             existedValue={formValue.amount}
                             onChange={(amount) => setAmount(amount)}
                             errorMessage={errors.amount?.message}
                             validation={PipelineFormValidation.amount}
                             labelText={"Ilość"}/>
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
            {/* todo finish DatePicker and replace it */}
            <CustomInput id={'startDate'}
                         type={"date"}
                         existedValue={formValue.startDate ? format(formValue.startDate, "yyyy-MM-dd") : ""}
                         onChange={setStartDate}
                         placeholder={"Wybierz date"}
                         labelText={"Od"}
                         validation={ PipelineFormValidation.startDate }
                         register={register}
                         errorMessage={errors.startDate?.message}/>
            <CustomTextArea label={'Dodatkowe informacje'}
                            maxSymbols={1000}
                            placeholder={'Wpisz tutaj dodatkowe informacje..'}
                            fontWeight={400}
                            value={formValue.description}
                            id={'description'}
                            validation={PipelineFormValidation.description}
                            trigger={trigger}
                            register={register}
                            error={errors.description}
                            onTextChange={(description: string) => setValue('description', description)}/>
        </div>
    );
});

export default PipelineMainTaskDetails;
