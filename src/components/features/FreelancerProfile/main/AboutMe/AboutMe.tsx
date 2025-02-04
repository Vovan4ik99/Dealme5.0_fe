import styles from "./AboutMe.module.scss";
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { IAboutMeInfo } from "@shared/freelancerTypes.ts";
import { useFreelancerProfileService } from "@services/freelancerProfileService.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import VideoEmptyState from "@components/features/FreelancerProfile/main/AboutMe/VideoEmptyState/VideoEmptyState.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import AboutMeModalItem from "@components/features/EditModal/about_me/AboutMeModalItem/AboutMeModalItem.tsx";
import VideoItem from "@ui/VideoItem/VideoItem.tsx";

const AboutMe = () => {

	const SECTION_ID: NavbarSectionKey = 'about';

	const { getAboutMeProfileInfo } = useFreelancerProfileService();
	const { openModal } = useModal();

	const [ aboutMeInfo, setAboutMeInfo ] = useState<IAboutMeInfo | null>(null);

	const fetchAboutMeInfo = useCallback(() => {
		getAboutMeProfileInfo()
			.then(setAboutMeInfo)
			.catch(console.error);
	}, [ getAboutMeProfileInfo ]);

	useEffect(() => {
		fetchAboutMeInfo();
	}, [ fetchAboutMeInfo ]);

	const renderAboutMeInfo = () => {
		if (aboutMeInfo === null) {
			return <></>;
		}
		if (aboutMeInfo.about === null && aboutMeInfo.mainPassion === null) {
			return <AlertItem kind={ 'neutral' } text={ 'Nie uzupełniłeś/aś danych o sobie' }/>
		}
		return <div className={ styles['about__wrapper'] }>
			<p className={ styles['about__info'] }>{ aboutMeInfo.about }</p>
			<p className={ styles['about__text'] }>{ aboutMeInfo.mainPassion }</p>
		</div>;
	}

	const renderAboutMeVideo = () => {
		if (aboutMeInfo === null) {
			return <></>;
		}
		if (aboutMeInfo?.video === null) {
			return <button className={ `${ styles['about__video'] } ${ styles['about__video--empty'] }` }
			               onClick={ handleAboutMeInfoEdit }>
				<VideoEmptyState text={ 'Nagraj krótkie video o sobie' }/>
			</button>;
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
			shouldCloseOnSaving: true,
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
				<ActionBtn kind={ 'Edit' }
				           onClick={ handleAboutMeInfoEdit }
				           withBorder={ true }
				           backgroundColor={ 'transparent' }/>
			</header>
			<div className={ styles['about__content'] }>
				{ renderAboutMeInfo() }
				{ renderAboutMeVideo() }
			</div>
		</section>
	);
};

export default AboutMe;