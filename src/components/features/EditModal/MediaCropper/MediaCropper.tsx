import React, {useEffect, useState} from "react";
import {IMediaCropperProps} from "./mediaCropperTypes.ts";
import styles from './MediaCropper.module.scss';
import Cropper, {Area} from "react-easy-crop";
import {useModal} from "@context/ModalContext/ModalContext.ts";

const MediaCropper: React.FC<IMediaCropperProps> = ({
	                                                    mediaType,
	                                                    mediaSrc,
	                                                    onClose,
	                                                    aspect,
	                                                    registerOnSave,
	                                                    filename
                                                    }) => {
	const BASE_CROP_AREA_WIDTH = 504
	const INITIAL_CROP = { x: 0, y: 0 };

	const [crop, setCrop] = useState(INITIAL_CROP);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const { closeModals, updateModalData } = useModal();

	const calculateCropDimensions = (
		pixelCrop: Area,
		image: HTMLImageElement,
		zoom: number
	) => {
		const { naturalWidth, naturalHeight } = image;
		const effectiveZoom = zoom || 1;
		return {
			cropX: (pixelCrop.x / 100) * (naturalWidth / effectiveZoom),
			cropY: (pixelCrop.y / 100) * (naturalHeight / effectiveZoom),
			cropWidth: (pixelCrop.width / 100) * (naturalWidth / effectiveZoom),
			cropHeight: (pixelCrop.height / 100) * (naturalHeight / effectiveZoom),
		};
	};

	const onCropComplete = (croppedAreaPixels: Area) => {
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

		const { cropX, cropY, cropWidth, cropHeight } = calculateCropDimensions(
			pixelCrop,
			image,
			zoom
		);

		canvas.width = cropWidth;
		canvas.height = cropHeight;

		ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

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

		try {
			const croppedBlob = await getCroppedImg(mediaSrc, croppedAreaPixels);
			closeModals(2);
			updateModalData('bgImageEdit', {
				filename,
				blob: croppedBlob,
			});
		} catch (error) {
			console.error('Error cropping image:', error);
		}
	};

	useEffect(() => {
		if (!registerOnSave) {
			console.error('registerOnSave is not defined');
			return;
		}
		registerOnSave(handleSave);
		return () => onClose();
	});

	const renderCropper = () => (
		<div className={styles['modal']}>
			<Cropper
				image={mediaSrc}
				crop={crop}
				zoom={zoom}
				aspect={aspect}
				onCropChange={setCrop}
				onZoomChange={setZoom}
				onCropComplete={onCropComplete}
				minZoom={1}
				maxZoom={3}
				showGrid={false}
				cropSize={{
					width: BASE_CROP_AREA_WIDTH,
					height: BASE_CROP_AREA_WIDTH / aspect,
				}}
				objectFit="cover"
				style={{
					cropAreaStyle: {
						borderRadius: '16px',
					},
				}}
			/>
		</div>
	);

	const renderVideo = () => (
		<video
			controls
			src={mediaSrc}
			style={{
				maxWidth: '100%',
				maxHeight: '400px',
				borderRadius: '8px',
			}}
		/>
	);

	return <>{mediaType === 'image' ? renderCropper() : renderVideo()}</>;
};

export default MediaCropper;