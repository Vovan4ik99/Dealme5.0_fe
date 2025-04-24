import React, {FC, useRef} from 'react';
import style from './NumberInput.module.scss';
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import InputError from "@ui/form/InputError/InputError.tsx";
import {INumberInputProps} from "@ui/form/NumberInput/NumberInputTypes.ts";

const NumberInput: FC<INumberInputProps> = ({   id,
                                                labelText,
                                                errorMessage,
                                                register,
                                                validation,
                                                placeholder,
                                                onChange,
                                                existedValue}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isNumberFalsy =  existedValue !== undefined && !Number.isNaN(existedValue);
    const isNumberPositive = isNumberFalsy && existedValue >= 0;


    const increment = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        onChange(isNumberPositive ? existedValue + 1 : 1);
    };

    const decrement = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        onChange(isNumberPositive && existedValue !== 0 ? existedValue - 1 : 0);
    };

    const handleInputChange = (e: string) => {
        const newValue = parseInt(e, 10);
        onChange(newValue);
    };

    return (
        <div className={ style["container"] }
             ref={ ref }>
            <div className={ `${style["input"]} ${ errorMessage && style["input--error"] }` }>
                <div className={ style["input__content"] }>
                    <label className={style['input__label']} htmlFor={id}>{labelText}</label>
                    <input type={"number"}
                           id={ id }
                           onFocus={ () => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
                           placeholder={placeholder ?? "Podaj ilość"}
                           { ...register(id,{
                               ...validation,
                               onChange: (e) => handleInputChange(e.currentTarget.value),
                           }) }
                           className={style["input__value"] }/>
                </div>
                <div className={ style["input__btns"] }>
                        <ActionBtn key={ "minus" }
                                   onClick={ decrement }
                                   kind={ "Minus" }
                                   withBorder={ true }
                                   backgroundColor={ "white" }/>
                        <ActionBtn key={ "plus" }
                                   onClick={ increment }
                                   kind={ "Add" }
                                   withBorder={ true }
                                   backgroundColor={ "white" }/>
                </div>
            </div>
            { errorMessage && <InputError text={errorMessage}/> }
        </div>
    );
};

export default NumberInput;
