import styles from './FreelancerVideos.module.scss';
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { IFreelancerVideo } from "@shared/freelancerTypes.ts";
import { useVideoService } from "@services/videoService.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import AddVideoModalItem from "@components/features/EditModal/video/AddVideoModalItem/AddVideoModalItem.tsx";
import VideoProfileItem
	from "@components/features/FreelancerProfile/main/FreelancerVideos/VideoProfileItem/VideoProfileItem.tsx";

const FreelancerVideos = () => {

	const SECTION_ID: NavbarSectionKey = 'videos';

	const { user } = useContext(AuthContext);
	const { getFreelancerVideos } = useVideoService();
	const { openModal } = useModal();

	const [ videos, setVideos ] = useState<IFreelancerVideo[]>([]);
	const [ currentIndex, setCurrentIndex ] = useState<number>(0);
	const [ visibleCount, setVisibleCount ] = useState<number>(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

	const fetchVideos = useCallback(() => {
		if (!user) return;
		getFreelancerVideos(user.id)
			.then(setVideos)
			.catch(console.error);
	}, [ getFreelancerVideos, user ]);

	const calculateVisibleCount = useCallback(() => {
		if (!containerRef.current) return;

		const containerWidth = containerRef.current.offsetWidth;
		let totalWidth = 0;
		let count = 0;

		itemRefs.current.forEach((item) => {
			if (item && totalWidth + item.offsetWidth <= containerWidth) {
				totalWidth += item.offsetWidth;
				count++;
			}
		});
		setVisibleCount(count);
	}, []);

	useEffect(() => {
		fetchVideos();
		calculateVisibleCount();
	}, [ calculateVisibleCount, fetchVideos ]);

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
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			btnWithIcon: true,
			child: <AddVideoModalItem onSave={ onSave }/>
		})
	};

	const handleEditVideos = () => {
		openModal({
			id: 'unknown',
			title: 'Edytuj wideo',
			child: <></>
		});
	};

	const handleEditVideo = (
		videoId: number, videoUrl: string, title: string, filename: string
	) => {
		openModal({
			id: 'EditVideoModalItem',
			title: 'Edytuj wideo',
			shouldCloseOnSaving: false,
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
			return <AlertItem kind={ 'neutral' } text={ 'Nie dodałeś/aś żadnych wideo' }/>
		}

		const videoItems = videos.map((video, index) => {
			return <div key={ video.id }
			            className={ styles['videos__item'] }
			            ref={ (el) => {
				            if (el) itemRefs.current.set(index, el);
			            } }>
				<VideoProfileItem key={ video.id }
				                  id={ video.id }
				                  videoUrl={ video.fileUrl }
				                  title={ video.title }
				                  onEdit={ () =>
					                  handleEditVideo(video.id, video.fileUrl, video.title, video.fileName) }
				                  date={ video.date }/>
			</div>;
		});

		return <div className={ styles['videos__inner'] }
		            style={ {
			            transform: `translateX(-${ itemRefs.current.get(currentIndex)?.offsetLeft ?? 0 }px)`
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
                                       disabled={ currentIndex + visibleCount > videos.length }
                                       onClick={ () => handleNavigateClick('right') }/>
                        </div>
					}
				</div>
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
			</header>
			<div className={ styles['videos__content'] }
			     ref={ containerRef }>
				{ renderVideos() }
			</div>
		</section>
	);
}

export default FreelancerVideos;