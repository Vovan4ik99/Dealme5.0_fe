import styles from "./AboutMe.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import AlertItem from "@ui/common/AlertItem/AlertItem.tsx";
import VideoEmptyState from "@components/features/freelancer-profile/main/AboutMe/VideoEmptyState/VideoEmptyState.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AboutMeModalItem from "@components/features/modals/about_me/AboutMeModalItem/AboutMeModalItem.tsx";
import VideoItem from "@ui/freelancer-profile/VideoItem/VideoItem.tsx";
import { IAboutMeInfo } from "@shared/freelancer/common.ts";
import { IAboutMeProps } from "@components/features/freelancer-profile/main/AboutMe/aboutMeTypes.ts";

const AboutMe: React.FC<IAboutMeProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'about';

	const { getAboutMeProfileInfo } = useFreelancerProfileService();
	const { openModal } = useModal();

	const [ aboutMeInfo, setAboutMeInfo ] = useState<IAboutMeInfo | null>(null);

	const fetchAboutMeInfo = useCallback(() => {
		getAboutMeProfileInfo(freelancerId)
			.then(setAboutMeInfo)
			.catch(console.error);
	}, [freelancerId, getAboutMeProfileInfo]);

	useEffect(() => {
		fetchAboutMeInfo();
	}, [ fetchAboutMeInfo ]);

	const renderAboutMeInfo = () => {
		if (aboutMeInfo === null) {
			return <></>;
		}
		if (aboutMeInfo.about === null) {
			const text = isLoggedUserProfile ?
				'Nie uzupełniłeś/aś danych o sobie' :
				'Nie dodano danych o sobie';

			return <AlertItem kind={ 'neutral' } text={ text }/>
		}
		return <div className={ styles['about__wrapper'] }>
			<p className={ styles['about__info'] }>{ aboutMeInfo.about }</p>
			<p className={ styles['about__text'] }>
				{ aboutMeInfo.mainPassion }
			</p>
		</div>;
	}

	const renderAboutMeVideo = () => {
		if (aboutMeInfo === null) {
			return <></>;
		}
		if (aboutMeInfo?.video === null) {
			return isLoggedUserProfile ?
				<button className={ `${ styles['about__video'] } 
									 ${ styles['about__video--empty'] }` }
				        onClick={ handleAboutMeInfoEdit }>
					<VideoEmptyState text={ 'Nagraj krótkie video o sobie' }/>
				</button> :
				<div className={ `${ styles['about__video'] } 
								  ${ styles['about__video--empty'] } 
								  ${ styles["about__video--preview"]}` }>
					<VideoEmptyState text={ 'Brak video' }/>
				</div>;
		}
		return <div className={ styles['about__video'] }>
			<VideoItem key={ aboutMeInfo.video }
			           videoUrl={ aboutMeInfo.video }/>
		</div>;
	};

	const handleAboutMeInfoEdit = () => {
		openModal({
			id: 'AboutMeModalItem',
			title: 'Edytuj dane “o mnie”',
			shouldCloseOnSaving: false,
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			withSaveBtn: true,
			child: <AboutMeModalItem aboutMeInfo={ aboutMeInfo } onSave={ onSave }/>
		});
	};

	const onSave = () => {
		fetchAboutMeInfo();
	};

	return (
		<section className={ styles['about'] } id={ SECTION_ID }>
			<header className={ styles['about__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				{ isLoggedUserProfile &&
                    <ActionBtn kind={ 'Edit' }
                               onClick={ handleAboutMeInfoEdit }
                               withBorder={ true }
                               backgroundColor={ 'transparent' }/>
				}
			</header>
			<div className={ styles['about__content'] }>
				{ renderAboutMeInfo() }
				{ renderAboutMeVideo() }
			</div>
		</section>
	);
};

export default AboutMe;