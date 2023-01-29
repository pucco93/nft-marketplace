// import wineLogo from '../../public/wineLogo.png';
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import MarketplaceIcon from "./MarketplaceIcon";
import WalletIcon from "./WalletIcon";
import GrapeIcon from "./GrapeIcon";
import QuestionMarkIcon from "./QuestionMarkIcon";
import WinemakerIcon from "./WinemakerIcon";
import { RootState } from "../../store/appStore";
import { connectWallet, loadWeb3 } from "../../contracts_connections/Contracts_Connections";
import logo from "../../assets/wineLogo.png";
import Image from "next/image";
import { Link, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { metamask_account } from "../../constants/Constants";
import { connect, disconnect } from "../../store/slices/ConnectAccountSlice";
import { metamask_logo } from "../../assets/index";
import { checkWinemaker } from "../../utilities/Utilities";
import { setWinemaker, unsetWinemaker } from "../../store/slices/WinemakerSlice";

export interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
  let accountFromSessionStorage = "";
  const dispatch = useDispatch();
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.connectedAccount
  );  
  const isWinemaker = useSelector(
    (state: RootState) => state.winemaker.isWinemaker
  );

  const disconnectAccount = () => {
    sessionStorage.setItem(metamask_account, "");
    dispatch(disconnect());
  };

  useEffect(() => {
    accountFromSessionStorage = sessionStorage.getItem(metamask_account) || "";
    if (!!accountFromSessionStorage) {
      dispatch(connect(accountFromSessionStorage));
    }
    loadWeb3();
  }, []);

  useEffect(() => {
    if(checkWinemaker(connectedAccount)) {
        dispatch(setWinemaker());
    } else {
        dispatch(unsetWinemaker());
    }
  }, [connectedAccount]);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt="site logo" />
        <h1 className={styles.title}>Vevino</h1>
      </Link>
      <div className={styles.routesContainer}>
        {isWinemaker ? <WinemakerLink /> : <MarketplaceLink />}
        <Link href="/Wineries" className={styles.routeContainer}>
          <GrapeIcon />
          Cantine
        </Link>
        <Link href="/How_it_works" className={styles.routeContainer}>
          <QuestionMarkIcon />
          Info
        </Link>
        {!connectedAccount ? (
          <div onClick={connectWallet} className={styles.signInContainer}>
            <WalletIcon />
            Connetti wallet
          </div>
        ) : (
          <AccountMenu
            account={connectedAccount}
            disconnectAccount={disconnectAccount}
          />
        )}
      </div>
    </div>
  );
};

const WinemakerLink = () => {
    return(
        <Link href="/Winemaker" className={styles.routeContainer}>
          <WinemakerIcon />
          La mia cantina
        </Link>
    );
};

const MarketplaceLink = () => {
    return(
        <Link href="/Marketplace" className={styles.routeContainer}>
          <MarketplaceIcon />
          Marketplace
        </Link>
    );
};

interface IAccountMenuProps {
  account: string;
  disconnectAccount: () => void;
}

const AccountMenu = (props: IAccountMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accountRef = useRef(null);

  const openAccountMenu = () => {
    isOpen ? onClose() : onOpen();
  };

  const accountClass = isOpen ? styles.accountOpened : "";

  useOutsideClick({
    ref: accountRef,
    handler: onClose
  });

  return (
    <div
      className={[styles.account, accountClass].join(" ")}
      onClick={openAccountMenu}
      ref={accountRef}
    >
      <Image
        src={metamask_logo}
        alt="metamask img"
        className={styles.accountImg}
      />
      <Text className={styles.accountName}>
        {`${props.account?.slice(0, 8)}...`}
      </Text>
      {isOpen && (
        <Text
          className={styles.disconnectAccount}
          onClick={props.disconnectAccount}
        >
          Disconnetti account
        </Text>
      )}
    </div>
  );
};

export default Header;


{/* <Menu>
<MenuButton
  as={Button}
  leftIcon={
    <Image
      src={metamask_logo}
      alt="metamask img"
      className={styles.accountImg}
    />
  }
>
  {`${props.account?.slice(0, 8)}...`}
</MenuButton>
<MenuList>
  <MenuItem onClick={props.disconnectAccount}>Disconnetti account</MenuItem>
</MenuList>
</Menu> */}