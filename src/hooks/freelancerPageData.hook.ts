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
    const [ notFound, setNotFound ] = useState<boolean>(false);

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
                    setNotFound(true);
                    return;
                }
                setFreelancerData(response);
            })
            .catch(error => {
                if (error === ErrorMessages.USER_NOT_FOUND) {
                    setNotFound(true);
                }

                console.error(error);
            });
    }, [ freelancerId, user?.role, getFreelancerPrimaryInfo, isLoggedUserProfile ] )

    useEffect(() => {
        if (isPathInvalid) {
            setNotFound(true);
            return;
        }

        fetchFreelancerData();
    }, [ isPathInvalid, fetchFreelancerData, navigate ]);

    return { freelancerData, freelancerId, isLoggedUserProfile, user, fetchFreelancerData, notFound };
}