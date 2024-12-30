import styles from './BgImageModalItem.module.scss';
import React, {useEffect} from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import MediaUploader from "../MediaUploader/MediaUploader.tsx";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import {BgImageEditPayload} from "@shared/modalPayloadTypes.ts";
import BgEmptyStateImgWrapper from "../../FreelancerProfile/BgImage/BgEmptyStateImgWrapper/BgEmptyStateImgWrapper.tsx";
import {IBgImageModalItemProps} from "./bgImageModalItemTypes.ts";

const BgImageModalItem: React.FC<IBgImageModalItemProps> = ({registerOnSave, onSave}) => {
	const { modals, openModal, closeModals } = useModal();

	// Find modals with type assertion for payload
	const modal = modals.find(
		(modal) => modal.id === "bgImageEdit"
	) as { payload: BgImageEditPayload };

	const handleSave = () => {
		if (!modal.payload.blob || !modal.payload.filename) return;
		onSave(modal.payload.blob, modal.payload.filename);
		closeModals(1);
	}

	useEffect(() => {
		if (!registerOnSave) {
			console.error('registerOnSave is not defined');
			return;
		}
		registerOnSave(handleSave);
	});

	const handleEditModalOpen = () => {
		openModal({
			id: "bgImageUpload",
			title: "Dodaj zdjęcie w tle",
			btnText: "Wybierz zdjęcie",
			btnWithIcon: false,
			child: (
				<MediaUploader
					text={
						"Zalecany rozmiar: 1320x250px.\nAkceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB"
					}
				/>
			),
		});
	};

	const renderImageSection = () => (
		<div className={styles["item__img"]}>
			<div className={styles["item__img-wrapper"]}>
				<ActionBtn
					kind={"Edit"}
					backgroundColor={"lightgray"}
					withBorder={false}
					onClick={handleEditModalOpen}
				/>
				<ActionBtn
					kind={"Delete"}
					backgroundColor={"lightgray"}
					withBorder={false}
					onClick={handleEditModalOpen}
				/>
			</div>
			{modal.payload.blob ? (
				<img src={URL.createObjectURL(modal.payload.blob)} alt="user bg" />
			) : (
				<BgEmptyStateImgWrapper />
			)}
		</div>
	);

	const renderInfoSection = () => (
		<div className={styles["item__info"]}>
			<InfoIcon />
			<p>
				Zalecany rozmiar: 1320x250px.<br />
				Akceptowalne formaty: JPG, PNG, WEBP, rozmiar: do 3MB
			</p>
		</div>
	);

	return (
		<div className={styles["item"]}>
			<h2 className={styles["item__title"]}>
				Zdjęcie w tle (opcjonalnie)
			</h2>
			<p className={styles["item__text"]}>{modal.payload.filename}</p>
			{renderImageSection()}
			{renderInfoSection()}
		</div>
	);
};

export default BgImageModalItem;