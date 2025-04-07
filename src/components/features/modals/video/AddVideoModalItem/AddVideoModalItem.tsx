import { useFreelancerVideoService } from "@services/freelancer/freelancerVideoService.ts";
import { useForm } from "react-hook-form";
import styles from "./AddVideoModalItem.module.scss";
import VideoModalItem from "@components/features/modals/video/VideoModalItem/VideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "@components/features/modals/media/MediaUploader/MediaUploader.tsx";
import { IAddVideoModalItemProps } from "./addVideoModalItemTypes.ts";
import CustomInput from "@ui/form/CustomInput/CustomInput.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { createVideoBlob } from "@utils/videoUtils.ts";
import InputError from "@ui/form/InputError/InputError.tsx";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";

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

	const { openModal } = useModal();
	const { addFreelancerVideo, patchFreelancerVideo, loadingStatus } = useFreelancerVideoService();

	const [ videoUrl, setVideoUrl ] = useState<string | null>(video ?? null);
	const [ videoFilename, setVideoFilename ] = useState<string | null>(filename ?? null);
	const [ videoError, setVideoError ] = useState<string | null>(null);

	const { register, handleSubmit, formState: { errors } } = useForm<{ title: string | null }>({
		shouldFocusError: false,
		mode: 'onTouched',
		defaultValues: {
			title: title,
		}
	});

	const onVideoAdd = (videoUrl: string, filename: string) => {
		setVideoUrl(videoUrl);
		setVideoFilename(filename);
		setVideoError(null);
	};

	const handleVideoUpload = () => {
		openModal({
			id: 'VideoMediaUploader',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj video',
			btnWithIcon: true,
			withSaveBtn: true,
			child: (
				<MediaUploader
					mediaType={ 'video' }
					onVideoAdd={ onVideoAdd }
					text={ 'Akceptowalne formaty: MP4, MOV, AVI, rozmiar: do 10MB' }
				/>
			),
		});
	};

	const onVideoDelete = () => {
		setVideoUrl(null);
		setVideoFilename(null);
	};

	const handlePostSave = useCallback(() => {
		if (!videoUrl) {
			setVideoError('Dodaj video');
			return;
		}
		handleSubmit((data) => {
			const formData = new FormData();
			if (videoUrl.startsWith('data:video/')) {
				formData.append("file", createVideoBlob(videoUrl), filename ?? 'My video');
			}
			formData.append("title", data.title!);

			addFreelancerVideo(formData)
				.then(() => {
					onSave();
					handleClose!(); //handle closing manually to control form
				}).catch(console.error);
		})();
	}, [ addFreelancerVideo, filename, handleClose, handleSubmit, onSave, videoUrl ]);

	const handleEditSave = handleSubmit((data) => {
		if (!isEdit) {
			return;
		}
		patchFreelancerVideo(videoId, { title: data.title! })
			.then(() => {
				onSave();
				handleClose!(); //handle closing manually to control form
			}).catch(console.error);
	});

	const renderVideo = () => {
		if (isEdit) {
			return <VideoModalItem label={ 'Wideo' }
			                       emptyStateText={ 'Nagraj krótkie video' }
			                       videoUrl={ videoUrl }
			                       fileName={ videoFilename ?? '' }/>
		}
		return <VideoModalItem withDelete={ true }
		                       label={ 'Wideo' }
		                       emptyStateText={ 'Nagraj krótkie video' }
		                       onClick={ handleVideoUpload }
		                       videoUrl={ videoUrl }
		                       fileName={ videoFilename ?? '' }
		                       onDelete={ onVideoDelete }/>
	};

	useEffect(() => {
		registerOnSave!(isEdit ? handleEditSave : handlePostSave);
	}, [ handleEditSave, handlePostSave, isEdit, registerOnSave ]);

	if (loadingStatus === 'loading') {
		return <div className={ styles['modal'] }>
			<LoadingSpinner/>
		</div>;
	}

	return (
		<div className={ styles['modal'] }>
			<div>
				<div className={ `${ styles['modal__video'] } ${ videoError && styles['modal__video--error'] }` }>
					{ renderVideo() }
				</div>
				{ videoError && <InputError key={ videoError } text={ videoError }/> }
			</div>
			<CustomInput preset={ 'videoTitle' }
			             register={ register }
			             errorMessage={ errors.title?.message }/>
		</div>

	);
};

export default AddVideoModalItem;