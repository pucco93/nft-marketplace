import styles from './Header.module.scss';

const MarketplaceIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 600 600"
      className={styles.marketplaceIcon}
    >
      <g>
        <path d="m554.04 150.02h-74.059v-28.715c0-59.168-48.137-107.31-107.31-107.31h-45.34c-59.168 0-107.31 48.137-107.31 107.31v28.715h-74.055c-9.1797 0-16.625 7.4453-16.625 16.625v362.73c0 9.1797 7.4453 16.625 16.625 16.625h408.07c9.1797 0 16.625-7.4453 16.625-16.625v-362.73c0-9.1836-7.4453-16.625-16.625-16.625zm-300.76-28.715c0-40.836 33.223-74.059 74.059-74.059h45.34c40.836 0 74.059 33.223 74.059 74.059v28.715h-193.46zm284.14 391.44h-374.82v-329.48h57.434v28.715c0 9.1797 7.4453 16.625 16.625 16.625 9.1797 0 16.625-7.4453 16.625-16.625v-28.715h193.45v28.715c0 9.1797 7.4453 16.625 16.625 16.625 9.1797 0 16.625-7.4453 16.625-16.625v-28.715h57.434z" />
      </g>
    </svg>
  );
};

export default MarketplaceIcon;
