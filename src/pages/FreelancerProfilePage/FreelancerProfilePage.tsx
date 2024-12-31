import styles from "./FreelancerProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "../../components/features/FreelancerProfile/BgImage/BgImage.tsx";
import AsidePrimaryInfo from "../../components/features/FreelancerProfile/AsidePrimaryInfo/AsidePrimaryInfo.tsx";
import Statistics from "../../components/features/FreelancerProfile/Statistics/Statistics.tsx";
import VisibilityBarForClients
	from "../../components/features/FreelancerProfile/VisibilityBarForClients/VisibilityBarForClients.tsx";
import SectionTabs from "../../components/features/FreelancerProfile/SectionTabs/SectionTabs.tsx";
import Avatar from "../../components/features/FreelancerProfile/Avatar/Avatar.tsx";


const FreelancerProfilePage = () => {
	return (
		<div className={styles['profile']}>
			<ProfileNavbar/>
			<BgImage/>
			<aside className={styles["profile__aside"]}>
				<Avatar/>
			</aside>

			<div className={styles["gridContainer"]}>
				<aside className={styles["profileInfo"]}>
					<AsidePrimaryInfo/>
					{/* <AsideSecondaryInfo /> */}
				</aside>

				<div className={styles["rightColumn"]}>
					<SectionTabs/>
					<VisibilityBarForClients progress={58}/>
					<Statistics/>
					{/* <AboutMe />
          <Opinions /> */}
				</div>
			</div>
			<Footer isHyphenated={false} isCentered={true}/>
		</div>
	)
};

export default FreelancerProfilePage;
