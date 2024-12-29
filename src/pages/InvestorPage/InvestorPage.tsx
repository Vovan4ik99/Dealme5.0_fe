import Order from "../../components/features/Investor/Order/Order.tsx";
import InvestorNavbar from "../../components/features/Investor/InvestorNavbar/InvestorNavbar.tsx";
import styles from "./InvestorPage.module.scss";
import Footer from "../../components/layout/Footer/Footer.tsx";
import Service from "../../components/features/Investor/Service/Service.tsx";
import ServicesEmptyState from "../../components/features/Investor/ServicesEmptyState/ServicesEmptyState.tsx";

const InvestorPage = () => {
  return (
    <section className={styles["investor"]}>
      <InvestorNavbar />
      {/* <Service /> */}
      <ServicesEmptyState />
      <Footer isHyphenated={false} isCentered={false}/>
    </section>
  );
};

export default InvestorPage;
