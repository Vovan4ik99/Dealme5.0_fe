import React from 'react';
import InvestorOnboardingNavbar
    from "@components/layout/OnboardingLayout/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import ServiceSwitcher from "@components/features/StartService/ServiceSwitcher.tsx";
import styles from "./InvestorServicePage.module.scss";
const InvestorServicePage = () => {
    return (
        <section className={ styles["service"] }>
            <InvestorOnboardingNavbar />
            <ServiceSwitcher />
            <Footer isHyphenated={ false } isCentered={ false } />
        </section>
    );
}

export default InvestorServicePage;