import styles from "./FreelancerProfilePage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import ProfileNavbar from "@components/layout/navbar/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "@components/features/freelancer-profile/main/BgImage/BgImage.tsx";
import Avatar from "@components/features/freelancer-profile/main/Avatar/Avatar.tsx";
import PrimaryInfo from "@components/features/freelancer-profile/aside/PrimaryInfo/PrimaryInfo.tsx";
import SecondaryInfo from "@components/features/freelancer-profile/aside/SecondaryInfo/SecondaryInfo.tsx";
import SectorsInfo from "@components/features/freelancer-profile/aside/SectorsInfo/SectorsInfo.tsx";
import InnerNavbar from "@components/layout/navbar/InnerNavbar/InnerNavbar.tsx";
import ProgressBar from "@components/features/freelancer-profile/main/ProgressBar/ProgressBar.tsx";
import AboutMe from "@components/features/freelancer-profile/main/AboutMe/AboutMe.tsx";
import CertificatesAndLicenses
	from "@components/features/freelancer-profile/main/CertificatesAndLicenses/CertificatesAndLicenses.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import SalesTools from "@components/features/freelancer-profile/main/SalesTools/SalesTools.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { useLoadingStatus } from "@hooks/loadingStatus.hook.ts";
import { useFreelancerVideoService } from "@services/freelancer/freelancerVideoService.ts";
import { useFreelancerCertificateService } from "@services/freelancer/freelancerCertificateService.ts";
import FreelancerVideos from "@components/features/freelancer-profile/main/FreelancerVideos/FreelancerVideos.tsx";
import FreelancerServices from "@components/features/freelancer-profile/main/FreelancerServices/FreelancerServices.tsx";
import FreelancerReviews from "@components/features/freelancer-profile/main/FreelancerReviews/FreelancerReviews.tsx";
import FreelancerWorkExperience
	from "@components/features/freelancer-profile/main/FreelancerWorkExperience/FreelancerWorkExperience.tsx";
import { useFreelancerWorkExperienceService } from "@services/freelancer/freelancerWorkExperienceService.ts";
import FreelancerEducation
	from "@components/features/freelancer-profile/main/FreelancerEducation/FreelancerEducation.tsx";
import { useFreelancerEducationService } from "@services/freelancer/freelancerEducationService.ts";
import { useNavigate, useParams } from "react-router-dom";
import FreelancerPortfolio
	from "@components/features/freelancer-profile/main/FreelancerPortfolio/FreelancerPortfolio.tsx";
import { useFreelancerPortfolioService } from "@services/freelancer/freelancerPortfolioService.ts";
import { ErrorMessages } from "@shared/errorMessages.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import AdminPanelNavbar from "@components/layout/navbar/AdminPanelNavbar/AdminPanelNavbar.tsx";

const FreelancerProfilePage = () => {

	const isLoading = useLoadingStatus(
		useContext(AuthContext),
		useFreelancerProfileService(),
		useFreelancerProfileAsideInfoService(),
		useFreelancerOnboardingService(),
		useFreelancerVideoService(),
		useFreelancerCertificateService(),
		useFreelancerWorkExperienceService(),
		useFreelancerEducationService(),
		useFreelancerPortfolioService()
	);

	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();
	const navigate = useNavigate();

	const [ freelancerData, setFreelancerData ] = useState<IFreelancerData | undefined>();

	const isLoggedUserProfile = id === undefined;
	const isPathInvalid = id && isNaN(parseInt(id));
	const freelancerId = isLoggedUserProfile ? user?.id : parseInt(id);

	const fetchFreelancerData = useCallback(() => {
		if (!freelancerId || !user?.role) return;

		getFreelancerPrimaryInfo(freelancerId)
			.then(response => {
				const canEnterProfile = response.isOnboardingPassed
				const isAdmin = user.role === 'ADMIN';

				if (!canEnterProfile || !(isAdmin || isLoggedUserProfile)) {
					navigate("/404");
					return;
				}
				setFreelancerData(response)
			})
			.catch(error => {
				if (error === ErrorMessages.USER_NOT_FOUND) {
					navigate("/404");
					return;
				}
				console.error(error);
			});
	}, [ freelancerId, getFreelancerPrimaryInfo, isLoggedUserProfile, navigate, user?.role ]);

	useEffect(() => {
		if (isPathInvalid) {
			navigate("/404");
			return;
		}

		fetchFreelancerData();
	}, [ fetchFreelancerData, isPathInvalid, navigate, user?.role ]);

	const getPageNavbar = () => {
		if (user?.role === "ADMIN") {
			return (
				<AdminPanelNavbar ordersCount={ 0 }
									 freelancersCount={ 0 }
									 investorsCount={ 0 }
									 hasMarginBottom={ true }/>
		)}
		return <ProfileNavbar/>;
	}

	if (!freelancerId || !freelancerData) {
		return <LoadingSpinner/>;
	}

	if (isLoading) {
		return <div className={ styles['profile__loading'] }>
			<LoadingSpinner/>
		</div>
	}

	return (
		<div className={ styles['profile'] }>
			{ getPageNavbar() }
			<BgImage freelancerId={ freelancerId } isLoggedUserProfile={ isLoggedUserProfile }/>
			<aside className={ styles["profile__aside"] }>
				<Avatar freelancerId={ freelancerId }
				        isLoggedUserProfile={ isLoggedUserProfile }/>
				<PrimaryInfo onSubmit={ fetchFreelancerData }
				             freelancerData={ freelancerData }
				             freelancerId={ freelancerId }
				             isLoggedUserProfile={ isLoggedUserProfile }/>
				<SecondaryInfo freelancerData={ freelancerData }
				               onSubmit={ fetchFreelancerData }
				               freelancerId={ freelancerId }
				               isLoggedUserProfile={ isLoggedUserProfile }/>
				<SectorsInfo isLoggedUserProfile={ isLoggedUserProfile }
				             onSubmit={ fetchFreelancerData }
				             freelancerSectors={ freelancerData?.sectors ?? [] }/>
			</aside>
			<div className={ styles["profile__content"] }>
				<InnerNavbar/>
				{ isLoggedUserProfile && <ProgressBar/> }
				<AboutMe freelancerId={ freelancerId }
				         isLoggedUserProfile={ isLoggedUserProfile }/>
				<CertificatesAndLicenses freelancerId={ freelancerId }
				                         isLoggedUserProfile={ isLoggedUserProfile }/>
				<SalesTools freelancerId={ freelancerId }
				            isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerVideos freelancerId={ freelancerId }
				                  isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerServices freelancerId={ freelancerId }
				                    isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerPortfolio freelancerId={ freelancerId }
				                     isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerReviews freelancerId={ freelancerId }
				                   isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerWorkExperience freelancerId={ freelancerId }
				                          isLoggedUserProfile={ isLoggedUserProfile }/>
				<FreelancerEducation freelancerId={ freelancerId }
				                     isLoggedUserProfile={ isLoggedUserProfile }/>
			</div>
			<Footer isHyphenated={ false } isCentered={ false }/>
		</div>

	)
};

export default FreelancerProfilePage;
