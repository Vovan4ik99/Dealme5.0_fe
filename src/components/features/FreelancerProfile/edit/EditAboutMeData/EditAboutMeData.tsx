import { useState } from "react";
import ReusableModal from "../ReusableModal/ReusableModal";
import styles from "./EditAboutMeData.module.scss";

const EditAboutMeData = ({ onClose }) => {
  const [text, setText] = useState("");
  const [valueMain, setValueMain] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const maxLength = 500;

  const handleMainChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueMain(e.target.value);
    setText(e.target.value)
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueDescription(e.target.value);
  };

  return (
    <ReusableModal title='Edytuj dane "o mnie"' onClose={onClose}>
      <div className={styles.editAboutMeData__main}>
        <div className={styles.editAboutMeData__container}>
          <div className={styles.editAboutMeData__header}>
            <h1 className={styles.editAboutMeData__title}>Główna zajawka</h1>
            <div className={styles.editAboutMeData__title}>
              {text.length} / {maxLength}
            </div>
          </div>
          <textarea
            className={styles.editAboutMeData__description}
            id="mainTeaser"
            value={valueMain}
            onChange={handleMainChange}
            placeholder="Do uzupełnienia"
            maxLength={maxLength}
          />
        </div>
        <div className={styles.editAboutMeData__container}>
        <h1 className={styles.editAboutMeData__title}>Opis (opcjonalne)</h1>
        <textarea
            className={styles["editAboutMeData--secondDescription"]}
            id="mainTeaser"
            value={valueDescription}
            onChange={handleDescriptionChange}
            placeholder="Do uzupełnienia"
          />
        </div>
      </div>
    </ReusableModal>
  );
};

export default EditAboutMeData;
