import Order from "../../components/features/Investor/Order/Order.tsx";
import InvestorNavbar from "../../components/features/Investor/InvestorNavbar/InvestorNavbar.tsx";
import styles from "./InvestorPage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";

const InvestorPage = () => {
  return (
    <section className={styles["investor"]}>
      <InvestorNavbar />
      <Order />
      <Footer isHyphenated={false} isCentered={false}/>
    </section>
  );
};

export default InvestorPage;
