import React from 'react';
import InvestorOnboardingNavbar
    from "@components/layout/OnboardingLayout/InvestorOnboardingNavbar/InvestorOnboardingNavbar.tsx";
import Footer from "@components/layout/Footer/Footer.tsx";
import ServiceManager from "@components/features/StartService/ServiceManager.tsx";
import styles from "./InvestorServicePage.module.scss";

const InvestorServicePage = () => {
    return (
        <section className={ styles["service"] }>
            <InvestorOnboardingNavbar />
            <ServiceManager />
            <Footer isHyphenated={ false } isCentered={ false } />
        </section>
    );
}

export default InvestorServicePage;