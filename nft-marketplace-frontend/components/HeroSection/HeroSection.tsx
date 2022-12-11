import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import styles from "./HeroSection.module.scss";

export interface IHeroSectionProps {}

const HeroSection = (props: IHeroSectionProps) => {
    let _x: number = 0;
    let _y: number = 0;
    const initialScroll: number = 0;

    const scrollAnimation = {
        transform: `translate(${_x}, ${_y})`
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let body = document.querySelector("body");
            if(body) {
                body.scrollTop;
            }
        });
    }, []);

  return (
    <section className={styles.heroContainer}>
      <img
        src="vineyard.jpeg"
        className={styles.heroImg}
        alt="vineyard hero image"
      />
      {/* <video
        className={styles.videoBg}
        src="pouring_wine.mp4"
        muted={true}
        autoPlay={true}
      /> */}
      <div className={styles.overlay}>
        <text y="103.561" x="46.446" className={styles.text} style={scrollAnimation}>
          Vevino
        </text>
      </div>
      <ChevronDownIcon className={styles.downArrow} />
    </section>
  );
};

export default HeroSection;
