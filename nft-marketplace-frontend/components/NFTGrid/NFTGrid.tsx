import styles from "./NFTGrid.module.scss";
import { useEffect, useState } from "react";
import NFTCard from "../NFTCard/NFTCard";
import NFT from "../../models/NFT";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store/appStore";
import { getCollection, getCount, getSortField, getSortOrder } from "../../store/selectors";
import Filters from "./Filters/Filters";
import { Grid, Skeleton } from "@chakra-ui/react";

export interface IMarketplaceGridProps {
  collection: NFT[];
}

const MarketplaceGrid = (props: IMarketplaceGridProps) => {
  return (
      props?.collection?.length ? (
        <div className={styles.nftCardsContainer}>
          { props?.collection.map((nft: NFT, index: number) => <NFTCard nft={nft} buyable key={index} index={index} />)}
        </div> ) : 
      <NoCollection />
  );
};

const NFTGrid = () => {
  const count = useSelector((state: RootState) => getCount(state));
  const [end, setEnd] = useState(count);
  const nfts = useSelector(
    (state: RootState) => getCollection(state),
    shallowEqual
  );
  const [collection, updateCollection] = useState<NFT[]>([]);
  const isLoading = useSelector((state: RootState) => state.loading.value);

  const _getCollection = () => {
    return nfts?.filter(item => item.isBuyable)?.slice(0, end);
  };

  useEffect(() => {
    updateCollection(_getCollection());
    setEnd(count);
  }, [nfts, count]);

  return (
    <section className={styles.gridContainer}>
      <div className={styles.filtersContainer}>
        <Filters />
      </div>
      <div className={styles.marketplaceCollection}>
        <div className={styles.marketplaceLabel}>Marketplace</div>
        {isLoading.show ? (
          <Grid templateColumns="repeat(4, 1fr)" gap={10} style={{margin: '20px 10px'}}>
            <Skeleton height="400px" className={styles.skeletonCard} />
            <Skeleton height="400px" className={styles.skeletonCard} />
            <Skeleton height="400px" className={styles.skeletonCard} />
            <Skeleton height="400px" className={styles.skeletonCard} />
          </Grid>
        ) : (
          <MarketplaceGrid collection={collection} />
        )}
        {collection.length > 0 && nfts.length > collection.length && (
          <div
            className={styles.loadMoreButton}
            onClick={() => setEnd(end + count)}
          >
            Carica altro
          </div>
        )}
      </div>
    </section>
  );
};


const NoCollection = () => {
  const connectedAccount = useSelector((state: RootState) => state.connectAccount.value);
  return (
    <div className={styles.noNFT}>
      { connectedAccount === '' ? "Non sei connesso, connetti il tuo wallet o creane uno tramite MetaMask e connettilo al sito per iniziare ad usare il sito." : 'Non ci sono vini in vendita, aspetta che i produttori pubblichino nuove annate!' }
    </div>
  );
};

export default NFTGrid;
