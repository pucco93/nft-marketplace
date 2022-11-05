import { ChevronDownIcon } from '@chakra-ui/icons';
import styles from './HeroSection.module.scss';

export interface IHeroSectionProps {

}

const HeroSection = (props: IHeroSectionProps) => {

    return(
        <div className={styles.heroContainer}>
            <img src="vineyard.jpeg" className={styles.heroImg} alt="vineyard hero image" />
            <div className={styles.overlay}></div>
            <ChevronDownIcon className={styles.downArrow} />
        </div>
    );
};

export default HeroSection;