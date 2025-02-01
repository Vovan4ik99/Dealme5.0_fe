import styles from "./FreelancerProfilePage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import ProfileNavbar from "@components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage
	from "@components/features/FreelancerProfile/main/BgImage/BgImage.tsx";
import Avatar
	from "@components/features/FreelancerProfile/main/Avatar/Avatar.tsx";
import PrimaryInfo
	from "@components/features/FreelancerProfile/aside/PrimaryInfo/PrimaryInfo.tsx";
import SecondaryInfo
	from "@components/features/FreelancerProfile/aside/SecondaryInfo/SecondaryInfo.tsx";
import SectorsInfo
	from "@components/features/FreelancerProfile/aside/SectorsInfo/SectorsInfo.tsx";
import InnerNavbar from "@components/layout/InnerNavbar/InnerNavbar.tsx";
import ProgressBar
	from "@components/features/FreelancerProfile/main/ProgressBar/ProgressBar.tsx";
import AboutMe
	from "@components/features/FreelancerProfile/main/AboutMe/AboutMe.tsx";
import CertificatesAndLicenses
	from "@components/features/FreelancerProfile/main/CertificatesAndLicenses/CertificatesAndLicenses.tsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import {
	useFreelancerProfileService
} from "@services/freelancerProfileService.ts";
import {
	useFreelancerProfileAsideInfoService
} from "@services/freelancerProfileAsideInfoService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import SalesTools
	from "@components/features/FreelancerProfile/main/SalesTools/SalesTools.tsx";
import { useOnboardingService } from "@services/onboardingService.ts";
import { useLoadingStatus } from "../../hooks/loadingStatus.hook.ts";
import { useVideoService } from "@services/videoService.ts";
import {
	useFreelancerCertificateService
} from "@services/freelancerCertificateService.ts";

const FreelancerProfilePage = () => {

	const isLoading = useLoadingStatus(
		useContext(AuthContext),
		useFreelancerProfileService(),
		useFreelancerProfileAsideInfoService(),
		useOnboardingService(),
		useVideoService(),
		useFreelancerCertificateService()
	);

	return (
		<div className={styles['profile']}>
			{isLoading &&
				<div className={styles['profile__loading']}>
					<LoadingSpinner/>
				</div>
			}
			{!isLoading &&
				<>
					<ProfileNavbar/>
					<BgImage/>
					<aside className={styles["profile__aside"]}>
						<Avatar/>
						<PrimaryInfo/>
						<SecondaryInfo/>
						<SectorsInfo/>
					</aside>
					<div className={styles["profile__content"]}>
						<InnerNavbar/>
						<ProgressBar/>
						<AboutMe/>
						<CertificatesAndLicenses/>
						<SalesTools/>
					</div>
					<Footer isHyphenated={false} isCentered={false}/>
				</>
			}
		</div>

	)
};

export default FreelancerProfilePage;
