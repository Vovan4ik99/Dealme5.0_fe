import React, { useEffect, useState } from "react";
import { IImageCropperProps } from "./imageCropperTypes.ts";
import styles from './ImageCropper.module.scss';
import Cropper, { Area } from "react-easy-crop";
import { useModal } from "@context/ModalContext/ModalContext.ts";

const ImageCropper: React.FC<IImageCropperProps> = ({
	                                                    mediaSrc,
	                                                    onClose,
	                                                    aspect,
	                                                    registerOnSave,
	                                                    filename,
	                                                    isAvatar,
	                                                    onSave
                                                    }) => {
	const INITIAL_CROP = { x: 0, y: 0 };

	const [ crop, setCrop ] = useState(INITIAL_CROP);
	const [ zoom, setZoom ] = useState(1);
	const [ croppedAreaPixels, setCroppedAreaPixels ] = useState<Area | null>(null);

	const { closeModals } = useModal();

	const handleZoomChange = (newZoom: number) => {
		setZoom(newZoom);
	};

	const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const onImageLoad = (
		resolve: (reason?: any) => void,
		reject: (reason?: any) => void,
		image: HTMLImageElement,
		pixelCrop: Area
	) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			reject(new Error('Failed to create canvas context'));
			return;
		}

		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

		canvas.toBlob(
			(blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob from canvas'))),
			filename,
			1
		);
	};

	const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<Blob> =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.src = imageSrc;
			image.onload = () => onImageLoad(resolve, reject, image, pixelCrop);
			image.onerror = (error) => reject(error);
		});

	const handleSave = async () => {
		if (!croppedAreaPixels || !mediaSrc) return;
		getCroppedImg(mediaSrc, croppedAreaPixels)
			.then((blob) => {
				onSave(blob, filename);
				closeModals(2);
			}).catch((error) => console.error('Error cropping image:', error));
	};

	useEffect(() => {
		registerOnSave!(handleSave);
		return () => onClose();
	});

	return (
		<div className={ `${ styles['modal'] }` }>
			<div className={ `${ styles['modal__cropper'] } ${ isAvatar && styles['modal__cropper--avatar'] }` }>
				<Cropper
					image={ mediaSrc }
					crop={ crop }
					zoom={ zoom }
					aspect={ aspect }
					onCropChange={ setCrop }
					onZoomChange={ handleZoomChange }
					onCropComplete={ onCropComplete }
					showGrid={ false }
					style={ {
						cropAreaStyle: {
							borderRadius: '16px',
						},
					} }
				/>
			</div>
			<div className={ styles['modal__controls'] }>
				<span>Zoom</span>
				<input type={'range'}
				       value={zoom}
				       min={1}
				       max={3}
				       step={0.1}
				       className={ styles['modal__zoom'] }
				       onChange={e => setZoom(Number(e.target.value))} />
			</div>
		</div>
	);
};

export default ImageCropper;