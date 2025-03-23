import React, { useState } from "react";
import { ISelectFormInputProps } from "@ui/SelectFormInput/selectFormInputTypes.ts";
import styles from './SelectFormInput.module.scss';
import { ReactComponent as ArrowIcon } from "@icons/named_exported/arrow-down.svg";
import SelectOption from "@ui/SelectOption/SelectOption.tsx";
import InputError from "@ui/InputError/InputError.tsx";
import DropDownModal from "@ui/DropdownModal/DropdownModal.tsx";

const SelectFormInput = <T extends Record<string, any>>({
	                                                        text,
	                                                        labelText,
	                                                        register,
	                                                        trigger,
	                                                        selectItems,
	                                                        additionalText,
	                                                        error,
	                                                        id,
	                                                        validationRules,
	                                                        onValueChange
                                                        }: ISelectFormInputProps<T>) => {

	const [ isOpen, setIsOpen ] = useState<boolean>(false);

	const toggleSelect = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen((prevState) => (!prevState));
	};

	const onOptionClick = (newValue: string) => {
		onValueChange(newValue);
		trigger(id);

		setIsOpen(false);
	};

	const renderSelectItems = () => {
		if (!selectItems || selectItems.length === 0) {
			return <SelectOption value={ 'Brak opcji' } info={ null } onClick={ () => setIsOpen(false) }/>;
		}

		return selectItems.map((item, index) => {
			return (
				<SelectOption key={ item.text + index }
				              value={ item.text }
				              info={ item.info ?? null }
				              onClick={ () => onOptionClick(item.text) }/>
			);
		});
	};

	return (
		<div className={ styles['input'] }>
			<input type="hidden" { ...register(id, validationRules) } />
			<button
				className={
					`${ styles['input__btn'] }
					 ${ isOpen && styles['input__btn--open'] }
					 ${ error && styles['input__btn--error'] }` }
				onClick={ toggleSelect }>
				<div className={ styles['input__text'] }>
					<span className={ `${ text && styles['input__text--filled'] }` }>
						{ labelText }
					</span>
					<p className={ `${ !text && styles['input__text--default'] }`  }>
						{ !text ? 'Wybierz' : text }
					</p>
					{ additionalText && <span className={ styles['input__text-add'] }> ({ additionalText }) </span> }
				</div>
				<ArrowIcon width={ 12 } height={ 8 }/>
			</button>
			<DropDownModal isOpen={ isOpen }
						   renderItems={ renderSelectItems() }
						   isFitting={ true }/>
			{ (error?.message && !isOpen) && <InputError text={ error.message }/> }
		</div>

	);
};

export default SelectFormInput;