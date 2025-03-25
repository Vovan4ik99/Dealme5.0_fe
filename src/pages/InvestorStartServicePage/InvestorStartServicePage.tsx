import React from 'react';
import InvestorOnboardingNavbar
    from "@components/layout/OnboardingLayout/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import StartServiceSwitcher from "@components/features/StartService/StartServiceSwitcher.tsx";
import styles from "./InvestorStartServicePage.module.scss";
const InvestorStartServicePage = () => {
    return (
        <section className={styles["service"]}>
            <InvestorOnboardingNavbar />
            <StartServiceSwitcher />
            <Footer isHyphenated={false} isCentered={false} />
        </section>
    );
}

export default InvestorStartServicePage;