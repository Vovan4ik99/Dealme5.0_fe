import { useContext } from "react";
import InputError from "@ui/InputError/InputError";
import styles from "./EditAsidePrimaryInfo.module.scss";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { useForm } from "react-hook-form";
import { silhouette } from "@icons/freelancerProfile/asidePrimaryInfoImage/asidePrimaryInfoImage";
import ReusableModal from "../EditModals/ReusableModal/ReusableModal";

const EditAsidePrimaryInfo = ({ onClose }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
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

  const handleSave = () => {
    console.log("save");
  };
  return (
    <ReusableModal
      title="Edytuj dane podstawowe"
      onSave={handleSave}
      onClose={onClose}
    >
      <form className={styles["basicData-form"]} noValidate>
        <div className={"form-item"}>
          <div className={styles["basicData-form__header"]}>
            <div className={styles["basicData-form__wrapper"]}>
              <img src={silhouette} alt="Silhouette" />
              <div className={styles["basicData-form__container"]}>
                <h1 className={styles["basicData-form--variety"]}>
                  Rodzaj konta
                </h1>

                <h2 className={styles["basicData-form__role"]}>Freelancer</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Imię i Nazwisko */}
        <div className={styles["basicData-form__item"]}>
          <div className={`${styles["basicData-form__input"]} form-item`}>
            <input
              className={`form-item__input ${
                errors.firstName ? "form-item__input--error" : ""
              }`}
              id="firstName"
              type="text"
              placeholder={"np. Joanna"}
              autoComplete={"given-name"}
              {...register("firstName", {
                required: "Podaj imię",
                pattern: {
                  value: /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*$/,
                  message:
                    "Imię powinno zaczynać się wielką literą i zawierać tylko litery",
                },
                min: {
                  value: 2,
                  message: "Długość od 2 do 30 znaków",
                },
                max: {
                  value: 30,
                  message: "Długość od 2 do 30 znaków",
                },
              })}
            />
            {errors.firstName?.message && (
              <InputError text={errors.firstName.message} />
            )}
            <label
              className={"form-item__label form-item--label_gray"}
              htmlFor="firstName"
            >
              Imię
            </label>
          </div>
          <div className={`${styles["basicData-form__input"]} form-item`}>
            <input
              className={`form-item__input ${
                errors.lastName ? "form-item__input--error" : ""
              }`}
              id="lastName"
              type="text"
              placeholder={"np. Kowalska"}
              autoComplete={"family-name"}
              {...register("lastName", {
                required: "Podaj nazwisko",
                pattern: {
                  value:
                    /^[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*(?:-[A-ZА-ЯЁĆŁŃÓŚŹŻ][a-zа-яёćłńóśźż]*)?$/,
                  message:
                    "Nazwisko powinno zaczynać się wielką literą i może zawierać tylko litery" +
                    " oraz jeden łącznik",
                },
                min: {
                  value: 2,
                  message: "Długość od 2 do 50 znaków",
                },
                max: {
                  value: 50,
                  message: "Długość od 2 do 50 znaków",
                },
              })}
            />
            {errors.lastName?.message && (
              <InputError text={errors.lastName.message} />
            )}
            <label
              className={"form-item__label form-item--label_gray"}
              htmlFor="lastName"
            >
              Nazwisko
            </label>
          </div>
        </div>

        {/* Specjalizacja handlowa */}
        <div className={"form-item"}>
          <select className={"form-item__input"} id="specialization" />
          <label
            className={"form-item__label form-item--label_gray"}
            htmlFor="specialization"
          >
            Specjalizacja handlowa
          </label>
        </div>

        {/* Firma */}
        <div className={"form-item"}>
          <label className={"form-item__label"} htmlFor="company">
            Firma w której pracujesz (opcjonalnie)
          </label>
          <input
            className={`form-item__input ${
              errors.lastName ? "form-item__input--error" : ""
            }`}
            id="company"
            placeholder="np. Dealme"
            {...register("company", { required: "Podaj nazwę firmy" })}
          />
          {errors.company && <InputError text={errors.company.message} />}
        </div>

        {/* Doświadczenie w sprzedaży */}
        <div className={"form-item"}>
          <label
            className={"form-item__label form-item--label_gray"}
            htmlFor="experience"
          >
            Doświadczenie w sprzedaży
          </label>
          <select className={"form-item__input"} id="experience" />
        </div>

        {/* Oczekiwane zarobki */}
        <div className={"form-item"}>
          <label
            className={"form-item__label form-item--label_gray"}
            htmlFor="expectedSalary"
          >
            Oczekiwane zarobki w Dealme
          </label>
          <select className={"form-item__input"} id="expectedSalary" />
        </div>
      </form>
    </ReusableModal>
  );
};

export default EditAsidePrimaryInfo;
