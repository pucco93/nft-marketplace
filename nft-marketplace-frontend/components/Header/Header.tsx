// import wineLogo from '../../public/wineLogo.png';
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import MarketplaceIcon from "./MarketplaceIcon";
import WalletIcon from "./WalletIcon";
import GrapeIcon from "./GrapeIcon";
import QuestionMarkIcon from "./QuestionMarkIcon";
import { RootState } from "../../store/appStore";
import {
  connectWallet
} from "../../contracts_connections/Contracts_Connections";
import logo from "../../public/assets/wineLogo.png";
import Image from "next/image";
import {
  Button,
  Link,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { metamask_account } from "../../constants/Constants";
import { connect, disconnect } from "../../store/slices/ConnectAccountSlice";
import { metamask_logo } from "../../public/assets/index";
import { checkWinemaker } from "../../utilities/Utilities";
import {
  setWinemaker,
  unsetWinemaker,
} from "../../store/slices/WinemakerSlice";
import MyColletionIcon from "./MyCollectionIcon";
import { getConnectedAccount } from "../../store/selectors";

export interface IHeaderProps {
  isStepper?: boolean;
}

const Header = (props: IHeaderProps) => {
  let accountFromSessionStorage = "";
  const dispatch = useDispatch();
  const connectedAccount = useSelector((state: RootState) => getConnectedAccount(state));

  const disconnectAccount = () => {
    sessionStorage.setItem(metamask_account, "");
    dispatch(disconnect());
  };

  useEffect(() => {
    accountFromSessionStorage = sessionStorage.getItem(metamask_account) || "";
    if (!!accountFromSessionStorage) {
      dispatch(connect(accountFromSessionStorage));
    }
  }, []);

  useEffect(() => {
    if (checkWinemaker(connectedAccount)) {
      dispatch(setWinemaker());
    } else {
      dispatch(unsetWinemaker());
    }
  }, [connectedAccount]);

  return (
    <>
      <div
        className={styles.container}
        style={{position: `${props.isStepper ? 'fixed' : ''}` as 'fixed'}}
      >
        <HomeLink />
        <div className={styles.routesContainer}>
          <MyWineCellarLink />
          <MarketplaceLink />
          <WineriesLink />
          <HowItWorksLink />
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
    </>
  );
};

const HomeLink = () => {
  return (
    <Button variant="ghost" className={styles.buttonLogoContainer}>
      <Link href="/" className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt="site logo" />
        <h1 className={styles.title}>Vevino</h1>
      </Link>
    </Button>
  );
};

const MarketplaceLink = () => {
  return (
    <Button variant="ghost">
      <Link href="/Marketplace" className={styles.routeContainer}>
        <MarketplaceIcon />
        Marketplace
      </Link>
    </Button>
  );
};

const MyWineCellarLink = () => {
  return (
    <Button variant="ghost">
      <Link href="/MyWineCellar" className={styles.routeContainer}>
        <MyColletionIcon />
        La mia cantina
      </Link>
    </Button>
  );
};

const WineriesLink = () => {
  return (
    <Button variant="ghost">
      <Link href="/Wineries" className={styles.routeContainer}>
        <GrapeIcon />
        Cantine
      </Link>
    </Button>
  );
};

const HowItWorksLink = () => {
  return (
    <Button variant="ghost">
      <Link href="/How_it_works" className={styles.routeContainer}>
        <QuestionMarkIcon />
        Info
      </Link>
    </Button>
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
    handler: onClose,
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
