import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useRef } from "react";
import styles from "./HeroSection.module.scss";
import bgImg from "../../assets/vineyard.jpeg";

export interface IHeroSectionProps {}

const HeroSection = (props: IHeroSectionProps) => {
  const arrowRef = useRef<SVGSVGElement>(null);

  const scroll = () => {
    const { top, bottom, height } = arrowRef?.current?.getBoundingClientRect();
    window.scrollBy({top: top + bottom + height, behavior: 'smooth'});
  };

  return (
    <section className={styles.heroContainer}>
      <Image src={bgImg} className={styles.heroImg} alt="vineyard hero image" />
      <div className={styles.overlay}>
        <text y="103.561" x="46.446" className={styles.text}>
          Vevino
        </text>
      </div>
      <ChevronDownIcon
        ref={arrowRef}
        className={styles.downArrow}
        onClick={scroll}
      />
    </section>
  );
};

export default HeroSection;
