import styles from "./SubIndustries.module.scss";
import "@styles/edit.scss";
import {
  calendar,
  cloud,
  clock,
  languageImg,
  localizationImg,
} from "@icons/freelancerProfile/asideSecondaryInfo/asideSecondaryInfoImages";
import { useState } from "react";
import { ISubIndustriesProps } from "./SubIndustriesTypes";
import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";
import WorkingHours from "./WorkingHours/WorkingHours";

const SubIndustries = ({
  subIndustries,
  workingDays,
  workingHours,
  location,
  languages,
  onUpdateWorkingHours,
}: ISubIndustriesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formatWorkingHours = (backendFormat: string): string => {
    const formatMapping: { [key: string]: string } = {
      ZERO_TO_FOUR: "Do 4 godzin / tydzień",
      FOUR_TO_EIGHT: "4-8 godzin / tydzień",
      EIGHT_TO_SIXTEEN: "8-16 godzin / tydzień",
      SIXTEEN_TO_THIRTY_TWO: "16-32 godzin / tydzień",
      ABOVE_THIRTY_TWO: "Ponad 32 godzin / tydzień",
    };

    return formatMapping[backendFormat] || backendFormat;
  };

  const handleSaveWorkingHours = (newHours: string) => {
    const formattedHours = formatWorkingHours(newHours);
    onUpdateWorkingHours(formattedHours);
    setIsModalOpen(false);
  };

  const handleEditSubIndustries = () => alert("Edit SubIndustries");
  const handleEditWorkingDays = () => alert("Edit Working Days");
  const handleEditLocation = () => alert("Edit Location");
  const handleEditLanguages = () => alert("Edit Languages");

  return (
    <section className={styles.subIndustries__details}>
      <div className={styles.subIndustries__detail}>
        <div className={styles.subIndustries__wrapper}>
          <img src={cloud} alt="Cloud icon" />
          {subIndustries.length > 0
            ? subIndustries.map((industry) => (
                <span key={industry.id}>{industry.name}</span>
              ))
            : "Brak sektorów"}
        </div>
        <EditButton
          onClick={handleEditSubIndustries}
          className="edit edit--editButton"
        ></EditButton>
      </div>

      <div className={styles.subIndustries__detail}>
        <div className={styles.subIndustries__wrapper}>
          <img src={calendar} alt="Calendar" />
          {workingDays}
        </div>
        <EditButton
          onClick={handleEditWorkingDays}
          className="edit edit--editButton"
        ></EditButton>
      </div>

      <div className={styles.subIndustries__detail}>
        <div className={styles.subIndustries__wrapper}>
          <img src={clock} alt="Clock" />
          {workingHours}
        </div>
        <EditButton
          onClick={handleOpenModal}
          className="edit edit--editButton"
        ></EditButton>
      </div>

      {isModalOpen && (
        <WorkingHours
          userWorkingHours={workingHours}
          onClose={handleCloseModal}
          onSave={handleSaveWorkingHours}
        />
      )}

      <div className={styles.subIndustries__detail}>
        <div className={styles.subIndustries__wrapper}>
          <img src={localizationImg} alt="Localization" />
          {location}
        </div>
        <EditButton
          onClick={handleEditLocation}
          className="edit edit--editButton"
        ></EditButton>
      </div>

      <div className={styles.subIndustries__detail}>
        <div className={styles.subIndustries__wrapper}>
          <img src={languageImg} alt="Languages" />
          {languages}
        </div>
        <EditButton
          onClick={handleEditLanguages}
          className="edit edit--editButton"
        ></EditButton>
      </div>
    </section>
  );
};

export default SubIndustries;
