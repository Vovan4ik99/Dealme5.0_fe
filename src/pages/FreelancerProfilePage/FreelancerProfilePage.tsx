import styles from "./FreelancerProfilePage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import ProfileNavbar from "../../components/layout/ProfileNavbar/ProfileNavbar.tsx";
import BgImage from "../../components/features/FreelancerProfile/BgImage/BgImage.tsx";
import AvatarImage from "../../components/features/FreelancerProfile/AvatarImage/AvatarImage.tsx";
import AsidePrimaryInfo from "../../components/features/FreelancerProfile/AsidePrimaryInfo/AsidePrimaryInfo.tsx";
import Statistics from "../../components/features/FreelancerProfile/Statistics/Statistics.tsx";
import VisibilityBarForClients
	from "../../components/features/FreelancerProfile/VisibilityBarForClients/VisibilityBarForClients.tsx";
import SectionTabs from "../../components/features/FreelancerProfile/SectionTabs/SectionTabs.tsx";


const FreelancerProfilePage = () => {
	return (
        <>
            <ProfileNavbar/>
            <BgImage/>
            <div className={styles["avatar"]}>
                <AvatarImage/>
            </div>
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
        </>
    )
};

export default FreelancerProfilePage;
