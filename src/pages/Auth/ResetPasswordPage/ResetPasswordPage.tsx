import styles from "./ResetPasswordPage.module.scss"
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import ResetPasswordForm from "@components/features/Auth/ResetPasswordForm/ResetPasswordForm.tsx";
import FreelancerOnboardingNavbar
    from "@components/layout/onboarding/FreelancerOnboardingNavbar/FreelancerOnboardingNavbar.tsx";


const ResetPasswordPage = () => {
    return (
        <section className={styles['reset-page']}>
            <FreelancerOnboardingNavbar/>
            <ResetPasswordForm/>
            <Footer isHyphenated={true} isCentered={true}/>
        </section>
    )
}

export default ResetPasswordPage;