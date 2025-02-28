import { useForm, useWatch } from "react-hook-form";
import {
	IPortfolioAddModalItemProps,
	IPortfolioForm
} from "@components/features/EditModal/portfolio/PortfolioAddModalItem/portfolioAddModalItemTypes.ts";
import styles from './PortfolioAddModalItem.module.scss';
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React, { useCallback, useEffect } from "react";
import CustomTextArea from "@ui/CustomTextArea/CustomTextArea.tsx";

const PortfolioAddModalItem: React.FC<IPortfolioAddModalItemProps> = ({ onSave, registerOnSave }) => {

	const { register, handleSubmit, trigger, control, setValue, formState: { errors } } = useForm<IPortfolioForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			info: undefined,
			title: undefined,
			picture: undefined,
			filename: undefined,
		}
	});

	const title = useWatch({ name: 'title', control });
	const info = useWatch({ name: 'info', control });
	const picture = useWatch({ name: 'picture', control });

	const setInfo = (newInfo: string) => {
		setValue('info', newInfo)
	};

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("info", data.info);
			formData.append("pictureData", data.picture, data.filename ?? 'Portfolio picture');
			onSave(formData);
		})();
	}, [handleSubmit, onSave]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<form className={ styles['form'] } noValidate={ true }>
			<CustomInput id={ 'title' }
			             register={ register }
			             labelText={ 'Nazwa' }
			             placeholder={ 'np. Portfolio' }
			             type={ 'text' }
			             errorMessage={ errors.title?.message }
			             validation={ { required: 'Podaj nazwę projektu' } }
			             existedValue={ title }/>
			<CustomTextArea id={ 'info' }
			                register={ register }
			                placeholder={ 'Wpisz komentarz' }
			                label={ 'Komentarz' }
			                labelColor={ 'black' }
			                maxSymbols={ 150 }
			                trigger={ trigger }
			                onTextChange={ setInfo }
			                value={ info }/>
		</form>
	);
};

export default PortfolioAddModalItem;