import { useEffect, useState } from "react";
import NFTCard from "../NFTCard/NFTCard";
import NFT from '../../models/NFT';
import * as wine from "../../assets//index";
import styles from "./OwnedCollection.module.scss";

const NoCollection = () => {
  return (
    <div className={styles.noCollectionContainer}>
      Non ci sono vini qui, acquistane uno e lo vedrai comparire in questa
      sezione!
    </div>
  );
};

const OwnedCollection = () => {
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    setCollection(mockNFTs);
  }, []);

  return (
    <section className={styles.ownedCollectionContainer}>
      <div className={styles.collectionLabel}>La mia collezione</div>
      {collection?.length ? (
        <div className={styles.myCollectionGridContainer}>
            {collection.map((nft: NFT, index: number) => <NFTCard nft={nft} buyable={false} key={index} />)}
        </div>
      ) : (
        <NoCollection />
      )}
    </section>
  );
};

export default OwnedCollection;


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
  
