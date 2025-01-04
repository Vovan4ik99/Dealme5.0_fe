import React, {useCallback, useEffect, useState} from "react";
import styles from "./BgImage.module.scss";
import {useFreelancerProfileService} from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";
import BgEmptyState from "./BgEmptyState/BgEmptyState.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import {parseBase64Image} from "@utils/imageUtils.ts";
import BgEmptyStateImgWrapper from "./BgEmptyStateImgWrapper/BgEmptyStateImgWrapper.tsx";
import ImageModalItem from "../../EditModal/ImageModalItem/ImageModalItem.tsx";

const BgImage = () => {
	const { openModal } = useModal();
	const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
	const { patchBackgroundPicture, getBackgroundPicture, deleteBackgroundPicture, loadingStatus } = useFreelancerProfileService();

	const fetchBackgroundImage = useCallback(() => {
		getBackgroundPicture()
			.then((response) => setBackgroundImage(response.pictureData))
			.catch((error) => console.error(error));
	}, [getBackgroundPicture]);

	useEffect(() => {
		fetchBackgroundImage();
	}, [backgroundImage, fetchBackgroundImage]);

	const handleDeleteBackground = () => {
		deleteBackgroundPicture()
			.then(() => setBackgroundImage(null))
			.catch((error) => console.error(error));
	}

	const openEditModal = () => {
		openModal({
			id: 'imageEdit',
			title: 'Edytuj zdjęcie w tle',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			payload: parseBase64Image(backgroundImage, 'background_image'),
			shouldCloseOnSaving: true,
			child: (
				<ImageModalItem title={'Zdjęcie w tle'}
				                imageSize="1320x250px"
				                emptyState={<BgEmptyStateImgWrapper />}
				                isAvatar={false}
				                onSave={handleSaveBackground}
				                onDelete={handleDeleteBackground}/>
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

	// Conditional rendering simplification for loading and content
	if (loadingStatus === "loading") {
		return <LoadingSpinner />;
	}

	return (
		<section className={styles["bg-image"]}>
			{backgroundImage ? (
				<img src={backgroundImage} alt="Background" className={styles["bg-image__img"]} />
			) : (
				<BgEmptyState onEditClick={openEditModal} />
			)}
			<div className={styles['bg-image__icon']}>
				<ActionBtn
					onClick={openEditModal}
					kind={'Edit'}
					backgroundColor={backgroundImage ? 'lightgray' : 'transparent'}
					withBorder={true}
				/>
			</div>
		</section>
	);
};

export default BgImage;
