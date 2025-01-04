import styles from "./FreelancerProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "../../components/features/FreelancerProfile/BgImage/BgImage.tsx";
import Avatar from "../../components/features/FreelancerProfile/Avatar/Avatar.tsx";
import PrimaryInfo from "../../components/features/FreelancerProfile/PrimaryInfo/PrimaryInfo.tsx";


const FreelancerProfilePage = () => {
	return (
		<div className={styles['profile']}>
			<ProfileNavbar/>
			<BgImage/>
			<aside className={styles["profile__aside"]}>
				<Avatar/>
				<PrimaryInfo/>
			</aside>
			<Footer isHyphenated={false} isCentered={true}/>
		</div>
	)
};

export default FreelancerProfilePage;
