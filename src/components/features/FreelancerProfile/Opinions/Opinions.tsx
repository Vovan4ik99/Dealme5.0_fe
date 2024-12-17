import React from "react";
import styles from "./Opinions.module.scss";
import "@styles/title.scss";

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
  avatarUrl: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    author: "Adam Gontier",
    date: "2 dni temu",
    avatarUrl: "",
  },
  {
    id: 2,
    rating: 4,
    text: "Text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever!",
    author: "Lars Ulrich",
    date: "Miesiąc temu",
    avatarUrl: "",
  },
  {
    id: 3,
    rating: 5,
    text: "Industry's standard dummy text ever since the 1500s lorem Ipsum is simply dummy text.",
    author: "Dorota Wiśniewska",
    date: "18.03.2024",
    avatarUrl: "",
  },
];

const ratingsSummary = [
  { stars: 5, percent: 89 },
  { stars: 4, percent: 5 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 0 },
];

const categories = [
  { name: "Jakość współpracy i zaangażowanie", rating: 4 },
  { name: "Responsywność i kontakt z handlowcem", rating: 5 },
  { name: "Efekty współpracy i liczba aktywności", rating: 4 },
  { name: "Zadowolenie z wykonanych aktywności", rating: 3 },
];

const Reviews: React.FC = () => {
  return (
    <section className={styles.reviewsContainer}>
      <header className="title title--fs20">Opinie</header>
      <div className={styles.mainContent}>
        <section className={styles.reviewsSection}>
          <p className={styles.subTitleText}>OPINIE</p>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.stars}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.author}>
                <img src={review.avatarUrl} alt={review.author} />
                <span>
                  {review.author} - {review.date}
                </span>
              </div>
            </div>
          ))}
          <button className={styles.moreButton}>Rozwiń wszystkie (+11)</button>
        </section>
        <section className={styles.summarySection}>
          <p className={styles.subTitleText}>OCENY</p>
          {ratingsSummary.map((item) => (
            <div key={item.stars} className={styles.ratingRow}>
              <span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.659564 6.29733L2.44054 7.59804L1.76417 9.6927C1.65487 10.0176 1.65348 10.3691 1.76022 10.6948C1.86697 11.0205 2.07612 11.303 2.3565 11.5002C2.63207 11.7037 2.96603 11.8127 3.3086 11.811C3.65117 11.8093 3.98401 11.6969 4.25754 11.4907L5.999 10.209L7.74096 11.4892C8.01604 11.6915 8.34819 11.8014 8.68966 11.8031C9.03114 11.8047 9.36435 11.6981 9.64139 11.4984C9.91842 11.2988 10.125 11.0164 10.2315 10.692C10.3379 10.3675 10.3387 10.0177 10.2338 9.6927L9.55746 7.59804L11.3384 6.29733C11.6132 6.09647 11.8174 5.81394 11.9219 5.49008C12.0265 5.16622 12.026 4.81761 11.9206 4.49403C11.8152 4.17045 11.6102 3.88847 11.3349 3.68835C11.0597 3.48823 10.7282 3.38021 10.3879 3.37973H8.20021L7.53634 1.31059C7.43195 0.984888 7.22681 0.70076 6.95051 0.499174C6.67421 0.297589 6.34102 0.188965 5.999 0.188965C5.65698 0.188965 5.32379 0.297589 5.04749 0.499174C4.77119 0.70076 4.56605 0.984888 4.46165 1.31059L3.79779 3.37973H1.61209C1.27177 3.38021 0.940315 3.48823 0.665057 3.68835C0.3898 3.88847 0.184824 4.17045 0.0794063 4.49403C-0.0260113 4.81761 -0.0264779 5.16622 0.0780731 5.49008C0.182624 5.81394 0.386845 6.09647 0.661566 6.29733H0.659564Z"
                    fill="#F19602"
                  />
                </svg>
                {item.stars}
              </span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              <span>{item.percent}%</span>
            </div>
          ))}
          <p className={styles.subTitleText}>KATEGORIA</p>
          {categories.map((category) => (
            <div key={category.name} className={styles.categoryRow}>
              <span>{category.name}</span>
              <span>{"★".repeat(category.rating)}</span>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Reviews;
