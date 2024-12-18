import React, { useState } from "react";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import { useOnboardingService } from "@services/onboardingService.ts";
import { WORKING_DAYS, WorkingDayKey } from "@constants/workingDays.ts";
import WorkingDayItem from "../../../Onboarding/items/WorkingDayItem/WorkingDayItem.tsx";
import { WorkingDaysProps } from "./WorkingDaysTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import ReusableModal from "../ReusableModal/ReusableModal.tsx";

const WorkingDaysStep: React.FC<WorkingDaysProps> = ({
  userWorkingDays,
  onClose,
  onSave,
}) => {
  const [selectedDays, setSelectedDays] =
    useState<WorkingDayKey[]>(userWorkingDays);
  const { loadingStatus, errorMessage, getWorkingDays, patchWorkingDays } =
    useOnboardingService();

  const onChange = (newDay: WorkingDayKey) => {
    setSelectedDays((prevState) => {
      return prevState.includes(newDay)
        ? prevState.filter((day) => day !== newDay)
        : [...prevState, newDay];
    });
  };

  const renderDays = () => {
    return Object.entries(WORKING_DAYS).map(([key, entry]) => {
      const isSelected = selectedDays.includes(key as WorkingDayKey);
      return (
        <WorkingDayItem
          key={key}
          text={entry}
          isSelected={isSelected}
          onChange={onChange}
          workDayKey={key as WorkingDayKey}
        />
      );
    });
  };

  const handleSave = () => {
    if (selectedDays.length > 0) {
      patchWorkingDays(selectedDays)
        .then(() => {
          onSave(selectedDays);
          onClose();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <ReusableModal
      title="Edytuj dostępność"
      onClose={onClose}
      onSave={handleSave}
    >
      {loadingStatus === "loading" ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className={styles["onboarding-step__items"]}>{renderDays()}</div>
          {errorMessage && <InputError text={errorMessage} />}
        </div>
      )}
    </ReusableModal>
  );
};

export default WorkingDaysStep;
