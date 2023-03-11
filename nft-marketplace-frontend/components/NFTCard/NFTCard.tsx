import { useEffect, useState } from "react";
import NFT from "../../models/NFT";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputRightAddon,
  Input,
  Button,
  useDisclosure,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import styles from "./NFTCard.module.scss";
import useAlert from "../../hooks/useAlert";
import { useSelector } from "react-redux";
import {
  buyNFT,
  updateNFT,
  updateNFTPrivacy
} from "../../contracts_connections/Contracts_Connections";
import { mockNFT } from "../../constants/Constants";
import { RootState } from "../../store/appStore";
import AlertComponent from "../Alert/Alert";
import { retrieveImagePath } from "../../utilities/Utilities";

interface INFTCardProps {
  nft: NFT;
  buyable: boolean;
  index: number;
}

const NFTCard = (props: INFTCardProps) => {
  const { metadataURI, name, owner, cost, description, year } = props.nft;
  const [nft, setNFT] = useState<NFT>(mockNFT);
  const [image, setImage] = useState<string>("");
  const [newPrice, setPrice] = useState<string>("");
  const [privacy, setPrivacy] = useState<boolean>(nft.isBuyable);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connectedAccount: string = useSelector(
    (state: RootState) => state.connectAccount.value
  );

  const openNFT = () => {
    setNFT(props.nft);
    onOpen();
  };

  const closeNFT = () => {
    setNFT(mockNFT);
    onClose();
  };

  const _buy = async () => {
    try {
      const result = await buyNFT(nft);
      if (result) {
        useAlert("Acquisto effettuato...", "green");
        window.location.reload();
      }
    } catch (error) {
      console.log("Errore nel transferire l'NFT: ", error);
      useAlert("Acquisto fallito...", "red");
    }
  };

  const _changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(String(event?.target?.value));
  };

  const _changePrivacy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacy(event?.target?.checked);
  };

  const _updatePrice = async () => {
    if (!newPrice) return;
    try {
      const result = await updateNFT({ ...nft, cost: String(newPrice) });
      if (result) {
        useAlert("Prezzo aggiornato...", "green");
        window.location.reload();
      }
    } catch (error) {
      console.log("Errore nel cambiare il prezzo: ", error);
      useAlert("Prezzo non aggiornato...", "red");
    }
  };

  const _updatePrivacy = async () => {
    if (privacy === nft.isBuyable || privacy === undefined) return;
    try {
      const result = await updateNFTPrivacy({ ...nft, isBuyable: privacy });
      if (result) {
        useAlert(`Bottiglia ${privacy ? 'di nuovo in vendita' : 'bottiglia rimossa dalla vendita'}`, "green");
        window.location.reload();
      }
    } catch (error) {
      console.log(`Errore nel ${privacy ? 'mettere la bottiglia in vendita' : 'rimuovere la bottiglia dalla vendita'}: `, error);
      useAlert(`Errore nel ${privacy ? 'mettere la bottiglia in vendita' : 'rimuovere la bottiglia dalla vendita'}`, "red");
    }
  };

  const _updateNFT = () => {
    if(nft.isBuyable !== privacy) {
      _updatePrivacy();
    } else if(nft.cost !== newPrice) {
      _updatePrice();
    }
  };

  const _getImage = async () => {
    const newImage = await retrieveImagePath(metadataURI);
    setImage(newImage);
  };

  const _changeImage = () => {
    setImage("/assets/unavailable_image.png");
  };

  useEffect(() => {
    _getImage();
  }, []);

  const loginFooter = (
    <div className={styles.loginBefore}>
      Effettua il login per poter aquistare
    </div>
  );

  const footer = props.buyable ? (
    <>
      <Button variant="solid" colorScheme="whiteAlpha" mr={3} onClick={_buy}>
        Acquista
      </Button>
    </>
  ) : (
    <>
      <Button
        variant="solid"
        colorScheme="whiteAlpha"
        mr={3}
        onClick={_updateNFT}
      >
        Aggiorna la bottiglia
      </Button>
    </>
  );

  return (
    <>
      <div
        className={styles.cardContainer}
        style={{ animationDelay: `${props.index * 50}ms` }}
      >
        <div className={styles.imgContainer}>
          {image && (
            <Image
              src={encodeURI(image)}
              alt="nft image"
              className={styles.nftImage}
              fill
              onError={_changeImage}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{name}</div>
          <div className={styles.currentOwner}>{owner}</div>
          <div className={styles.descriptionContainer}>{description}</div>
          {props.buyable ? (
            <>
              <div className={styles.costContainer}>{cost} ETH</div>
              <div onClick={openNFT} className={styles.buyButton}>
                Acquista
              </div>
            </>
          ) : (
            <>
              <div className={styles.costContainer}>{cost} ETH</div>
              <div onClick={openNFT} className={styles.editButton}>
                Modifica bottiglia
              </div>
            </>
          )}
        </div>
      </div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={closeNFT}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.buyable
              ? "Acquista NFT"
              : "Modifica bottiglia"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.imgContainerModal}>
              {image && (
                <Image
                  src={encodeURI(image)}
                  alt="nft image"
                  className={styles.nftImage}
                  fill
                  onError={() => setImage("/assets/unavailable_image.png")}
                />
              )}
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.ownerPriceContainer}>
              <div className={styles.owner}>{owner}</div>
              <div className={styles.price}>
                Prezzo {props.buyable ? "" : "corrente:"} {cost} ETH
              </div>
              <div className={styles.price}>
                Anno {year}
              </div>
            </div>
            {!props.buyable && (
              <InputGroup className={styles.privatizeInput}>
                <FormLabel>{ nft.isBuyable ? "Rendere privato?" : "Mettere in vendita?" }</FormLabel>
                <Switch defaultChecked={nft.isBuyable} size='md' onChange={_changePrivacy} />
              </InputGroup>
            )}
            {!props.buyable && (
              <InputGroup className={styles.changePriceInput}>
                <Input type="number" min={0} onChange={_changePrice} placeholder="Nuovo prezzo" />
                <InputRightAddon children="ETH" />
              </InputGroup>
            )}
            <AlertComponent />
          </ModalBody>

          <ModalFooter>
            {connectedAccount ? footer : loginFooter}
            <Button variant="outline" mr={3} onClick={closeNFT}>
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NFTCard;
