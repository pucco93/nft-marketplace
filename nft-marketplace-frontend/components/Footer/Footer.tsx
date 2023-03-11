import { useState } from "react";
import styles from "./Footer.module.scss";
import {
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiFillWindows,
  AiFillYoutube,
} from "react-icons/ai";
import { Window, WindowHeader, Button, Toolbar, WindowContent } from "react95";
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";

export interface IFooterProps {
  isStepper?: boolean;
}

const Footer = (props: IFooterProps) => {
  const {
    isOpen: isWin95Open,
    onOpen: openWin95,
    onClose: closeWin95,
  } = useDisclosure();
  const [isWorking, updateIsWorking] = useState<boolean>(false);

  const openLinkedin = () => {
    window.open(
      "https://www.linkedin.com/in/alessandro-pucci-2b0537171/",
      "blank"
    );
  };

  const openGitHub = () => {
    window.open("https://github.com/pucco93", "blank");
  };

  const openYoutube = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "blank");
  };

  const openWindows = () => {
    openWin95();
  };

  const closeWin = () => {
    updateIsWorking(false);
    closeWin95();
  };

  return (
    <>
      <section
        className={styles.footerSection}
        style={
          {
            position: `${props.isStepper ? 'fixed' : ''}`,
            width: `${props.isStepper ? 'calc(100vw - 190px)' : ''}`,
            margin: `${props.isStepper ? '30px 95px' : '30px 50px'}`
          }
        }>
        <Text className={styles.projectText}>
          Distributed Systems university project. 2022
        </Text>
        <div className={styles.leftSocialContainer}>
          <IconButton
            aria-label="linkedin button"
            as={AiFillLinkedin}
            className={styles.linkedin}
            onClick={openLinkedin}
            variant="ghost"
          />
          <IconButton
            aria-label="github button"
            as={AiOutlineGithub}
            className={styles.github}
            onClick={openGitHub}
            variant="ghost"
          />
          <IconButton
            aria-label="windows button"
            as={AiFillWindows}
            className={styles.windows}
            onClick={openWindows}
            variant="ghost"
          />
          <IconButton
            aria-label="youtube button"
            as={AiFillYoutube}
            className={styles.youtube}
            onClick={openYoutube}
            variant="ghost"
          />
        </div>
      </section>
      <ThemeProvider theme={original}>
        <Modal isOpen={isWin95Open} onClose={closeWin}>
          <ModalOverlay />
          <ModalContent>
            <Window>
              <WindowHeader className={styles.win95Header}>
                Vevino-NFT-Marketplace.exe{" "}
                <Button onClick={closeWin} className={styles.closeWin95Icon}>
                  <span>X</span>
                </Button>
              </WindowHeader>
              <Toolbar>
                <Button variant="menu" size="sm" onClick={() => updateIsWorking(true)}>
                  File
                </Button>
                <Button variant="menu" size="sm" disabled>
                  Edit
                </Button>
                <Button variant="menu" size="sm" disabled>
                  Save
                </Button>
              </Toolbar>
              <WindowContent>
                <p>
                  Oh no cosa hai fatto? Hai per caso provato a comprare troppi
                  NFT ed ora ti sei ritrovato indietro nel tempo??
                </p>
                <br />
                <p>
                  È il 1995 windows ha da poco rilasciato Windows 95, io ho 2
                  anni e tu non sai come sei finito qui!
                </p>
                <br />
                <p>
                  Una cosa peró é sicura, ora sai tutto dei prossimi 28 anni,
                  fanne buon uso!
                </p>
                {isWorking && (
                  <p className={styles.danger}>Vevino-NFT-Marketplace.exe ha smesso di funzionare!</p>
                )}
                <Button className={styles.closeButton} onClick={closeWin}>Chiudi</Button>
              </WindowContent>
            </Window>
          </ModalContent>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default Footer;
