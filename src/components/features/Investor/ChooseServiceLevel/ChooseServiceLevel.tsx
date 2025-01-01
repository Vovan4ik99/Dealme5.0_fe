import BackToPreviousPage from "../InvestorHeader/InvestorHeader";
import LevelItem from "./LevelItem/LevelItem";
import styles from "./ChooseServiceLevel.module.scss"

const ChooseServiceLevel = () => {
  const levelItemsData = [
    {
      number: 1,
      text: "Poziom 1",
      subText: "Podstawowy",
      description: "Opis poziomu 1",
      tab: "Analiza rynku",
    },
    {
      number: 2,
      text: "Poziom 2",
      subText: "Zaawansowany",
      description: "Opis poziomu 2",
      tab: "Strategia działania",
    },
  ];
  return (
    <>
      <BackToPreviousPage
        onClick={() => console.log("hello")}
        text={"Wiem jakiej usługi potrzebuję"}
        title={"Wybierz poziom usługi"}
      />
      <div className={styles["choose-service-level"]}>
        {levelItemsData.map((level) => (
          <LevelItem
            key={level.number}
            number={level.number}
            text={level.text}
            subText={level.subText}
            firstHeader={"CEL"}
            secondHeader={"GŁÓWNE ZADANIA"}
            description={level.description}
            tab={level.tab}
            onClick={() => console.log("hello")}
          />
        ))}
      </div>
    </>
  );
};
export default ChooseServiceLevel;
