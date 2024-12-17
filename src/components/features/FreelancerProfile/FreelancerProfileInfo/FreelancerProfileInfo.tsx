import { useEffect, useState } from "react";
import styles from "./FreelancerProfileInfo.module.scss";
import { useFreelancerProfileService } from "@services/freelancerProfileService";
import SubIndustries from "./SubIndustries/SubIndustries";
import Sectors from "./Sectors/Sectors";
import RatingAndAccStatus from "./RatingAndAccStatus/RatingAndAccStatus";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

interface ISector {
  id: number;
  name: string;
  description: string;
}

const FreelancerProfileInfo = () => {
  const { getFreelancerBar, loadingStatus, errorMessage } =
    useFreelancerProfileService();

  const { user } = useContext(AuthContext);

  const [freelancerName, setFreelancerName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [accountStatus, setAccountStatus] = useState<string>("");
  const [visibilityStatus, setVisibilityStatus] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [workingHours, setWorkingHours] = useState<string>("");
  const [workingDays, setWorkingDays] = useState<string>("");
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [subIndustries, setSubIndustries] = useState<ISector[]>([]);

  const ALL_DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  
  const WORK_DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  
  const DAYS_TRANSLATIONS: Record<string, string> = {
    MONDAY: "Poniedziałek",
    TUESDAY: "Wtorek",
    WEDNESDAY: "Środa",
    THURSDAY: "Czwartek",
    FRIDAY: "Piątek",
    SATURDAY: "Sobota",
    SUNDAY: "Niedziela",
  };
  
  // Główna funkcja formatowania
  const formatWorkingDays = (days: string[]): string => {
    if (days.length === 0) return "Brak dni";
  
    // Wszystkie dni tygodnia
    if (days.length === 7 && days.every((day) => ALL_DAYS.includes(day))) {
      return "Wszystkie dni tygodnia";
    }
  
    // Dni robocze
    if (days.length === 5 && WORK_DAYS.every((day) => days.includes(day))) {
      return "Dni robocze";
    }
  
    // Posortowanie dni na podstawie indeksów w ALL_DAYS
    const sortedDays = days
      .slice() // Kopia oryginalnej tablicy
      .sort((a, b) => ALL_DAYS.indexOf(a) - ALL_DAYS.indexOf(b));
  
    // Zamiana dni na ich tłumaczenia
    const translatedDays = sortedDays.map((day) => DAYS_TRANSLATIONS[day]);
  
    // Jeśli jest tylko jeden dzień, zwracamy jego nazwę
    if (translatedDays.length === 1) {
      return translatedDays[0];
    }
  
    // Jeśli dni są po kolei, zwracamy zakres np. "Poniedziałek - Środa"
    if (isConsecutiveDays(sortedDays)) {
      const startDay = DAYS_TRANSLATIONS[sortedDays[0]];
      const endDay = DAYS_TRANSLATIONS[sortedDays[sortedDays.length - 1]];
      return `${startDay} - ${endDay}`;
    }
  
    // Jeśli dni są losowe, zwracamy je po przecinku
    return translatedDays.join(", ");
  };
  
  // Funkcja sprawdzająca, czy dni są po kolei
  const isConsecutiveDays = (days: string[]): boolean => {
    const indices = days.map((day) => ALL_DAYS.indexOf(day));
    return indices.every(
      (value, index, array) => index === 0 || value === array[index - 1] + 1
    );
  };
  
  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const data = await getFreelancerBar();
        setFreelancerName(`${data.firstName} ${data.lastName}`);
        setSpecialization(user?.specialization.name || "Brak specjalizacji");
        setAccountStatus(data.accountStatus);
        setVisibilityStatus(data.visibilityStatus);
        setLanguages(data.localization?.languages?.join(", ") || "Brak danych");
        setLocation(
          [
            data.localization?.city,
            data.localization?.state,
            data.localization?.country,
          ]
            .filter(Boolean)
            .join(", ") || "Brak lokalizacji"
        );
        setRate(data.rate || 0);
        setCount(data.count || 0);
        setWorkingDays(formatWorkingDays(data.workingDays || []));
        setWorkingHours(data.workingHours.description);
        setSectors(data.sectors || []);
        setSubIndustries(data.subIndustries || []);
        console.log(data.workingDays);
      } catch (error) {
        console.error("Failed to fetch freelancer data:", error);
      }
    };

    fetchFreelancerData();
  }, [getFreelancerBar, user]);

  return (
    <section className={styles.asideProfile__profileCard}>
      <h2 className={styles.asideProfile__name}>{freelancerName}</h2>
      <div className={styles.asideProfile__infoContainer}>
        <p className={styles.asideProfile__role}>{specialization}</p>
        <RatingAndAccStatus
          rate={rate}
          count={count}
          accountStatus={accountStatus}
          visibilityStatus={visibilityStatus}
        />
      </div>
      <SubIndustries
        subIndustries={subIndustries}
        workingDays={workingDays}
        workingHours={workingHours}
        location={location}
        languages={languages}
        onUpdateWorkingHours={(newHours) => setWorkingHours(newHours)}
      />
      <Sectors sectors={sectors} />
    </section>
  );
};

export default FreelancerProfileInfo;
