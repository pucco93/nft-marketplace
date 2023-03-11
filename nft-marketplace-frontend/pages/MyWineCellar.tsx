import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import OwnedCollection from "../components/OwnedCollection/OwnedCollection";
import { useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import MintNFTSection from "../components/MintNFTSection/MintNFTSection";
import data from "../winemakersDB/WinemakersDB.json" assert { type: "JSON" };
import { loadWeb3 } from "../contracts_connections/Contracts_Connections";
import { winemakerChecker } from "../utilities/Utilities";

export interface IMyWineCellarProps {}

const MyWineCellar = (props: IMyWineCellarProps) => {
  const [isWinemaker, setWinemaker] = useState<boolean>(false);
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.value
  );
  loadWeb3();

  useEffect(() => {
    setWinemaker(winemakerChecker(connectedAccount));
  }, [connectedAccount]);

  return (
    <>
      <Header />

      {isWinemaker && <MintNFTSection />}
      <OwnedCollection />
      <Footer />
    </>
  );
};

export default MyWineCellar;
