import {} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./WineryPresenter.module.scss";

interface IWineryPresenterProps {
  wineries: any;
}

const WineryPresenter = (props: IWineryPresenterProps) => {
  const [zoom, updateZoom] = useState<number>(-1);

  return (
    <section className={styles.wineryPresenter}>
      {props.wineries.map((winery: any, index: number) => (
        <div className={styles.gridElement} key={index}>
          <Image
            className={styles.bgImage}
            src={winery.bgImage}
            alt={`${winery.title} background image`}
            width={600}
            height={600}
            style={{transform: `scale(${zoom === index ? '1.1' : '1'})`}}
          />
          <a href={winery.site} className={styles.bgImageOverlay} onMouseEnter={() => updateZoom(index)} onMouseLeave={() => updateZoom(-1)}>
            <div className={styles.infoContainer}>
              <Image
                className={styles.wineryLogo}
                src={winery.logoImage}
                alt={`${winery.title} logo`}
                width={220}
                height={220}
              />
              <div className={styles.description}>{winery.description}</div>
            </div>
          </a>
        </div>
      ))}
    </section>
  );
};

export default WineryPresenter;
