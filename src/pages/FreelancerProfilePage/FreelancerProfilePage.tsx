import styles from "./FreelancerProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "../../components/features/FreelancerProfile/BgImage/BgImage.tsx";
import Avatar from "../../components/features/FreelancerProfile/Avatar/Avatar.tsx";
import PrimaryInfo from "../../components/features/FreelancerProfile/PrimaryInfo/PrimaryInfo.tsx";
import SecondaryInfo from "../../components/features/FreelancerProfile/SecondaryInfo/SecondaryInfo.tsx";
import SectorsInfo from "@components/features/FreelancerProfile/SectorsInfo/SectorsInfo.tsx";
import InnerNavbar from "@components/layout/InnerNavbar/InnerNavbar.tsx";

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
			</div>
			<Footer isHyphenated={false} isCentered={true}/>
		</div>
	)
};

export default FreelancerProfilePage;
