import styles from "./FreelancerProfilePage.module.scss";
import Footer from "@components/layout/Footer/Footer.tsx";
import ProfileNavbar from "@components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "@components/features/FreelancerProfile/main/BgImage/BgImage.tsx";
import Avatar from "@components/features/FreelancerProfile/main/Avatar/Avatar.tsx";
import PrimaryInfo from "@components/features/FreelancerProfile/aside/PrimaryInfo/PrimaryInfo.tsx";
import SecondaryInfo from "@components/features/FreelancerProfile/aside/SecondaryInfo/SecondaryInfo.tsx";
import SectorsInfo from "@components/features/FreelancerProfile/aside/SectorsInfo/SectorsInfo.tsx";
import InnerNavbar from "@components/layout/InnerNavbar/InnerNavbar.tsx";
import ProgressBar from "@components/features/FreelancerProfile/main/ProgressBar/ProgressBar.tsx";
import AboutMe from "@components/features/FreelancerProfile/main/AboutMe/AboutMe.tsx";
import CertificatesAndLicenses
	from "@components/features/FreelancerProfile/main/CertificatesAndLicenses/CertificatesAndLicenses.tsx";

const FreelancerProfilePage = () => {

	return (
		<div className={styles['profile']}>
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
			</div>
			<Footer isHyphenated={false} isCentered={true}/>
		</div>
	)
};

export default FreelancerProfilePage;
