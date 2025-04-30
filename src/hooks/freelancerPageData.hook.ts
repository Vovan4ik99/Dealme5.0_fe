import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import { AuthContext } from "@context/AuthContext/AuthContext";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService";
import { IFreelancerData } from "@shared/freelancer/common";
import {ErrorMessages} from "@shared/errorMessages.ts";

export const useFreelancerPageData = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { getFreelancerPrimaryInfo } = useFreelancerProfileService();

    const [ freelancerData, setFreelancerData ] = useState<IFreelancerData | undefined>();

    const isLoggedUserProfile = id === undefined;
    const freelancerId = isLoggedUserProfile ? user?.id : parseInt(id);
    const isPathInvalid = id && isNaN(parseInt(id));

    const fetchFreelancerData =  useCallback(() => {
        if (!freelancerId || !user?.role) return;

        getFreelancerPrimaryInfo(freelancerId)
            .then(response => {
                const isOnboardingPassed = response.isOnboardingPassed;
                const isAdmin = user.role === "ADMIN";

                if (!isLoggedUserProfile && (!isOnboardingPassed || !isAdmin)) {
                    navigate("/404");
                    return;
                }
                setFreelancerData(response);
            })
            .catch(error => {
                if (error === ErrorMessages.USER_NOT_FOUND) {
                    navigate("/404");
                }

                console.error(error);
            });
    }, [ freelancerId, getFreelancerPrimaryInfo, isLoggedUserProfile, navigate, user?.role ] )

    useEffect(() => {
        if (isPathInvalid) {
            navigate("/404");
            return;
        }

        fetchFreelancerData();
    }, [ isPathInvalid, fetchFreelancerData, navigate ]);

    return { freelancerData, freelancerId, isLoggedUserProfile, user, fetchFreelancerData };
}