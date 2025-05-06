import styles from "./FreelancerProfilePage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import ProfileNavbar from "@components/layout/navbar/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "@components/features/freelancer-profile/main/BgImage/BgImage.tsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import LoadingSpinner from "@ui/common/LoadingSpinner/LoadingSpinner.tsx";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import { useLoadingStatus } from "@hooks/loadingStatus.hook.ts";
import { useFreelancerVideoService } from "@services/freelancer/freelancerVideoService.ts";
import { useFreelancerCertificateService } from "@services/freelancer/freelancerCertificateService.ts";
import { useFreelancerWorkExperienceService } from "@services/freelancer/freelancerWorkExperienceService.ts";
import { useFreelancerEducationService } from "@services/freelancer/freelancerEducationService.ts";
import { useFreelancerPortfolioService } from "@services/freelancer/freelancerPortfolioService.ts";
import AdminPanelNavbar from "@components/layout/navbar/AdminPanelNavbar/AdminPanelNavbar.tsx";
import FreelancerAside from "@components/features/freelancer-profile/aside/FreelancerAside/FreelancerAside.tsx";
import FreelancerMainContent
	from "@components/features/freelancer-profile/main/FreelancerMainContent/FreelancerMainContent.tsx";
import { useFreelancerPageData } from "@hooks/freelancerPageData.hook.ts";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage.tsx";

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

	const { freelancerId,
			freelancerData,
			isLoggedUserProfile,
			user,
			fetchFreelancerData,
			notFound } = useFreelancerPageData();

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

	if (notFound) {
		return <NotFoundPage/>
	}

	if (!freelancerId || !freelancerData) {
		return <LoadingSpinner/>;
	}

	if (isLoading) {
		return (
			<div className={ styles['profile__loading'] }>
				<LoadingSpinner/>
			</div>
	)}

	return (
		<div className={ styles['profile'] }>
			{ getPageNavbar() }
			<BgImage freelancerId={ freelancerId }
					 isLoggedUserProfile={ isLoggedUserProfile }/>
			<FreelancerAside freelancerId={ freelancerId }
							 isLoggedUserProfile={ isLoggedUserProfile }
							 fetchFreelancerData={ fetchFreelancerData }
							 freelancerData={ freelancerData } />
			<FreelancerMainContent isLoggedUserProfile={ isLoggedUserProfile }
								   freelancerId={ freelancerId } />
			<Footer isHyphenated={ false }
					isCentered={ false }/>
		</div>

	)
};

export default FreelancerProfilePage;
