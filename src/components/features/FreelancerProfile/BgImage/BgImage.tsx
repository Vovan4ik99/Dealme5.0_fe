import React, {useEffect, useState} from "react";
import styles from "./BgImage.module.scss";
import {useFreelancerProfileService} from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";
import BgEmptyState from "./BgEmptyState/BgEmptyState.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import BgImageModalItem from "../../EditModal/BgImageModalItem/BgImageModalItem.tsx";

const BgImage = () => {
	const { openModal } = useModal();
	const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
	const { patchBackgroundPicture, getBackgroundPicture, loadingStatus } = useFreelancerProfileService();


	const fetchBackgroundImage = () => {
		getBackgroundPicture()
			.then((response) => setBackgroundImage(response.pictureData))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (!backgroundImage) {
			fetchBackgroundImage();
		}
	});

	const openEditModal = () => {
		openModal({
			id: 'bgImageEdit',
			title: 'Edytuj zdjęcie w tle',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			payload: { blob: null, filename: null },
			child: <BgImageModalItem onSave={handleSaveBackground} />
		});
	};

	const handleSaveBackground = async (imageBlob: Blob, filename: string) => {
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
