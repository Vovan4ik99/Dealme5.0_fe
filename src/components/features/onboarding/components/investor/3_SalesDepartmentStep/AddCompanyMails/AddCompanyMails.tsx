import styles from './AddCompanyMails.module.scss';
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import { CSSTransition } from "react-transition-group";
import React, { useRef, useState } from "react";
import { IAddCompanyMailsProps } from "./addCompanyMailsTypes.ts";

const AddCompanyMails: React.FC<IAddCompanyMailsProps> = ({ mails, onChange, isOpened }) => {

	const nodeRef = useRef<HTMLDivElement | null>(null);

	const [inputsCount, setInputsCount] = useState<number>(mails.length);

	const renderMailInputs = () => {
		const inputs = [];
		for (let i = 0; i < inputsCount + 1; i++) {
			inputs.push(
				<CustomInput key={ i }
				             id={ `email-${i}` }
				             type={ 'email' }
				             labelText={ 'E-mail' }
				             autoComplete={ 'email' }
				             register={ null }
				             existedValue={ mails[i] ?? '' }
				             onChange={ (value: string) => onChange(value, i) }
				             placeholder={ 'np. sprzedaz@przyklad.pl' }/>
			)
		}
		return inputs;
	};

	return (
		<CSSTransition timeout={ 300 }
		               nodeRef={ nodeRef }
		               in={ isOpened }
		               unmountOnExit
		               classNames={{
			               enter: styles['mails-enter'],
			               enterActive: styles['mails-enter-active'],
			               exit: styles['mails-exit'],
			               exitActive: styles['mails-exit-active'],
		               }}>
			<div ref={ nodeRef } className={ styles['mails'] }>
				<h2 className={ styles['mails__title'] }>
					Dodaj maile działu sprzedaży i wyślij do nich zaproszenia do Dealme
				</h2>
				<div className={ styles['mails__info'] }>
					<InfoIcon width={ 14 } height={ 14 }/>
					<span>Możesz to zrobić też później w panelu klienta</span>
				</div>
				<div className={ styles['mails__inputs'] }>
					{ renderMailInputs() }
					<button className={ styles['mails__btn'] }
					        onClick={ () => setInputsCount(inputsCount + 1) }>
						<AddIcon width={ 12 } height={ 12 }/>
						<span>Dodaj kolejny e-mail</span>
					</button>
				</div>
			</div>
		</CSSTransition>
	)
};

export default AddCompanyMails;