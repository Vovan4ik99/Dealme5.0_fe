import styles from './FreelancerVideos.module.scss';
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { useFreelancerVideoService } from "@services/freelancer/freelancerVideoService.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import AddVideoModalItem from "@components/features/EditModal/video/AddVideoModalItem/AddVideoModalItem.tsx";
import VideoProfileItem
	from "@components/features/FreelancerProfile/main/FreelancerVideos/VideoProfileItem/VideoProfileItem.tsx";
import EditVideosModalItem from "@components/features/EditModal/video/EditVideosModalItem/EditVideosModalItem.tsx";
import { IFreelancerVideo } from "@shared/freelancer/video.ts";
import {
	IFreelancerVideosProps
} from "@components/features/FreelancerProfile/main/FreelancerVideos/freelancerVideosTypes.ts";

const FreelancerVideos: React.FC<IFreelancerVideosProps> = ({ isLoggedUserProfile, freelancerId }) => {

	const SECTION_ID: NavbarSectionKey = 'videos';

	const { getFreelancerVideos } = useFreelancerVideoService();
	const { openModal } = useModal();

	const [ videos, setVideos ] = useState<IFreelancerVideo[]>([]);
	const [ currentIndex, setCurrentIndex ] = useState<number>(0);

	const itemRefs = useRef<HTMLDivElement[]>([]);

	const fetchVideos = useCallback(() => {
		getFreelancerVideos(freelancerId)
			.then(setVideos)
			.catch(console.error);
	}, [ freelancerId, getFreelancerVideos ]);

	useEffect(() => {
		fetchVideos();
	}, [ fetchVideos ]);

	const handleNavigateClick = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handleAddVideos = () => {
		openModal({
			id: 'AddVideoModalItem',
			title: 'Dodaj wideo',
			withSaveBtn: true,
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			btnWithIcon: true,
			child: <AddVideoModalItem onSave={ onSave }/>
		});
	};

	const handleEditVideos = () => {
		openModal({
			id: 'EditVideosModalItem',
			title: 'Edytuj widea',
			child: <EditVideosModalItem/>,
			withSaveBtn: false,
			onClose: () => fetchVideos(),
		});
	};

	const handleEditVideo = (
		videoId: number, videoUrl: string, title: string, filename: string
	) => {
		openModal({
			id: 'EditVideoModalItem',
			title: 'Edytuj wideo',
			withSaveBtn: true,
			shouldCloseOnSaving: false,
			btnWithIcon: false,
			btnText: 'Zapisz zmiany',
			child: <AddVideoModalItem onSave={ onSave }
			                          videoId={ videoId }
			                          key={ 'EditVideoModalItem' }
			                          video={ videoUrl }
			                          isEdit={ true }
			                          title={ title }
			                          filename={ filename }/>
		});
	};

	const onSave = () => {
		fetchVideos();
	};

	const renderVideos = () => {
		if (videos.length <= 0) {
			const text = isLoggedUserProfile ?
				'Nie dodałeś/aś żadnych wideo' :
				'Nie dodano danych o wideo';
			return <AlertItem kind={ 'neutral' } text={ text }/>
		}

		const videoItems = videos.map((video) => {
			return <div key={ video.id }
			            className={ styles['videos__item'] }
			            ref={ (el) => {
				            if (el) itemRefs.current.push(el);
			            } }>
				<VideoProfileItem key={ video.id }
				                  id={ video.id }
				                  videoUrl={ video.fileUrl }
				                  title={ video.title }
				                  isEditable={ isLoggedUserProfile }
				                  onEdit={ () =>
					                  handleEditVideo(video.id, video.fileUrl, video.title, video.fileName) }
				                  date={ video.date }/>
			</div>;
		});

		return <div className={ styles['videos__inner'] }
		            style={ {
			            transform: `translateX(-${ itemRefs.current[currentIndex]?.offsetLeft ?? 0 }px)`
		            } }>
			{ videoItems }
		</div>
	};

	return (
		<section id={ SECTION_ID } className={ styles['videos'] }>
			<header className={ styles['videos__header'] }>
				<div className={ styles['videos__heading'] }>
					<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
					{ videos.length > 0 &&
                        <div className={ styles['videos__buttons'] }>
                            <ActionBtn kind={ 'Navigate Left' }
                                       key={ 'Left Btn' }
                                       withBorder={ true }
                                       backgroundColor={ 'white' }
                                       disabled={ currentIndex === 0 }
                                       onClick={ () => handleNavigateClick('left') }/>
                            <ActionBtn kind={ 'Navigate Right' }
                                       key={ 'Right Btn' }
                                       withBorder={ true }
                                       backgroundColor={ 'white' }
                                       disabled={ currentIndex >= videos.length - 1 }
                                       onClick={ () => handleNavigateClick('right') }/>
                        </div>
					}
				</div>
				{ isLoggedUserProfile &&
                    <div className={ styles['videos__buttons'] }>
                        <ActionBtn kind={ 'Add' }
                                   key={ 'Add' }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }
                                   onClick={ handleAddVideos }/>
						{ videos.length > 0 &&
                            <ActionBtn kind={ 'Edit' }
                                       key={ 'Edit' }
                                       withBorder={ true }
                                       backgroundColor={ 'white' }
                                       onClick={ handleEditVideos }/>
						}
                    </div>
				}
			</header>
			<div className={ styles['videos__content'] }>
				{ renderVideos() }
			</div>
		</section>
	);
}

export default FreelancerVideos;