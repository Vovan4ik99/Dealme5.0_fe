import { useMemo } from "react";
import styles from "./Sectors.module.scss";

interface Sector {
  id: number;
  name: string;
}

interface SectorsProps {
  sectors: Sector[];
}

const Sectors = ({ sectors }: SectorsProps) => {
  const containerWidth = 330; // Szerokość kontenera
  const containerHeight = 60; // Maksymalna wysokość kontenera
  const itemHeight = 28; // Wysokość jednego elementu
  const itemGap = 4; // Odstęp między elementami

  const maxVisibleItems = useMemo(() => {
    // Oblicz liczbę linii, które zmieszczą się w kontenerze
    const maxLines = Math.floor(containerHeight / (itemHeight + itemGap));
    const maxItemsPerLine = Math.floor(containerWidth / 150); // Przykładowa szerokość jednego elementu
    return maxLines * maxItemsPerLine;
  }, [containerWidth, containerHeight, itemHeight, itemGap]);

  const visibleSectors = sectors.slice(0, maxVisibleItems);
  const hiddenCount = sectors.length - visibleSectors.length;

  return (
    <section className={styles.sectors__info}>
      <header className={styles.sectors__header}>SEKTORY</header>
      <div className={styles.sectors__wrapper}>
        {visibleSectors.map((sector) => (
          <span key={sector.id} className={styles.sectors__item}>
            {sector.name}
          </span>
        ))}
        {hiddenCount > 0 && (
          <span className={styles.sectors__more}>+{hiddenCount}</span>
        )}
      </div>
    </section>
  );
};

export default Sectors;
