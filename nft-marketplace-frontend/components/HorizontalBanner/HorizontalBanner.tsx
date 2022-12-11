import styles from "./HorizontalBanner.module.scss";

const HorizontalBanner = () => {
  const ourProducers = [
    "Guerrieri" // Inserisci altri vini
  ];

  return (
    <div className={styles.bannerContainer}>
      <p className={styles.ourProducers}>I nostri fornitori:</p>
      <div className={styles.horizontalSlider}></div>
    </div>
  );
};

export default HorizontalBanner;
