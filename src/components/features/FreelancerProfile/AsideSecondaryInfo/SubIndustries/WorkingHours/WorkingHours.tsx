import React, { useEffect, useState } from "react";
import styles from "../../../../Onboarding/Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import { useOnboardingService } from "@services/onboardingService.ts";
import { IWorkingHour } from "@shared/onboardingTypes.ts";
import { IWorkingHoursProps } from "./WorkingHoursTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import BaseEditModal from "../../../../EditModal/BaseEditModal/BaseEditModal.tsx";
import WorkingHourItem from "../../../../Onboarding/items/WorkingHourItem/WorkingHourItem.tsx";

const WorkingHours: React.FC<IWorkingHoursProps> = ({
  userWorkingHours,
  onClose,
  onSave,
}) => {
  const [selectedHour, setSelectedHour] = useState<string | null>(
    userWorkingHours
  );
  const [workingHours, setWorkingHours] = useState<IWorkingHour[]>([]);
  const { loadingStatus, errorMessage, getWorkingHours, patchWorkingHours } =
    useOnboardingService();

  useEffect(() => {
    getWorkingHours()
      .then((response) => setWorkingHours(response))
      .catch((e) => console.error(e));
  }, [getWorkingHours]);

  const handleSave = () => {
    if (selectedHour) {
      patchWorkingHours(selectedHour)
        .then(() => {
          onSave(selectedHour);
          onClose();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <BaseEditModal
      title="Edytuj dyspozycyjność czasową"
      onClose={onClose}
      onSave={handleSave}
    >
      {loadingStatus === "loading" ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className={styles["onboarding-step__items"]}>
            {workingHours.map((hour) => {
              const isSelected = selectedHour === hour.workingHour;
              return (
                <WorkingHourItem
                  key={hour.workingHour}
                  text={hour.description}
                  isSelected={isSelected}
                  onChange={() => setSelectedHour(hour.workingHour)}
                />
              );
            })}
          </div>
          {errorMessage && <InputError text={errorMessage} />}
        </div>
      )}
    </BaseEditModal>
  );
};

export default WorkingHours;
