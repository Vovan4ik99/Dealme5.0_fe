import { useVideoService } from "@services/videoService.ts";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddVideoModalItem.module.scss";
import VideoModalItem from "@components/features/EditModal/video/VideoModalItem/VideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/EditModal/media/MediaUploader/MediaUploader.tsx";
import {
	IAddVideoModalItemForm,
	IAddVideoModalItemProps
} from "@components/features/EditModal/video/AddVideoModalItem/addVideoModalItemTypes.ts";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import React, { useEffect } from "react";
import { createVideoBlob } from "@utils/videoUtils.ts";
import InputError from "@ui/InputError/InputError.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { IPatchVideoRequest } from "@shared/freelancerTypes.ts";

const AddVideoModalItem: React.FC<IAddVideoModalItemProps> = ({
	                                                              registerOnSave,
	                                                              onSave,
	                                                              handleClose,
	                                                              video,
	                                                              filename,
	                                                              title,
	                                                              isEdit,
	                                                              videoId
                                                              }) => {

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<IAddVideoModalItemForm>({
		shouldFocusError: false,
		mode: 'onSubmit',
		defaultValues: {
			video: { filename, file: video },
			title: title
		},
	});

	const { openModal } = useModal();
	const { addFreelancerVideo, patchFreelancerVideo, loadingStatus } = useVideoService();

	const handleVideoUpload = (
		onChange: (value: { filename: string, file: string }) => void
	) => {
		openModal({
			id: 'VideoMediaUploader',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj video',
			btnWithIcon: true,
			child: (
				<MediaUploader
					mediaType={ 'video' }
					onVideoAdd={ (videoUrl: string, filename: string,) => {
						onChange({ filename, file: videoUrl });
					} }
					text={ 'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB' }
				/>
			),
		});
	};

	const handlePostSave = handleSubmit(async (data) => {
		if (!data.video?.file || !data?.title || data.title?.trim().length <= 0) {
			return;
		}
		const { video, title } = data;
		const formData = new FormData();
		if (video.file?.startsWith('data:video/')) {
			formData.append("file", createVideoBlob(video.file), video.filename ?? 'My video');
		}
		formData.append("title", title);
		formData.append("description", ""); //TODO waiting fix from backend

		addFreelancerVideo(formData)
			.then(() => {
				onSave();
				handleClose!(); //handle closing manually to control form
			}).catch(console.error);
	});

	const handleEditSave = handleSubmit(async (data) => {
		if (!isEdit) {
			return;
		}
		if (!data?.title || data.title?.trim().length <= 0) {
			return;
		}
		const request: IPatchVideoRequest = { title: data.title, description: '' }; //TODO waiting fix from backend
		patchFreelancerVideo(videoId, request)
			.then(() => {
				onSave();
				handleClose!();
			}).catch(console.error);
	});

	const renderVideo = (
		value: IAddVideoModalItemForm['video'],
		onChange: (value: IAddVideoModalItemForm['video']) => void
	) => {
		if (isEdit) {
			return <VideoModalItem label={ 'Wideo' }
			                       emptyStateText={ 'Nagraj krótkie video' }
			                       videoUrl={ value?.file ?? null }
			                       fileName={ value?.filename ?? '' }/>
		}
		return <VideoModalItem withDelete={ true }
		                       label={ 'Wideo' }
		                       emptyStateText={ 'Nagraj krótkie video' }
		                       onClick={ () => handleVideoUpload(onChange) }
		                       videoUrl={ value?.file ?? null }
		                       fileName={ value?.filename ?? '' }
		                       onDelete={ () => onChange({ filename: null, file: null }) }/>
	};

	useEffect(() => {
		registerOnSave!(isEdit ? handleEditSave : handlePostSave);
	}, [handleEditSave, handlePostSave, isEdit, registerOnSave]);

	if (loadingStatus === 'loading') {
		return <div className={ styles['modal'] }>
			<LoadingSpinner/>
		</div>;
	}

	return (
		<div className={ styles['modal'] }>
			<div>
				<Controller
					name="video"
					control={ control }
					rules={ {
						required: "Dodaj video",
					} }
					render={ ({ field: { value, onChange } }) => (
						<div id={ 'video' }
						     className={ `${ styles['modal__video'] } ${ errors.video && styles['modal__video--error'] }` }>
							{ renderVideo(value, onChange) }
						</div>
					) }
				/>
				{ errors.video?.message && <InputError key={ errors.video.message } text={ errors.video?.message }/> }
			</div>
			<CustomInput preset={ 'videoTitle' }
			             register={ register }
			             errorMessage={ errors.title?.message }/>
		</div>

	);
};

export default AddVideoModalItem;