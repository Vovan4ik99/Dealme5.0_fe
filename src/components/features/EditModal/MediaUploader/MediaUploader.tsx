import styles from './MediaUploader.module.scss';
import React, {useEffect, useState} from "react";
import CustomDivider from "@ui/CustomDivider/CustomDivider.tsx";
import {useDropzone} from "react-dropzone";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import upload_icon from "@icons/freelancer_profile/upload_icon.svg";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import MediaCropper from "../MediaCropper/MediaCropper.tsx";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import success_icon from "@icons/alert/success_icon.svg";
import {IMediaUploaderProps} from "./mediaUploaderTypes.ts";

const MediaUploader: React.FC<IMediaUploaderProps> = ({ text, registerOnSave, aspectRatio, isAvatar }) => {
	const { openModal } = useModal();
	const [mediaSrc, setMediaSrc] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
	const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
	const ACCEPTED_FORMATS = {
		'image/jpeg': ['.jpg', '.jpeg'],
		'image/png': ['.png'],
		'image/webp': ['.webp'],
	};

	const resetState = () => {
		setMediaSrc(null);
		setMediaType(null);
		setFileName(null);
		setError(null);
	};

	const handleCropperClose = () => {
		resetState();
	};

	const handleSave = () => {
		if (!mediaSrc || !mediaType || !fileName) {
			setError('Wybierz plik');
			return;
		}

		openModal({
			id: 'bgImageCrop',
			title: 'Podgląd zdjęcia',
			btnText: 'Dodaj zdjęcie',
			btnWithIcon: true,
			shouldCloseOnSaving: false,
			child: (
				<MediaCropper
					isAvatar={isAvatar}
					mediaSrc={mediaSrc}
					filename={fileName}
					mediaType={mediaType}
					aspect={aspectRatio}
					onClose={handleCropperClose}
				/>
			)
		});
	};

	useEffect(() => {
		registerOnSave!(handleSave);
	});

	const handleDrop = (acceptedFiles: File[]) => {
		setError(null);
		const file = acceptedFiles[0];

		if (!file) return;

		const isImage = file.type.startsWith('image/');
		const isVideo = file.type.startsWith('video/');

		if (isImage && file.size > MAX_IMAGE_SIZE) {
			setError('Maksymalny rozmiar obrazu to 3MB');
			return;
		}

		if (isVideo && file.size > MAX_VIDEO_SIZE) {
			setError('Maksymalny rozmiar wideo to 10MB');
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setMediaSrc(reader.result as string);
			setMediaType(isImage ? 'image' : 'video');
			setFileName(file.name);
		};
		reader.readAsDataURL(file);
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: ACCEPTED_FORMATS,
		onDrop: handleDrop,
		onDropRejected: () => setError('Niepoprawny format pliku'),
	});

	return (
		<>
			<div className={styles['uploader']}>
				<div className={styles['uploader__content']} {...getRootProps()}>
					<input {...getInputProps()} />
					<img src={upload_icon} alt="media-uploader" />
					<p className={styles['uploader__text']}>Przeciągnij i upuść plik tutaj aby dodać</p>
					<CustomDivider />
					<button className="btn btn--more btn--uploader">Wybierz z dysku</button>
				</div>

				<div className={styles['uploader__info']}>
					<div className={styles['uploader__icon']}>
						<InfoIcon />
					</div>
					{text}
				</div>
			</div>

			{fileName && (
				<div className={styles['uploader__choice']}>
					<img src={success_icon} alt="success file loading" />
					<span>{fileName}</span>
				</div>
			)}

			{error && <AlertItem text={error} kind="error" />}
		</>
	);
};

export default MediaUploader;

