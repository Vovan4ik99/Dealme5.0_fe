import { useContext } from "react";

import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useForm } from "react-hook-form";

const EditAsidePrimaryInfo = () => {
  const { user } = useContext(AuthContext);
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      company: "",
      specialization: user?.specialization.name,
      experience: "",
      expectedSalary: "",
    },
  });

  //   const { getFreelancerBar, loadingStatus, errorMessage } =
  //   useOnboardingService();

  // const handleSave = () => {
  //     if (selectedDays.length > 0) {
  //       patchWorkingDays(selectedDays)
  //         .then(() => {
  //           onSave(selectedDays);
  //           onClose();
  //         })
  //         .catch((e) => console.error(e));
  //     }
  //   };

};

export default EditAsidePrimaryInfo;
