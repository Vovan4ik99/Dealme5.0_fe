import styles from './Avatar.module.scss';
import { ReactComponent as LogoIcon } from '@icons/named_exported/logo_icon.svg';
import React, {useEffect, useState} from "react";
import AvatarEmptyState from "@components/features/FreelancerProfile/main/Avatar/AvatarEmptyState/AvatarEmptyState.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import ImageModalItem from "@components/features/EditModal/media/ImageModalItem/ImageModalItem.tsx";
import {useAvatarService} from "@services/avatarService.ts";
import {EMITTER_EVENTS, publishEvent, useEventEmitter} from "@hooks/emmiter.hook";



const Avatar = () => {
	const { openModal } = useModal();

	const { patchAvatar, deleteAvatar, getAvatar } = useAvatarService();

	const [userAvatar, setAvatar] = useState<string | null>(null);

	useEffect(() => {
		getAvatar().then((res) => {
			if ( res )
				setAvatar(res.picture);
			else
				setAvatar(null);
		});
	},[getAvatar]);

	useEventEmitter<string>(EMITTER_EVENTS[0], (newPicture) =>{
		if(newPicture == null) {
			setAvatar(null);
			return;
		}

		getAvatar().then(({ picture }) => {
			if (picture)
				setAvatar(picture);
		})
	})

	const handleAvatarEdit = () => {
		openModal({
			id: 'ImageModalItem',
			title: 'Edytuj awatar',
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			shouldCloseOnSaving: true,
			withSaveBtn: true,
			child: (
				<ImageModalItem title={ 'Awatar' }
				                imageSize="512x512px"
				                emptyState={ <AvatarEmptyState/> }
				                isAvatar={ true }
				                onSave={ handleSaveAvatar }
				                onDelete={ handleDeleteAvatar }/>
			),
		});
	};

	const handleDeleteAvatar = () => {
		deleteAvatar().then(() => publishEvent(EMITTER_EVENTS[0], null));
	};

	const handleSaveAvatar = (imageBlob: Blob, filename: string) => {
		const formData = new FormData();
		formData.append("file", imageBlob, filename);

		patchAvatar(formData).then(() => publishEvent(EMITTER_EVENTS[0], "newPicture"));
	};

	return (
		<div className={ `${ styles['avatar'] } ${ !userAvatar && styles['avatar--empty'] }` }>
			<div className={ styles['avatar__icon'] }>
				<ActionBtn kind={ 'Edit' }
				           onClick={ handleAvatarEdit }
				           withBorder={ userAvatar === null }
				           backgroundColor={ userAvatar ? 'lightgray' : 'white' }/>
			</div>
			{ userAvatar ?
				<>
					<img className={ styles['avatar__img'] } src={ userAvatar } alt={ 'avatar' }/>
					<div className={ styles['avatar__logo'] }>
						<LogoIcon/>
					</div>
				</> :
				<button className={ styles['avatar__btn'] } onClick={ handleAvatarEdit }>
					<AvatarEmptyState/>
				</button>
			}
		</div>
	)
}

export default Avatar;