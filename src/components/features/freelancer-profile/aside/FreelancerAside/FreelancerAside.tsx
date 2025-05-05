import React, {FC} from 'react';
import styles from "./FreelancerAside.module.scss";
import Avatar from "@components/features/freelancer-profile/main/Avatar/Avatar.tsx";
import PrimaryInfo from "@components/features/freelancer-profile/aside/PrimaryInfo/PrimaryInfo.tsx";
import SecondaryInfo from "@components/features/freelancer-profile/aside/SecondaryInfo/SecondaryInfo.tsx";
import SectorsInfo from "@components/features/freelancer-profile/aside/SectorsInfo/SectorsInfo.tsx";
import {
    IFreelancerAsideProps
} from "@components/features/freelancer-profile/aside/FreelancerAside/FreelancerAsideTypes.ts";

const FreelancerAside: FC<IFreelancerAsideProps> = ({ freelancerId,
                                                      isLoggedUserProfile,
                                                      fetchFreelancerData,
                                                      freelancerData }) => {

    return (
        <aside className={ styles["aside"] }>
            <Avatar freelancerId={ freelancerId }
                    isLoggedUserProfile={ isLoggedUserProfile }/>
            <PrimaryInfo onSubmit={ fetchFreelancerData }
                         freelancerData={ freelancerData }
                         freelancerId={ freelancerId }
                         isLoggedUserProfile={ isLoggedUserProfile }/>
            <SecondaryInfo freelancerData={ freelancerData }
                           onSubmit={ fetchFreelancerData }
                           freelancerId={ freelancerId }
                           isLoggedUserProfile={ isLoggedUserProfile }/>
            <SectorsInfo isLoggedUserProfile={ isLoggedUserProfile }
                         onSubmit={ fetchFreelancerData }
                         freelancerSectors={ freelancerData?.sectors ?? [] }/>
        </aside>
    );
};

export default FreelancerAside;
