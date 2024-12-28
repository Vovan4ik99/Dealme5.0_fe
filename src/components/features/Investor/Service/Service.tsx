import { ReactComponent as SuitcaseIcon } from "@icons/name_exported/suitcase_icon.svg";
import BackToPreviousPage from "../BackToPreviousPage/BackToPreviousPage";
import BaseCard from "../BaseCard/BaseCard";
import styles from "../Order/Order.module.scss";

const Service = () => {
  return (
    <section>
      <header>
        <BackToPreviousPage
          onClick={() => console.log("hello")}
          text={"Mam zlecenie, potrzebuję wsparcia"}
          title={"Czy potrzebujesz pomocy w definiowaniu usługi?"}
        />
        <SuitcaseIcon />
      </header>
      <div className={styles["order"]}>
        <BaseCard
          title="Nie."
          subTitle="Wiem jakiej usługi potrzebuję"
          description="Przejdziesz do definiowania szczegółów usługi"
        />
        <BaseCard
          title="Tak."
          subTitle="Nie wiem jak zdefiniować usługę"
          description="Przejdziesz do formularza w którym opowiesz nam o swoich potrzebach a pomożemy Ci zdefiniować usługę"
        />
      </div>
    </section>
  );
};

export default Service;
