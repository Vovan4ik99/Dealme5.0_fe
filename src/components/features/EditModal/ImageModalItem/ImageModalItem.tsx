import React, {useEffect, useState} from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {IImageModalItemProps} from "./imageModalItemTypes.ts";
import styles from "./ImageModalItem.module.scss";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import {ImageEditPayload} from "@shared/modalPayloadTypes.ts";
import MediaUploader from "../MediaUploader/MediaUploader.tsx";

const ImageModalItem: React.FC<IImageModalItemProps> = ({title, imageSize, emptyState, isAvatar, onDelete, onSave, 
	                                                        registerOnSave}) => {
	const {modals, openModal} = useModal();
	const [isDeleted, setIsDeleted] = useState(false);

	const modal = modals.find(
		(modal) => modal.id === "imageEdit"
	) as { payload: ImageEditPayload | undefined };

	useEffect(() => {
		if (!registerOnSave) {
			console.error("registerOnSave is not defined");
			return;
		}
		registerOnSave(handleSave);
	});

	const handleSave = () => {
		if (isDeleted) {
			onDelete();
		} else if (modal?.payload?.blob && modal.payload.filename) {
			onSave(modal.payload.blob, modal.payload.filename);
		}
	};

	const handleDelete = () => {
		setIsDeleted(true);
		if (modal?.payload) {
			modal.payload.blob = null;
			modal.payload.filename = null;
		}
	};

	const handleEditModalOpen = () => {
		openModal({
			id: "imageUpload",
			title,
			btnText: "Wybierz zdjęcie",
			btnWithIcon: false,
			child: React.createElement(MediaUploader, {
				text: `Zalecany rozmiar: ${imageSize}\nAkceptowalne форматy: JPG, PNG, WEBP, rozmiar: до 3MB`,
				aspectRatio: isAvatar ? 1 : 1320 / 250,
				isAvatar
			}),
			shouldCloseOnSaving: false
		});
	};

	return (
		<div className={styles["item"]}>
			<h2 className={styles["item__title"]}>{title} (opcjonalne)</h2>
			<p className={styles["item__text"]}>{modal.payload?.filename}</p>
			<div className={`${styles["item__img"]} ${isAvatar && styles["item__img--avatar"]}`}>
				<div className={styles["item__img-wrapper"]}>
					<ActionBtn kind={"Edit"} onClick={handleEditModalOpen} backgroundColor={"lightgray"} withBorder={false}/>
					<ActionBtn kind={"Delete"} onClick={handleDelete} backgroundColor={"lightgray"} withBorder={false}/>
				</div>
				{modal.payload?.blob ? (
					<img className={`${styles["item__user-img"]} ${isAvatar && styles["item__user-img--avatar"]}`}
					     src={URL.createObjectURL(modal.payload?.blob)} alt={isAvatar ? "avatar" : "bg image"}/>
				) : (
					emptyState
				)}
			</div>
			<div className={styles["item__info"]}>
				<InfoIcon/>
				<p>Zalecany rozmiar: {imageSize} <br/>Akceptowalne форматy: JPG, PNG, WEBP, rozmiar: до 3MB</p>
			</div>
		</div>
	);
}


export default ImageModalItem;