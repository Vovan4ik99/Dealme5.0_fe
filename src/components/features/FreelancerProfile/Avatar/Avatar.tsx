import styles from './Avatar.module.scss';
import {ReactComponent as LogoIcon} from '@icons/named_exported/logo_icon.svg';
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import React, {useContext} from "react";
import AvatarEmptyState from "./AvatarEmptyState/AvatarEmptyState.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {parseBase64Image} from "@utils/imageUtils.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import ImageModalItem from "../../EditModal/ImageModalItem/ImageModalItem.tsx";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";

const Avatar = () => {

	const {userAvatar, patchUserAvatar, deleteUserAvatar, loadingStatus} = useContext(AuthContext);
	const {openModal} = useModal();

	const handleAvatarEdit = () => {
		openModal({
			id: 'imageEdit',
			title: 'Edytuj awatar',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			payload: parseBase64Image(userAvatar, 'avatar'),
			shouldCloseOnSaving: true,
			child: (
				<ImageModalItem title={'Awatar'}
				                imageSize="512x512px"
				                emptyState={<AvatarEmptyState/>}
				                isAvatar={true}
				                onSave={handleSaveAvatar}
				                onDelete={handleDeleteAvatar}/>
			),
		});
	};

	const handleDeleteAvatar = () => {
		deleteUserAvatar();
	};

	const handleSaveAvatar = (imageBlob: Blob, filename: string) => {
		const formData = new FormData();
		formData.append("file", imageBlob, filename);
		patchUserAvatar(formData);
	}

	if (loadingStatus === "loading") {
		return <div className={styles['avatar']}>
			<LoadingSpinner/>
		</div>
	}

	return (
		<div className={`${styles['avatar']} ${!userAvatar && styles['avatar--empty']}`}>
			<div className={styles['avatar__icon']}>
				<ActionBtn kind={'Edit'}
				           onClick={handleAvatarEdit}
				           withBorder={userAvatar === null}
				           backgroundColor={userAvatar ? 'lightgray' : 'white'}/>
			</div>
			{userAvatar ?
				<>
					<img className={styles['avatar__img']} src={userAvatar} alt={'avatar'}/>
					<div className={styles['avatar__logo']}>
						<LogoIcon/>
					</div>
				</> :
				<button className={styles['avatar__btn']} onClick={handleAvatarEdit}>
					<AvatarEmptyState/>
				</button>
			}
		</div>
	)
}

export default Avatar;