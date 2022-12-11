// import wineLogo from '../../public/wineLogo.png';
import styles from './Header.module.scss';
import type { RootState } from '../../store/appStore';
import { useSelector, useDispatch } from 'react-redux';
import MarketplaceIcon from './MarketplaceIcon';
import WalletIcon from './WalletIcon';

export interface IHeaderProps {

}

const Header = (props: IHeaderProps) => {
    const theme = useSelector((state: RootState) => state.changeTheme);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src="/wineLogo.png" />
                <h1 className={styles.title}>Vevino</h1>
            </div>
            <div className={styles.routesContainer}>
                <div className={styles.routeContainer}>
                    Home
                </div>
                <div className={styles.routeContainer}>
                    <MarketplaceIcon />
                    Marketplace
                </div>
                {/* <input id="toggle" className={styles.themeToggle} type="checkbox" /> */}
                <div className={styles.signInContainer}>
                    <WalletIcon />
                    Connect wallet
                </div> {/** Here will go the image when loged in. */}
            </div>
        </div>
    );
};

export default Header;