import styles from './AboutMeModalItem.module.scss';
import CustomTextArea from "@ui/CustomTextArea/CustomTextArea.tsx";
import React, { useCallback, useEffect } from "react";
import {
	IAboutMeForm,
	IAboutMeModalItemProps
} from "@components/features/EditModal/about_me/AboutMeModalItem/aboutMeModalItemTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import VideoModalItem from "@components/features/EditModal/video/VideoModalItem/VideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";
import { createVideoBlob } from "@utils/videoUtils.ts";
import { useForm, useWatch } from "react-hook-form";
import InputError from "@ui/InputError/InputError.tsx";

const AboutMeModalItem: React.FC<IAboutMeModalItemProps> = ({ aboutMeInfo, onSave, registerOnSave, handleClose }) => {

	const { patchAboutMeProfileInfo, loadingStatus } = useFreelancerProfileService();
	const { openModal } = useModal();

	const { register, handleSubmit, formState: { errors }, control, setValue, trigger } = useForm<IAboutMeForm>({
		shouldFocusError: false,
		mode: 'onChange',
		defaultValues: {
			about: aboutMeInfo?.about ?? undefined,
			mainPassion: aboutMeInfo?.mainPassion ?? undefined,
			video: aboutMeInfo?.video ?? undefined
		}
	});

	const about = useWatch({ name: 'about', control });
	const mainPassion = useWatch({ name: 'mainPassion', control });
	const video = useWatch({ name: 'video', control, defaultValue: undefined });
	const filename = useWatch({ name: 'filename', control });

	const onVideoEdit = () => {
		openModal({
			id: 'MediaUploader',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			btnWithIcon: true,
			withSaveBtn: true,
			child: <MediaUploader onVideoAdd={ onVideoSave }
			                      mediaType={ 'video' }
			                      text={ 'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB' }/>
		});
	}

	const onVideoSave = (videoUrl: string, fileName: string) => {
		setValue('filename', fileName);
		setValue('video', videoUrl);
		trigger('video');
	};

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			const formData = new FormData();
			formData.append("about", data.about);
			formData.append("mainPassion", data.mainPassion ?? '');
			if (video.startsWith('data:video/')) {
				formData.append("video", createVideoBlob(data.video), data.filename ?? 'Intro video');
			}
			patchAboutMeProfileInfo(formData)
				.then(onSave)
				.catch(console.error);
			handleClose!();
		})();
	}, [ handleClose, handleSubmit, onSave, patchAboutMeProfileInfo, video ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			<CustomTextArea label={ 'Główna zajawka' }
			                fontSize={ 18 }
			                fontWeight={ 500 }
			                labelColor={ 'gray' }
			                maxSymbols={ 500 }
			                placeholder={ 'Wpisz tutaj swoje zajawki..' }
			                value={ about }
			                error={ errors.about }
			                register={ register }
			                validation={ {
				                 required: "Wpisz swoje zajawki",
			                 } }
			                trigger={ trigger }
			                id={ 'about' }
			                onTextChange={ (newText: string) => setValue('about', newText) }/>
			<CustomTextArea label={ 'Opis (opcjonalne)' }
			                labelColor={ 'gray' }
			                maxSymbols={ 600 }
			                placeholder={ 'Wpisz tutaj opis..' }
			                fontWeight={ 400 }
			                value={ mainPassion }
			                id={ 'mainPassion' }
			                trigger={ trigger }
			                register={ register }
			                onTextChange={ (newText: string) => setValue('mainPassion', newText) }/>
			<div>
				<input type={ 'hidden' }
				       id={ 'video' }
				       { ...register('video', { required: 'Dodaj video' }) }/>
				<VideoModalItem videoUrl={ video }
				                withDelete={ true }
				                label={ 'Wideo (opcjonalne)' }
				                emptyStateText={ 'Nagraj krótkie video o sobie' }
				                fileName={ filename ?? "" }
				                onClick={ onVideoEdit }
				                error={ errors.video }
				                onDelete={ () => {
					                setValue('video', '')
					                setValue('filename', '');
				                } }/>
				{ errors.video?.message && <InputError text={ errors.video.message }/> }
			</div>
		</div>
	);
};

export default AboutMeModalItem;