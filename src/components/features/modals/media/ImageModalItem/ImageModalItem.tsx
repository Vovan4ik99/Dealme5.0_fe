import React, { useCallback, useContext, useEffect, useState } from "react";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { IImageModalItemProps } from "./imageModalItemTypes.ts";
import styles from "./ImageModalItem.module.scss";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "../MediaUploader/MediaUploader.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { parseBase64Image } from "@utils/imageUtils.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import { useFreelancerAvatarService } from "@services/freelancer/freelancerAvatarService.ts";

const ImageModalItem: React.FC<IImageModalItemProps> = ({
	                                                        title,
	                                                        imageSize,
	                                                        emptyState,
	                                                        isAvatar,
	                                                        onDelete,
	                                                        onSave,
	                                                        registerOnSave,
                                                        }) => {
	const { user } = useContext(AuthContext);

	const { openModal } = useModal();

	const { getBackgroundPicture } = useFreelancerProfileService();
	const { getAvatar } = useFreelancerAvatarService();

	const [ isDeleted, setIsDeleted ] = useState(false);
	const [ imageBlob, setImageBlob ] = useState<Blob | null>(null);
	const [ imageFileName, setImageFileName ] = useState<string | null>(null);

	const fetchAvatar = useCallback(() => {
		getAvatar(user!.id)
			.then(res => {
				if (res) {
					const parsedUserAvatar = parseBase64Image(res.pictureData, 'awatar');
					setImageBlob(parsedUserAvatar.blob);
					setImageFileName(parsedUserAvatar.filename);
				}
			})
			.catch(console.error);
	}, [ user, getAvatar ]);

	const getBgImage = useCallback(() => {
		getBackgroundPicture(user!.id)
			.then(response => {
				const parsedImage =
					parseBase64Image(response?.pictureData ?? null, 'bg-image');
				setImageBlob(parsedImage.blob);
				setImageFileName(parsedImage.filename);
			}).catch(console.error);
	}, [ getBackgroundPicture, user ]);

	useEffect(() => {
		if (isAvatar) {
			fetchAvatar();
			return;
		}
		getBgImage();
	}, [ fetchAvatar, getBgImage, isAvatar ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	});

	const handleSave = () => {
		if (isDeleted) {
			onDelete();
		} else if (imageBlob && imageFileName) {
			onSave(imageBlob, imageFileName);
		}
	};

	const handleDelete = () => {
		setIsDeleted(true);
		setImageBlob(null);
		setImageFileName(null);
	};

	const onImageAdd = (avatarBlob: Blob, filename: string) => {
		setImageBlob(avatarBlob);
		setImageFileName(filename);
	};

	const handleEditModalOpen = () => {
		openModal({
			id: "MediaUploaderModal",
			title,
			btnText: "Wybierz zdjęcie",
			btnWithIcon: false,
			shouldCloseOnSaving: false,
			withSaveBtn: true,
			child: <MediaUploader
				mediaType={ 'image' }
				text={ `Zalecany rozmiar: ${ imageSize }\nAkceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB` }
				aspectRatio={ isAvatar ? 1 : 1320 / 250 }
				onImageAdd={ onImageAdd }
				isAvatar={ true }/>
		});
	};

	return (
		<div className={ styles["item"] }>
			<h2 className={ styles["item__title"] }>{ title } (opcjonalne)</h2>
			<p className={ styles["item__text"] }>{ imageFileName }</p>
			<div className={ `${ styles["item__img"] } ${ isAvatar && styles["item__img--avatar"] }` }>
				<div className={ styles["item__img-wrapper"] }>
					<ActionBtn kind={ "Edit" } onClick={ handleEditModalOpen } backgroundColor={ "lightgray" }
					           withBorder={ false }/>
					<ActionBtn kind={ "Delete" } onClick={ handleDelete } backgroundColor={ "lightgray" }
					           withBorder={ false }/>
				</div>
				{ imageBlob ? (
					<img className={ `${ styles["item__user-img"] } ${ isAvatar && styles["item__user-img--avatar"] }` }
					     src={ URL.createObjectURL(imageBlob) } alt={ isAvatar ? "avatar" : "bg image" }/>
				) : (emptyState) }
			</div>
			<div className={ styles["item__info"] }>
				<InfoIcon/>
				<p>Zalecany rozmiar: { imageSize } <br/>Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB</p>
			</div>
		</div>
	);
}


export default ImageModalItem;