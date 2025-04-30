import React, {FC} from 'react';
import InnerNavbar from "@components/layout/navbar/InnerNavbar/InnerNavbar.tsx";
import ProgressBar from "@components/features/freelancer-profile/main/ProgressBar/ProgressBar.tsx";
import AboutMe from "@components/features/freelancer-profile/main/AboutMe/AboutMe.tsx";
import CertificatesAndLicenses
    from "@components/features/freelancer-profile/main/CertificatesAndLicenses/CertificatesAndLicenses.tsx";
import SalesTools from "@components/features/freelancer-profile/main/SalesTools/SalesTools.tsx";
import FreelancerVideos from "@components/features/freelancer-profile/main/FreelancerVideos/FreelancerVideos.tsx";
import FreelancerServices from "@components/features/freelancer-profile/main/FreelancerServices/FreelancerServices.tsx";
import FreelancerPortfolio
    from "@components/features/freelancer-profile/main/FreelancerPortfolio/FreelancerPortfolio.tsx";
import FreelancerReviews from "@components/features/freelancer-profile/main/FreelancerReviews/FreelancerReviews.tsx";
import FreelancerWorkExperience
    from "@components/features/freelancer-profile/main/FreelancerWorkExperience/FreelancerWorkExperience.tsx";
import FreelancerEducation
    from "@components/features/freelancer-profile/main/FreelancerEducation/FreelancerEducation.tsx";
import styles from "./FreelancerMainContent.module.scss"
import { IFreelancerMainContentProps } from './FreelancerMainContentTypes';

const FreelancerMainContent: FC<IFreelancerMainContentProps> = ({ freelancerId, isLoggedUserProfile}) => {

    return (
        <main className={ styles["content"] }>
            <InnerNavbar/>
            { isLoggedUserProfile && <ProgressBar/> }
            <AboutMe freelancerId={ freelancerId }
                     isLoggedUserProfile={ isLoggedUserProfile }/>
            <CertificatesAndLicenses freelancerId={ freelancerId }
                                     isLoggedUserProfile={ isLoggedUserProfile }/>
            <SalesTools freelancerId={ freelancerId }
                        isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerVideos freelancerId={ freelancerId }
                              isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerServices freelancerId={ freelancerId }
                                isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerPortfolio freelancerId={ freelancerId }
                                 isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerReviews freelancerId={ freelancerId }
                               isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerWorkExperience freelancerId={ freelancerId }
                                      isLoggedUserProfile={ isLoggedUserProfile }/>
            <FreelancerEducation freelancerId={ freelancerId }
                                 isLoggedUserProfile={ isLoggedUserProfile }/>
        </main>
    );
};

export default FreelancerMainContent;
