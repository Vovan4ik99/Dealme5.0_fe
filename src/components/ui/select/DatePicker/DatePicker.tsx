import React, {FC, useRef, useState} from 'react';
import style from './DatePicker.module.scss'
import Calendar from "@ui/select/Calendar/Calendar.tsx";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import {IDataPickerProps} from "@ui/select/DatePicker/DatePickerTypes.ts";
import InputError from "@ui/form/InputError/InputError.tsx";
import {formatDateToDDMMYYYY} from "@utils/investorServiceUtils.ts";
import useInputClose from "@hooks/closeInput.hook.ts";

const DatePicker: FC<IDataPickerProps> = ({ register,
                                            trigger,
                                            onValueChange,
                                            error,
                                            id,
                                            labelText,
                                            value,
                                            validationRules }) => {
    const [ isOpened, setIsOpened ] = useState<boolean>(false);

    const isValidDate = value && !error?.message && !isNaN(new Date(value).getTime());

    const ref = useRef<HTMLDivElement>(null);

    const handleDatePick = (date: Date) => {
        setIsOpened(false);
        onValueChange(date);
        trigger(id);
    }

    useInputClose(ref, setIsOpened);

    return (
        <div ref={ ref }>
            <input type={ "hidden" } { ...register(id, validationRules) }/>
            <div className={ style["data-picker"] }>
                <div className={ `${style["data-picker__btn"]} 
                                  ${ isOpened && style["data-picker__btn--open"] }
                                  ${ error?.message && style["data-picker__btn--error"]}` }>
                    <div>
                        <p className={ `${ style["data-picker__title"] } 
                                        ${ !value && style["data-picker__title--placeholder"] }` }>
                            { labelText }
                        </p>
                        <p className={ `${ style["data-picker__value"] } 
                                        ${ !isValidDate && style["data-picker__value--placeholder"] }` }>
                            { isValidDate
                                ? formatDateToDDMMYYYY(value)
                                : "DD.MM.RRRR" }
                        </p>
                    </div>
                    <ActionBtn onClick={ () => setIsOpened(prev => !prev) }
                               withBorder={ !isOpened }
                               isActive={ isOpened }
                               backgroundColor={ "white" }
                               kind={ "Calendar" }/>
                </div>
                <Calendar chooseDate={ handleDatePick }
                          isOpened={ isOpened }
                          chosenDate={ value }/>
            </div>
            { (error?.message && !isOpened) && <InputError text={ error?.message }/> }
        </div>
    );
};

export default DatePicker;
