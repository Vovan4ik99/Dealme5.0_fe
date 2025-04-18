import styles from './MediaUploader.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import CustomDivider from "@ui/common/CustomDivider/CustomDivider.tsx";
import { useDropzone } from "react-dropzone";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { ReactComponent as UploadIcon } from "@icons/named_exported/upload_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import ImageCropper from "@components/features/modals/media/ImageCropper/ImageCropper.tsx";
import success_icon from "@icons/alert/success_icon.svg";
import { MediaUploaderProps } from "./mediaUploaderTypes.ts";
import VideoPreviewer from "@components/features/modals/media/VideoPreviewer/VideoPreviewer.tsx";
import { parseBase64Image } from "@utils/imageUtils.ts";
import InputError from "@ui/form/InputError/InputError.tsx";

const MediaUploader: React.FC<MediaUploaderProps> = ({
	                                                     text,
	                                                     registerOnSave,
	                                                     onVideoAdd,
	                                                     onImageAdd,
	                                                     aspectRatio = 0,
	                                                     isAvatar = false,
	                                                     mediaType,
	                                                     isPortfolioImage,
                                                     }) => {
	const { openModal } = useModal();

	const [ mediaSrc, setMediaSrc ] = useState<string | null>(null);
	const [ fileName, setFileName ] = useState<string | null>(null);
	const [ error, setError ] = useState<string | null>(null);

	const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
	const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
	const ACCEPTED_FORMATS = {
		image: {
			'image/jpeg': [ '.jpg', '.jpeg' ],
			'image/png': [ '.png' ],
			'image/webp': [ '.webp' ],
		},
		video: {
			'video/mp4': [ '.mp4' ],
			'video/mov': [ '.mov' ],
			'video/avi': [ '.avi' ],
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

	const onPortfolioImageAdd = useCallback((
		onImageAdd: (image: Blob, filename: string) => void
	) => {
		const parsedImage = parseBase64Image(mediaSrc, fileName ?? undefined);

		if (!parsedImage.blob) {
			setError('Wybierz plik');
			return;
		}

		onImageAdd(parsedImage.blob, parsedImage.filename);
	}, [ fileName, mediaSrc ]);

	const handleSave = useCallback(() => {
		if (!mediaSrc || !mediaType || !fileName) {
			setError('Wybierz plik');
			return;
		}

		if (isPortfolioImage) {
			onPortfolioImageAdd(onImageAdd);
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
	}, [ aspectRatio, fileName, handleUploaderClose, handleVideoAdd, isAvatar, isPortfolioImage, mediaSrc, mediaType,
		onImageAdd, onPortfolioImageAdd, openModal ]);

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
			setError('Maksymalny rozmiar wideo to 50MB');
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			setMediaSrc(reader.result as string);
			setFileName(file.name);
		};
		reader.readAsDataURL(file);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: ACCEPTED_FORMATS[mediaType],
		onDrop: handleDrop,
		onDropRejected: () => setError('Niepoprawny format pliku'),
	});

	return (
		<>
			<div className={ `${ styles['uploader'] }  
						 	  ${ error && styles['uploader--error']}
						 	  ${ isDragActive && styles['uploader--drag']}` }>
				<div className={` ${ styles['uploader__content'] } `}
					 { ...getRootProps() }>
					<input { ...getInputProps() } />
					<UploadIcon />
					{ !isDragActive ? (
						<div className={ styles['uploader__prompt'] }>
							<p className={ styles['uploader__text'] }>Przeciągnij i upuść plik tutaj aby dodać</p>
							<CustomDivider/>
							<button className="btn btn--more btn--uploader">Wybierz z dysku</button>
						</div>
					) : (
							<p className={ styles['uploader__text'] }>Upuść plik tutaj aby dodać</p>
					)}
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

			{ error && <InputError text={ error } /> }
		</>
	);
};

export default MediaUploader;

