import React, { useState } from "react";
import {ISelectFormInputProps} from "@ui/select/SelectFormInput/selectFormInputTypes.ts";
import styles from './SelectFormInput.module.scss';
import { ReactComponent as ArrowIcon } from "@icons/named_exported/arrow_down.svg";
import SelectOption from "@ui/select/SelectOption/SelectOption.tsx";
import InputError from "@ui/form/InputError/InputError.tsx";
import DropDownModal from "@ui/select/DropdownModal/DropdownModal.tsx";
import SelectedOption from "@ui/select/SelectedOption/SelectedOption.tsx";

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
															onDelete,
	                                                        onValueChange
                                                        }: ISelectFormInputProps<T>) => {

	const [ isOpen, setIsOpen ] = useState<boolean>(false);

	const isTextValid = !text || text.length === 0;

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
			const isElementSelected = Array.isArray(text) && text.includes(item.text);
			if (isElementSelected) return ;
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
			<div
				className={
					`${ styles['input__btn'] }
					 ${ isOpen && styles['input__btn--open'] }
					 ${ error && styles['input__btn--error'] }` }
				onClick={ toggleSelect }>
				<div className={ styles['input__text'] }>
					<div className={ styles['input__head'] }>
						<span className={ `${ !isTextValid && styles['input__text--filled'] }` }>
							{ labelText }
						</span>
					{ Array.isArray(text) && <ArrowIcon width={ 12 } height={ 8 }/> }
					</div>
					<div className={ `${ isTextValid && styles['input__text--default'] }`  }>
						{ isTextValid
							? 'Wybierz'
							: !Array.isArray(text)
								? text
								: <SelectedOption text={ text }
												  onDelete={ (value) => onDelete!(value) } /> }
					</div>
					{ additionalText && <span className={ styles['input__text-add'] }> ({ additionalText }) </span> }
				</div>
				{ !Array.isArray(text) && <ArrowIcon width={ 12 } height={ 8 }/> }
			</div>
			<DropDownModal isOpen={ isOpen }
						   renderItems={ renderSelectItems() }
						   width={ "100%" }/>
			{ (error?.message && !isOpen) && <InputError text={ error.message }/> }
		</div>

	);
};

export default SelectFormInput;