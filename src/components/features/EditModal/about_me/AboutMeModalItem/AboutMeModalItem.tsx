import styles from './AboutMeModalItem.module.scss';
import AboutMeTextArea from "@components/features/EditModal/about_me/AboutMeTextArea/AboutMeTextArea.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {
	IAboutMeModalItemProps
} from "@components/features/EditModal/about_me/AboutMeModalItem/aboutMeModalItemTypes.ts";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import AboutMeVideoModalItem
	from "@components/features/EditModal/about_me/AboutMeVideoModalItem/AboutMeVideoModalItem.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";

const AboutMeModalItem: React.FC<IAboutMeModalItemProps> = ({aboutMeInfo, onSave, registerOnSave}) => {

	const [aboutText, setAboutText] = useState<string>('');
	const [aboutDescription, setAboutDescription] = useState<string>('');
	const [video, setVideo] = useState<string | null>(null);
	const [filename, setFilename] = useState<string | null>(null);

	const {patchAboutMeProfileInfo, loadingStatus} = useFreelancerProfileService();
	const {openModal} = useModal();

	useEffect(() => {
		if (aboutMeInfo === null) {
			return;
		}
		if (aboutMeInfo.about !== null) {
			setAboutText(aboutMeInfo.about);
		}
		if (aboutMeInfo.mainPassion !== null) {
			setAboutDescription(aboutMeInfo.mainPassion);
		}
		if (aboutMeInfo.video !== null) {
			setVideo(aboutMeInfo.video);
		}
	}, [aboutMeInfo]);

	const onVideoEdit = () => {
		openModal({
			id: 'unknown',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			btnWithIcon: true,
			child: <MediaUploader onVideoAdd={onVideoSave}
			                      mediaType={'video'}
			                      text={'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB'}/>
		})
	}

	const onVideoSave = (videoUrl: string, fileName: string) => {
		setVideo(videoUrl);
		setFilename(fileName);
	}
	
	const createVideoBlob = (videoUrl: string) => {
		const base64Data = videoUrl.split(",")[1];
		const binary = atob(base64Data);
		const array = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			array[i] = binary.charCodeAt(i);
		}
		return  new Blob([array], {type: `video/${ videoUrl.split('.').pop() ?? 'mp4' }`});
	}

	const handleSave = useCallback(() => {
		if (!aboutText.trim() || video === null) {
			return;
		}
		
		const formData = new FormData();
		formData.append("about", aboutText);
		formData.append("mainPassion", aboutDescription);
		if (video.startsWith('data:video/')) {
			formData.append("video", createVideoBlob(video), filename ?? 'Intro video');
		}

		patchAboutMeProfileInfo(formData)
			.then(onSave)
			.catch(console.error);
	}, [aboutDescription, aboutText, filename, onSave, patchAboutMeProfileInfo, video]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={styles['item']}>
			<AboutMeTextArea label={'Główna zajawka'}
			                 maxSymbols={500}
			                 placeholder={'Wpisz tutaj swoje zajawki..'}
			                 value={aboutText}
			                 onTextChange={setAboutText}/>
			<AboutMeTextArea label={'Opis (opcjonalne)'}
			                 maxSymbols={600}
			                 placeholder={'Wpisz tutaj opis..'}
			                 fontWeight={400}
			                 value={aboutDescription}
			                 onTextChange={setAboutDescription}/>
			<AboutMeVideoModalItem videoUrl={video}
			                       fileName={filename ?? 'Intro video'}
			                       onClick={onVideoEdit}
			                       onDelete={() => setVideo(null)}/>
		</div>
	);
};

export default AboutMeModalItem;