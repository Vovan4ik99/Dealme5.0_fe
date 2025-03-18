import { useForm, useWatch } from "react-hook-form";
import {
	IPortfolioAddModalItemProps,
	IPortfolioForm
} from "@components/features/EditModal/portfolio/PortfolioAddModalItem/portfolioAddModalItemTypes.ts";
import styles from './PortfolioAddModalItem.module.scss';
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React, { useCallback, useEffect, useState } from "react";
import CustomTextArea from "@ui/CustomTextArea/CustomTextArea.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import InputError from "@ui/InputError/InputError.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";
import PreviewGalleryModal from "@ui/PreviewGalleryModal/PreviewGalleryModal.tsx";
import { parseBase64Image } from "@utils/imageUtils.ts";
import { IFreelancerPortfolioUpdateRequest } from "@shared/freelancer/portfolio.ts";

const PortfolioAddModalItem: React.FC<IPortfolioAddModalItemProps> = ({
	                                                                      onSave,
	                                                                      registerOnSave,
	                                                                      handleClose,
	                                                                      portfolio,
	                                                                      isEdit,
	                                                                      onPatch
                                                                      }) => {

	const { openModal } = useModal();

	const [ isPreviewOpened, setIsPreviewOpened ] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		trigger,
		control,
		setValue,
		formState: { errors },
		clearErrors
	} = useForm<IPortfolioForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			info: portfolio?.info,
			title: portfolio?.title,
			picture: parseBase64Image(portfolio?.pictureData ?? null).blob ?? undefined,
			filename: parseBase64Image(portfolio?.pictureData ?? null, 'portfolio project').filename ?? undefined,
		}
	});

	const title = useWatch({ name: 'title', control });
	const info = useWatch({ name: 'info', control });
	const picture = useWatch({ name: 'picture', control });
	const filename = useWatch({ name: 'filename', control });

	const setInfo = (newInfo: string) => {
		setValue('info', newInfo)
	};

	const onImageAdd = () => {
		openModal({
			id: 'MediaUploader',
			title: 'Dodaj projekt',
			shouldCloseOnSaving: true,
			btnWithIcon: true,
			btnText: 'Dodaj projekt',
			withSaveBtn: true,
			child: <MediaUploader onImageAdd={ handleAddImage }
			                      mediaType={ 'image' }
			                      isPortfolioImage={ true }
			                      text={ 'Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB' }/>
		});
	};

	const handleAddImage = (picture: Blob, fileName: string) => {
		setValue('picture', picture);
		setValue('filename', fileName);
		clearErrors('picture');
	};

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			if (isEdit) {
				const request: IFreelancerPortfolioUpdateRequest = {
					id: portfolio.id,
					title: data.title,
					info: data.info
				};
				onPatch(request);
			} else {
				const formData = new FormData();
				formData.append("title", data.title);
				formData.append("info", data.info ?? '');
				formData.append("picture", data.picture!, data.filename ?? 'Portfolio project');
				onSave(formData);
			}
			handleClose!();
		})();
	}, [ handleClose, handleSubmit, isEdit, onPatch, onSave, portfolio ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<div className={ styles['portfolio'] }>
			<div>
				<div className={ `${ styles["portfolio__item"] } 
					${ errors.picture?.message && styles["portfolio__item--error"] }` }>
					<input type={ 'hidden' }
					       id={ 'picture' }
					       { ...register("picture", { required: "Dodaj projekt" }) }/>
					<p className={ styles["portfolio__title"] }>Projekt</p>
					<p className={ styles["portfolio__text"] }>{ filename }</p>
					<div className={ styles["portfolio__img"] }>
						{ picture &&
                            <div className={ styles['portfolio__preview'] }>
                                <ActionBtn kind={ "Preview" }
                                           onClick={ () => setIsPreviewOpened(true) }
                                           backgroundColor={ "lightgray" }
                                           withBorder={ false }/>
                            </div>
						}
						{ picture &&
                            <div className={ styles["portfolio__actions"] }>
                                <ActionBtn kind={ "Edit" }
                                           onClick={ onImageAdd }
                                           backgroundColor={ "lightgray" }
                                           withBorder={ false }/>
                                <ActionBtn kind={ "Delete" }
                                           onClick={ () => setValue('picture', undefined) }
                                           backgroundColor={ "lightgray" }
                                           withBorder={ false }/>
                            </div>
						}
						{ picture ?
							<img className={ styles["portfolio__user-img"] }
							     src={ URL.createObjectURL(picture) } alt={ 'portfolio project' }/> :
							<button className={ styles['portfolio__btn'] }
							        onClick={ onImageAdd }>
								<p className={ styles["portfolio__title"] }>Dodaj projekt do portfolio</p>
							</button>
						}
					</div>
					<div className={ styles["portfolio__info"] }>
						<InfoIcon/>
						<p>Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB</p>
					</div>
				</div>
				{ errors.picture?.message && <InputError text={ errors.picture.message }/> }
			</div>

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
			{ picture &&
                <PreviewGalleryModal onClose={ () => setIsPreviewOpened(false) }
                                     isModalOpened={ isPreviewOpened }
                                     galleryItems={
					                     [ {
						                     picture: URL.createObjectURL(picture),
						                     title,
						                     description: info
					                     } ]
				                     }/>
			}
		</div>
	);
};

export default PortfolioAddModalItem;