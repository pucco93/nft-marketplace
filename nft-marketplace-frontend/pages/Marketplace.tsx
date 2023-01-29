import React, { useState, useEffect } from "react";
import styles from "../styles/Marketplace.module.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NFTGrid from "../components/NFTGrid/NFTGrid";
import OwnedCollection from "../components/OwnedCollection/OwnedCollection";
import { useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { getWinemakers } from "../managers/APIManager";
import MintNFTSection from "../components/MintNFTSection/MintNFTSection";
import data from "../winemakersDB/WinemakersDB.json" assert { type: "JSON" };

export interface IMarketplaceProps {}

const Marketplace = (props: IMarketplaceProps) => {
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.connectedAccount
  );

  const isWinemaker = () => {
    return data.some((item) => item.id === connectedAccount);
  };

  return (
    <>
      <Header />
      <NFTGrid />

      {/* {isWinemaker() && <MintNFTSection />} */}
      <MintNFTSection />
      <OwnedCollection />
      <Footer />
    </>
  );
};

export default Marketplace;
