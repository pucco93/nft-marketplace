import styles from "./HorizontalBanner.module.scss";
import Winery from "../../models/Winery";
import HorizontalBannerItem from "./HorizontalBannerItem";
import * as logos from '../../assets/index';

const HorizontalBanner = () => {
  const wineries = [
    // {
    //   id: 'dcefcb5b-bf0a-42c8-8bd5-bfe12e3e1caa',
    //   name: "Guerrieri",
    //   image: logos.guerrieri_logo,
    // },
    {
      id: 'e6d41b97-a035-44fb-99a8-d3941e35b13f',
      name: "Marchesi Antinori",
      image: logos.marchesi_antinori_logo,
    },
    {
      id: '74918ed7-1d91-477d-b657-9ceefbf50c92',
      name: "Colle Massari",
      image: logos.collemassari_logo,
    },
    {
      id: '828c560e-448b-42fd-9280-9ad7bdcb9b79',
      name: "Filodivino",
      image: logos.filodivino_logo,
    },
    {
      id: '2015d326-f64d-42a7-b641-49c9d2119b8e',
      name: "Frescobaldi",
      image: logos.frescobaldi_logo,
    },
    {
      id: '0b443b8b-5932-49aa-977e-a25d9bef528d',
      name: "Petra",
      image: logos.petra_logo,
    },
    {
      id: '4b557a2e-f2fe-48a7-a2e3-da9c26142219',
      name: "Tenute Lunelli",
      image: logos.tenute_lunelli,
    },
    {
      id: '29a0a74a-4dbb-427e-b70d-214d8c6c4c43',
      name: "Mezzacorona",
      image: logos.logo_mezzacorona,
    },
  ];

  return (
    <section className={styles.horizontalItemsSection} >
      <div className={styles.divider}>
        <svg
          className={styles.editorial}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles.parallax1}>
            <use xlinkHref="#gentle-wave" x="20" y="3" />
          </g>
          <g className={styles.parallax2}>
            <use xlinkHref="#gentle-wave" x="20" y="0" />
          </g>
          <g className={styles.parallax3}>
            <use xlinkHref="#gentle-wave" x="20" y="9" />
          </g>
          <g className={styles.parallax4}>
            <use xlinkHref="#gentle-wave" x="20" y="6" />
          </g>
        </svg>
      </div>
      <div className={styles.bannerContainer}>
        <p className={styles.ourProducers}>Cantine</p>
        <div className={styles.horizontalSliderContainer}>
          {wineries.map((winery: Winery, index: number) => (
            <HorizontalBannerItem winery={winery} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalBanner;
