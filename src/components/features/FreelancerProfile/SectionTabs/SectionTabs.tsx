import styles from "./SectionTabs.module.scss";

const BUTTONS = [
  "O mnie",
  "Doświadczenie",
  "Wykształcenie",
  "Narzędzia sprzedażowe",
  "Wideo",
  "Usługi",
  "Umiejętności",
  "Portfolio",
  "Opinie",
];

const SectionTabs = () => {
  return (
    <section className={styles["container"]}>
      {BUTTONS.map((button) => (
        <button key={button} className="btn btn--tab">
          {button}
        </button>
      ))}
    </section>
  );
};

export default SectionTabs;
