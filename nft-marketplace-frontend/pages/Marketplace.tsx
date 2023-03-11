import React, { useState, useEffect } from "react";
import styles from "../styles/Marketplace.module.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NFTGrid from "../components/NFTGrid/NFTGrid";
import { loadWeb3 } from "../contracts_connections/Contracts_Connections";

export interface IMarketplaceProps {}

const Marketplace = (props: IMarketplaceProps) => {
  loadWeb3();

  return (
    <>
      <Header />
      <NFTGrid />
      <Footer />
    </>
  );
};

export default Marketplace;
