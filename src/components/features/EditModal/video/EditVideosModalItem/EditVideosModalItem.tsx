import styles from './EditVideosModalItem.module.scss';
import { useFreelancerVideoService } from "@services/freelancer/freelancerVideoService.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import VideoEditModalItem from "@components/features/EditModal/video/VideoEditModalItem/VideoEditModalItem.tsx";
import AddVideoModalItem from "@components/features/EditModal/video/AddVideoModalItem/AddVideoModalItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { IFreelancerVideo } from "@shared/freelancer/video.ts";

const EditVideosModalItem = () => {

	const { user } = useContext(AuthContext);
	const { getFreelancerVideos, deleteFreelancerVideo, loadingStatus } = useFreelancerVideoService();
	const { openModal } = useModal();

	const [ videos, setVideos ] = useState<IFreelancerVideo[]>([]);

	const fetchVideos = useCallback(() => {
		if (!user) return;

		getFreelancerVideos(user.id)
			.then(setVideos)
			.catch(console.error);
	}, [ getFreelancerVideos, user ]);

	useEffect(() => {
		fetchVideos();
	}, [ fetchVideos ]);

	const handleDeleteVideo = (id: number) => {
		deleteFreelancerVideo(id)
			.then(() => deleteVideo(id))
			.catch(console.error);
	};

	const deleteVideo = (id: number) => {
		setVideos(prevState => prevState.filter(v => v.id !== id));
	};

	const handleEditVideo = (video: IFreelancerVideo) => {
		openModal({
			id: 'EditVideoModalItem',
			title: 'Edytuj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Zapisz zmiany',
			withSaveBtn: true,
			btnWithIcon: false,
			child: <AddVideoModalItem onSave={ fetchVideos }
			                          videoId={ video.id }
			                          key={ 'EditVideoModalItem' }
			                          video={ video.fileUrl }
			                          isEdit={ true }
			                          title={ video.title }
			                          filename={ video.fileName }/>
		});
	};

	const handleAddVideos = () => {
		openModal({
			id: 'AddVideoModalItem',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			withSaveBtn: true,
			btnWithIcon: true,
			child: <AddVideoModalItem onSave={ fetchVideos }/>
		})
	};

	const renderVideos = () => {
		return videos.map(video => {
			return <VideoEditModalItem key={ video.id }
			                           videoUrl={ video.fileUrl }
			                           title={ video.title }
			                           dateOfObtaining={ video.date }
			                           onEdit={ () => handleEditVideo(video) }
			                           onDelete={ () => handleDeleteVideo(video.id) }/>
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['modal'] }>
			<div className={ styles['modal__content'] }>
				{ renderVideos() }
			</div>
			<button className={ 'btn btn--modal' } onClick={ handleAddVideos }>
				<AddIcon/>
				<span>Dodaj kolejne wideo</span>
			</button>
		</div>
	);
}

export default EditVideosModalItem;