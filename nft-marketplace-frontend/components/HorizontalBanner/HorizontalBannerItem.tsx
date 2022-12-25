import styles from "./HorizontalBanner.module.scss";
import Winery from "../../models/Winery";
import Image from "next/image";

interface IHorizontalBannerItemProps {
  winery: Winery;
}

const HorizontalBannerItem = (props: IHorizontalBannerItemProps) => {
  return (
    <div className={styles.horizontalItemContainer}>
      <Image
        src={props.winery.image}
        alt="guerrieri vinooo"
        className={styles.wineryImg}
        fill
      />
    </div>
  );
};

export default HorizontalBannerItem;
