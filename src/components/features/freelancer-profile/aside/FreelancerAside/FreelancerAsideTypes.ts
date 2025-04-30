import { IFreelancerData } from "@shared/freelancer/common";

export interface IFreelancerAsideProps {
    freelancerId: number;
    isLoggedUserProfile: boolean;
    fetchFreelancerData: () => void;
    freelancerData: IFreelancerData;
}