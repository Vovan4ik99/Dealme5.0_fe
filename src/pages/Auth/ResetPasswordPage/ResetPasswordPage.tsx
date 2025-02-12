
import styles from "./ResetPasswordPage.module.scss"
import Footer from "@components/layout/Footer/Footer.tsx";
import React from "react";
import ResetPasswordForm from "@components/features/Auth/ResetPasswordForm/ResetPasswordForm.tsx";
import Navbar from "@components/layout/OnboardingNavbar/Navbar.tsx";


const ResetPasswordPage = () => {
    return (
        <section className={styles['reset-password-page']}>
            <Navbar/>
            <div className={styles['reset-password-page__content']}>
                <ResetPasswordForm/>
            </div>
            <Footer isHyphenated={true} isCentered={true}/>
        </section>
    )
}

export default ResetPasswordPage;