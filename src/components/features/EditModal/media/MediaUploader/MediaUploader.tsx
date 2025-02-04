import styles from './MediaUploader.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import CustomDivider from "@ui/CustomDivider/CustomDivider.tsx";
import { useDropzone } from "react-dropzone";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import upload_icon from "@icons/freelancer_profile/upload_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import ImageCropper from "@components/features/EditModal/media/ImageCropper/ImageCropper.tsx";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import success_icon from "@icons/alert/success_icon.svg";
import { IMediaUploaderProps } from "./mediaUploaderTypes.ts";
import VideoPreviewer from "@components/features/EditModal/media/VideoPreviewer/VideoPreviewer.tsx";

const MediaUploader: React.FC<IMediaUploaderProps> = ({
	                                                      text,
	                                                      registerOnSave,
	                                                      onVideoAdd,
	                                                      onImageAdd,
	                                                      aspectRatio = 0,
	                                                      isAvatar = false,
	                                                      mediaType = 'image',
                                                      }) => {
	const { openModal } = useModal();
	const [ mediaSrc, setMediaSrc ] = useState<string | null>(null);
	const [ fileName, setFileName ] = useState<string | null>(null);
	const [ error, setError ] = useState<string | null>(null);

	const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
	const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
	const ACCEPTED_FORMATS = {
		image: {
			'image/jpeg': [ '.jpg', '.jpeg' ],
			'image/png': [ '.png' ],
			'image/webp': [ '.webp' ],
		},
		video: {
			'video/mp4': [ '.mp4' ],
			'video/mov': [ '.mov' ],
			'video/avi': [ '.avi' ]
		}
	};

	const handleUploaderClose = useCallback(() => {
		setMediaSrc(null);
		setFileName(null);
		setError(null);
	}, []);

	const handleVideoAdd = useCallback(() => {
		if (!onVideoAdd) {
			console.error('onVideoAdd is not defined');
			return;
		}
		if (!mediaSrc || !fileName) {
			return;
		}
		onVideoAdd(mediaSrc, fileName);
		handleUploaderClose();
	}, [ fileName, handleUploaderClose, mediaSrc, onVideoAdd ]);

	const handleSave = useCallback(() => {
		if (!mediaSrc || !mediaType || !fileName) {
			setError('Wybierz plik');
			return;
		}

		let child = <VideoPreviewer videoUrl={ mediaSrc } onClose={ handleVideoAdd }/>;

		if (mediaType === 'image' && onImageAdd) {
			child = <ImageCropper
				onSave={ onImageAdd }
				isAvatar={ isAvatar }
				mediaSrc={ mediaSrc }
				filename={ fileName }
				aspect={ aspectRatio }
				onClose={ handleUploaderClose }
			/>;
		}

		openModal({
			id: `${ mediaType }ModalItem`,
			title: `Podgląd ${ mediaType === 'image' ? 'zdjęcia' : 'wideo' }`,
			btnText: `Dodaj ${ mediaType === 'image' ? 'zdjęcie' : 'wideo' }`,
			btnWithIcon: true,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			child: child
		});
	}, [ aspectRatio, fileName, handleUploaderClose, handleVideoAdd, isAvatar, mediaSrc, mediaType, onImageAdd, openModal ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

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
			setFileName(file.name);
		};
		reader.readAsDataURL(file);
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: ACCEPTED_FORMATS[mediaType],
		onDrop: handleDrop,
		onDropRejected: () => setError('Niepoprawny format pliku'),
	});

	return (
		<>
			<div className={ styles['uploader'] }>
				<div className={ styles['uploader__content'] } { ...getRootProps() }>
					<input { ...getInputProps() } />
					<img src={ upload_icon } alt="media-uploader"/>
					<p className={ styles['uploader__text'] }>Przeciągnij i upuść plik tutaj aby dodać</p>
					<CustomDivider/>
					<button className="btn btn--more btn--uploader">Wybierz z dysku</button>
				</div>

				<div className={ styles['uploader__info'] }>
					<div className={ styles['uploader__icon'] }>
						<InfoIcon/>
					</div>
					{ text }
				</div>
			</div>

			{ fileName && (
				<div className={ styles['uploader__choice'] }>
					<img src={ success_icon } alt="success file loading"/>
					<span>{ fileName }</span>
				</div>
			) }

			{ error && <AlertItem text={ error } kind="error" hasMarginTop={ true }/> }
		</>
	);
};

export default MediaUploader;

