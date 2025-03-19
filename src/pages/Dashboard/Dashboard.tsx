import styles from "./Dashboard.module.scss";
import FreelancerOnboardingNavbar
	from "@components/layout/onboarding/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import { Link } from "react-router-dom";

const Dashboard = () => {

	return (
		<section className={styles['dashboard']}>
			<FreelancerOnboardingNavbar/>
			<Link to={"/profile"}>Profil</Link>
			<h1 className={'title'}>Strona główna</h1>
			<Footer isHyphenated={false} isCentered={true}/>
		</section>
	);
};

export default Dashboard;