import React, {useRef, useState} from "react";
import {ISelectInputProps} from "@ui/SelectInput/selectInputTypes.ts";
import styles from './SelectInput.module.scss';
import {ReactComponent as ArrowIcon} from "@icons/named_exported/arrow-down.svg";
import SelectOption from "@ui/SelectInput/SelectOption/SelectOption.tsx";
import {CSSTransition} from "react-transition-group";

const SelectInput: React.FC<ISelectInputProps> = ({text, labelText, onClick, selectItems, additionalText}) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectRef = useRef<HTMLDivElement | null>(null);

	const toggleSelect = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen((prevState) => (!prevState));
	}

	const onOptionClick = (newValue: string) => {
		onClick(newValue);
		setIsOpen(false);
	}

	const renderSelectItems = () => {
		if (!selectItems || selectItems.length === 0) {
			return <SelectOption value={'Brak opcji'} info={null} onClick={() => setIsOpen(false)}/>;
		}

		return selectItems.map((item, index) => {
			return (
				<SelectOption key={item.text + index}
				              value={item.text}
				              info={item.info}
				              onClick={() => onOptionClick(item.text)}/>
			);
		});
	};

	return (
		<div className={styles['input']}>
			<button className={`${styles['input__btn']} ${isOpen && styles['input__btn--open']}`} onClick={toggleSelect}>
				<div className={styles['input__text']}>
					<span>{labelText}</span>
					<p>
						{text}{' '}
						{additionalText && <span className={styles['input__text-add']}>({additionalText})</span>}
					</p>
				</div>
				<ArrowIcon width={12} height={8}/>
			</button>
			<CSSTransition in={isOpen}
			               timeout={300}
			               unmountOnExit
			               classNames={{
				               enter: styles['input__select-enter'],
				               enterActive: styles['input__select-enter-active'],
				               exit: styles['input__select-exit'],
				               exitActive: styles['input__select-exit-active'],
			               }}
			               nodeRef={selectRef}>
				<div ref={selectRef} className={`${styles['input__select']} ${isOpen && styles['input__select--open']}`}>
					{renderSelectItems()}
				</div>
			</CSSTransition>
		</div>

	);
}

export default SelectInput;