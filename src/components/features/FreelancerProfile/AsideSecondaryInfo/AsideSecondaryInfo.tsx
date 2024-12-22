import { useContext, useEffect } from "react";
import Sectors from "./Sectors/Sectors";
import SubIndustries from "./SubIndustries/SubIndustries";
import { AuthContext } from "@context/AuthContext/AuthContext";
import { useFreelancerProfileService } from "@services/freelancerProfileService";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner";

const AsideSecondaryInfo = () => {
  const { user } = useContext(AuthContext);

  const { loadingStatus, errorMessage, getFreelancerBar } =
  useFreelancerProfileService();

    useEffect(() => {
      const fetchAvatarImage = async () => {
        try {
          const response = await getFreelancerBar();
          setAvatarImage(response.picture ?? undefined);
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };
  
      fetchAvatarImage();
    }, [getFreelancerBar]);

  if (loadingStatus === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <SubIndustries
        subIndustries={user?.subIndustries}
        workingDays={user?.workingDays}
        workingHours={user?.workingHours}
        location={location}
        languages={languages}
        onUpdateWorkingHours={(newHours) => setWorkingHours(newHours)}
      />

      <Sectors sectors={user?.sectors} />
    </section>
  );
};

export default AsideSecondaryInfo;
