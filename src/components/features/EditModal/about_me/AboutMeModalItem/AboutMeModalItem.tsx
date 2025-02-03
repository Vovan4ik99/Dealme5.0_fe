import styles from './AboutMeModalItem.module.scss';
import AboutMeTextArea from "@components/features/EditModal/about_me/AboutMeTextArea/AboutMeTextArea.tsx";
import React, { useCallback, useEffect, useState } from "react";
import {
	IAboutMeModalItemProps
} from "@components/features/EditModal/about_me/AboutMeModalItem/aboutMeModalItemTypes.ts";
import { useFreelancerProfileService } from "@services/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import VideoModalItem from "@components/features/EditModal/video/VideoModalItem/VideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";
import { createVideoBlob } from "@utils/videoUtils.ts";

const AboutMeModalItem: React.FC<IAboutMeModalItemProps> = ({ aboutMeInfo, onSave, registerOnSave }) => {

	const [ aboutText, setAboutText ] = useState<string>('');
	const [ aboutDescription, setAboutDescription ] = useState<string>('');
	const [ video, setVideo ] = useState<string | null>(null);
	const [ filename, setFilename ] = useState<string | null>(null);

	const { patchAboutMeProfileInfo, loadingStatus } = useFreelancerProfileService();
	const { openModal } = useModal();

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
	}, [ aboutMeInfo ]);

	const onVideoEdit = () => {
		openModal({
			id: 'MediaUploader',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			btnWithIcon: true,
			child: <MediaUploader onVideoAdd={ onVideoSave }
			                      mediaType={ 'video' }
			                      text={ 'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB' }/>
		})
	}

	const onVideoSave = (videoUrl: string, fileName: string) => {
		setVideo(videoUrl);
		setFilename(fileName);
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
	}, [ aboutDescription, aboutText, filename, onSave, patchAboutMeProfileInfo, video ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['item'] }>
			<AboutMeTextArea label={ 'Główna zajawka' }
			                 maxSymbols={ 500 }
			                 placeholder={ 'Wpisz tutaj swoje zajawki..' }
			                 value={ aboutText }
			                 onTextChange={ setAboutText }/>
			<AboutMeTextArea label={ 'Opis (opcjonalne)' }
			                 maxSymbols={ 600 }
			                 placeholder={ 'Wpisz tutaj opis..' }
			                 fontWeight={ 400 }
			                 value={ aboutDescription }
			                 onTextChange={ setAboutDescription }/>
			<VideoModalItem videoUrl={ video }
			                withDelete={true}
			                label={ 'Wideo (opcjonalne)' }
			                emptyStateText={ 'Nagraj krótkie video o sobie' }
			                fileName={ filename ?? 'Intro video' }
			                onClick={ onVideoEdit }
			                onDelete={ () => setVideo(null) }/>
		</div>
	);
};

export default AboutMeModalItem;