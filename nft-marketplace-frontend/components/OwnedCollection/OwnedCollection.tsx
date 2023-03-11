import NFTCard from "../NFTCard/NFTCard";
import NFT from "../../models/NFT";
import styles from "./OwnedCollection.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/appStore";
import { getMyCollection } from "../../store/selectors";
import data from "../../winemakersDB/WinemakersDB.json" assert { type: "JSON" };
import { Grid, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { winemakerChecker } from "../../utilities/Utilities";

const NoCollection = () => {
  const [isWinemaker, setWinemaker] = useState<boolean>(false);
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.value
  );

  useEffect(() => {
    setWinemaker(winemakerChecker(connectedAccount));
  }, [connectedAccount]);

  return (
    <div className={styles.noCollectionContainer}>
      {connectedAccount === '' ? "Non sei connesso, connetti il tuo wallet o creane uno tramite MetaMask e connettilo al sito per iniziare ad usare il sito." : isWinemaker
        ? "Non ci sono vini qui, acquistane uno o crealo e lo vedrai comparire in questa sezione!"
        : "Non ci sono vini qui, acquistane uno e lo vedrai comparire in questa sezione!"}
    </div>
  );
};

export interface IMyCollectionGridProps {
  myCollection: NFT[];
}

const MyCollectionGrid = (props: IMyCollectionGridProps) => {
  return props?.myCollection?.length ? (
    <div className={styles.myCollectionGridContainer}>
      {props?.myCollection.map((nft: NFT, index: number) => (
        <NFTCard nft={nft} buyable={false} key={index} index={index} />
      ))}
    </div>
  ) : (
    <NoCollection />
  );
};

const OwnedCollection = () => {
  const myCollection = useSelector((state: RootState) =>
    getMyCollection(state)
  );
  const isLoading = useSelector((state: RootState) => state.loading.value);

  return (
    <section className={styles.ownedCollectionContainer}>
      <div className={styles.collectionLabel}>La mia collezione</div>
      {isLoading?.show ? (
        <Grid templateColumns='repeat(5, 1fr)' gap={10} style={{margin: '20px 10px'}}>
          <Skeleton height="400px" />
          <Skeleton height="400px" />
          <Skeleton height="400px" />
          <Skeleton height="400px" />
          <Skeleton height="400px" />
        </Grid>
      ) : (
        <MyCollectionGrid myCollection={myCollection} />
      )}
    </section>
  );
};

export default OwnedCollection;
