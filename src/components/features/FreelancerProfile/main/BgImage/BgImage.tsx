import React, { useCallback, useEffect, useState } from "react";
import styles from "./BgImage.module.scss";
import { useFreelancerProfileService } from "@services/freelancerProfileService.ts";
import BgEmptyState from "@components/features/FreelancerProfile/main/BgImage/BgEmptyState/BgEmptyState.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import BgEmptyStateImgWrapper
	from "@components/features/FreelancerProfile/main/BgImage/BgEmptyStateImgWrapper/BgEmptyStateImgWrapper.tsx";
import ImageModalItem from "@components/features/EditModal/media/ImageModalItem/ImageModalItem.tsx";

const BgImage = () => {
	const { openModal } = useModal();
	const [ backgroundImage, setBackgroundImage ] = useState<string | null>(null);
	const { patchBackgroundPicture, getBackgroundPicture, deleteBackgroundPicture } = useFreelancerProfileService();

	const fetchBackgroundImage = useCallback(() => {
		getBackgroundPicture()
			.then((response) => response && setBackgroundImage(response.pictureData))
			.catch((error) => console.error(error));
	}, [ getBackgroundPicture ]);

	useEffect(() => {
		fetchBackgroundImage();
	}, [ backgroundImage, fetchBackgroundImage ]);

	const handleDeleteBackground = () => {
		deleteBackgroundPicture()
			.then(() => setBackgroundImage(null))
			.catch((error) => console.error(error));
	};

	const openEditModal = () => {
		openModal({
			id: 'BgImageModalItem',
			title: 'Edytuj zdjęcie w tle',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			child: (
				<ImageModalItem title={ 'Zdjęcie w tle' }
				                imageSize="1320x250px"
				                emptyState={ <BgEmptyStateImgWrapper/> }
				                isAvatar={ false }
				                onSave={ handleSaveBackground }
				                onDelete={ handleDeleteBackground }/>
			),
		});
	};

	const handleSaveBackground = (imageBlob: Blob, filename: string) => {
		const formData = new FormData();
		formData.append("file", imageBlob, filename);
		patchBackgroundPicture(formData)
			.then(() => fetchBackgroundImage())
			.catch((error) => console.error(error));
	};

	return (
		<section className={ styles["bg-image"] }>
			{ backgroundImage ? (
				<img src={ backgroundImage } alt="Background" className={ styles["bg-image__img"] }/>
			) : (
				<BgEmptyState onEditClick={ openEditModal }/>
			) }
			<div className={ styles['bg-image__icon'] }>
				<ActionBtn
					onClick={ openEditModal }
					kind={ 'Edit' }
					backgroundColor={ backgroundImage ? 'lightgray' : 'transparent' }
					withBorder={ true }
				/>
			</div>
		</section>
	);
};

export default BgImage;
