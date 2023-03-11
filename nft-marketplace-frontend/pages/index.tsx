import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import HorizontalBanner from "../components/HorizontalBanner/HorizontalBanner";
import MailingList from '../components/MailingList/MailingList';
import Disclaimer from "../components/Disclaimer/Disclaimer";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import {disclaimer_shown} from '../constants/Constants';
import { loadWeb3 } from "../contracts_connections/Contracts_Connections";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  loadWeb3();

  useEffect(() => {
    const isShown = sessionStorage.getItem(disclaimer_shown);
    if(!!!isShown) {
      sessionStorage.setItem(disclaimer_shown, "true");
      onOpen();
    }
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <HorizontalBanner />
      <MailingList />


      <Disclaimer isOpen={isOpen} closeDisclaimer={onClose} />
      <Footer />
    </>
  );
}
