import styles from "./NFTGrid.module.scss";
import { useEffect, useState } from "react";
import * as wine from "../../assets//index";
import NFTCard from "../NFTCard/NFTCard";
import NFT from "../../models/NFT";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const NFTGrid = () => {
  // const [nfts] = useGlobalState('nfts');
  const nfts = mockNFTs;
  const [end, setEnd] = useState(12);
  const [count] = useState(12);
  const [collection, setCollection] = useState<NFT[]>([]);

  const getCollection = () => {
    return nfts.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nfts, end]);

  return (
    <section className={styles.gridContainer}>
      <div className={styles.filtersContainer}>
        <div className={styles.titleFilter}>Filtri</div>
        <div className={styles.priceFilter}>
          <div className={styles.priceLabel}>Prezzo</div>
          <RangeSlider defaultValue={[0, 300]} min={0} max={300} step={30}>
            <RangeSliderTrack bg="#b972a8">
              <RangeSliderFilledTrack bg="#820263" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
          </RangeSlider>
        </div>
      </div>
      <div className={styles.marketplaceCollection}>
        <div className={styles.marketplaceLabel}>Marketplace</div>
        <div className={styles.nftCardsContainer}>
          {collection?.length ? (
            collection.map((nft: NFT, index: number) => <NFTCard nft={nft} buyable key={index} />)
          ) : (
            <NoCollection />
          )}
        </div>
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
  return (
    <div className={styles.noNFT}>
      Non ci sono vini in vendita, aspetta che i produttori pubblichino nuove
      annate!
    </div>
  );
};

export default NFTGrid;

const mockNFTs: any[] = [
  {
    id: 1,
    owner: "Ale",
    cost: "0.00000006",
    title: "stgbstdb",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 2,
    owner: "Ale",
    cost: "2.5637",
    title: "jycrjvytm",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 3,
    owner: "Ale",
    cost: "3.653347",
    title: "kvjbkynyku",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 4,
    owner: "Ale",
    cost: "0.8546",
    title: ",jryfjvytgvjkbyu",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 5,
    owner: "Ale",
    cost: "143565",
    title: "",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 6,
    owner: "Ale",
    cost: "0.143246",
    title: "kbthjvbky",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 7,
    owner: "Ale",
    cost: "0.542",
    title: "jkygbjyhtbvy",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 8,
    owner: "Ale",
    cost: "0.7646",
    title: "",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 9,
    owner: "Ale",
    cost: "564.865",
    title: "kuhkuynukynkjbky",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 10,
    owner: "Ale",
    cost: "65798.7675",
    title: "kjnykuybjn",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 11,
    owner: "Ale",
    cost: "5677",
    title: "fwetvfrtgsrt",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 12,
    owner: "Ale",
    cost: "4",
    title: "egwetvsrtvw",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 13,
    owner: "Ale",
    cost: "12.1",
    title: "wervwrvwsrw",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 14,
    owner: "Ale",
    cost: "0.67",
    title: "wtrvwetvwrvtw",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 15,
    owner: "Ale",
    cost: "11.09",
    title: "wvetvwrtvwrvgf",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 16,
    owner: "Ale",
    cost: "0.998",
    title: "vwefvsrfgtvs",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 17,
    owner: "Ale",
    cost: "9",
    title: "aevfrvwsrefvcse",
    description: "sdgvtrews",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 18,
    owner: "Ale",
    cost: "15",
    title: "wbndthnnhfndsfyhryt",
    description: "wetvev",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 19,
    owner: "Ale",
    cost: "12",
    title: "wrtgvdrsvtsdvsdfd",
    description: "wrtbdrsgfv",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
  {
    id: 20,
    owner: "Ale",
    cost: "32",
    title: "sefvsetvstd",
    description: "yrdfbtgberdt",
    metadataURI: wine.tenute_lunelli_example,
    timestamp: "",
  },
];
