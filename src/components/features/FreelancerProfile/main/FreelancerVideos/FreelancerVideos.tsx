import styles from './FreelancerVideos.module.scss';
import {
	NAVBAR_SECTIONS,
	NavbarSectionKey
} from "@constants/freelancerInnerNavbarSections.ts";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { IFreelancerVideo } from "@shared/freelancerTypes.ts";
import { useVideoService } from "@services/videoService.ts";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import AddVideoModalItem
	from "@components/features/EditModal/video/AddVideoModalItem/AddVideoModalItem.tsx";

const FreelancerVideos = () => {

	const SECTION_ID: NavbarSectionKey = 'videos';

	const { user } = useContext(AuthContext);
	const { getFreelancerVideos } = useVideoService();
	const { openModal } = useModal();

	const [videos, setVideos] = useState<IFreelancerVideo[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect(() => {
		if(!user) return;
		getFreelancerVideos(user.id)
			.then(setVideos)
			.catch(console.error);
	}, [getFreelancerVideos, user]);

	const handleNavigateClick = (direction: 'left' | 'right') => {
		if(direction === 'left') {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handleAddVideos = () => {
		openModal({
			id: 'unknown',
			title: 'Dodaj wideo',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj wideo',
			child: <AddVideoModalItem/>
		})
	};

	const handleEditVideos = () => {
		openModal({
			id: 'unknown',
			title: 'Edytuj wideo',
			child: <></>
		});
	};

	const renderVideos = () => {
		if(videos.length <= 0) {
			return <AlertItem kind={'neutral'} text={'Nie dodałeś/aś żadnych wideo'}/>
		}
		return <div
			style={{
				transform: `translateX(-${currentIndex * (169 + 8)}px)`
			}}
			className={styles['tools__inner']}>
		</div>
	}

	return (
		<section id={SECTION_ID} className={styles['videos']}>
			<header className={styles['videos__header']}>
				<div className={styles['videos__heading']}>
					<h2 className={'title title--profile'}>{NAVBAR_SECTIONS[SECTION_ID]}</h2>
					{videos.length > 0 &&
						<div className={styles['tools__buttons']}>
							<ActionBtn kind={'Navigate Left'}
							           key={'Left Btn'}
							           withBorder={true}
							           backgroundColor={'white'}
							           disabled={currentIndex === 0}
							           onClick={() => handleNavigateClick('left')}/>
							<ActionBtn kind={'Navigate Right'}
							           key={'Right Btn'}
							           withBorder={true}
							           backgroundColor={'white'}
							           disabled={currentIndex + 5 >= videos.length}
							           onClick={() => handleNavigateClick('right')}/>
						</div>
					}
				</div>
				<div className={styles['tools__buttons']}>
					<ActionBtn kind={'Add'}
					           key={'Add'}
					           withBorder={true}
					           backgroundColor={'white'}
					           onClick={handleAddVideos}/>
					{videos.length > 0 &&
						<ActionBtn kind={'Edit'}
						           key={'Edit'}
						           withBorder={true}
						           backgroundColor={'white'}
						           onClick={handleEditVideos}/>
					}
				</div>
			</header>
			<div className={styles['tools__content']}>
				{renderVideos()}
			</div>
		</section>
	);
}

export default FreelancerVideos;