import { useState } from "react";
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
} from "@chakra-ui/react";
import styles from "./NFTCard.module.scss";
import useAlert from "../../hooks/useAlert";
import { setLoading } from "../../store/slices/LoadingSlice";
import { useDispatch } from "react-redux";
import {
  buyNFT,
  updateNFT,
} from "../../contracts_connections/Contracts_Connections";
import { mockNFT } from '../../constants/Constants';

interface INFTCardProps {
  nft: NFT;
  buyable: boolean;
}

const NFTCard = (props: INFTCardProps) => {
  const { metadataURI, title, owner, cost, description } = props.nft;
  const [nft, setNFT] = useState<NFT>(mockNFT);
  const [newPrice, setPrice] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const openNFT = () => {
    setNFT(props.nft);
    onOpen();
  };

  const closeNFT = () => {
    setNFT(mockNFT);
    onClose();
  }

  const _buy = async () => {
    // onOpen();
    dispatch(
      setLoading({
        show: true,
        msg: "Initializing NFT transfer...",
      })
    );

    try {
      const result = await buyNFT(nft);
      if (result) {
        useAlert("Transfer completed...", "green");
        debugger;
        window.location.reload();
      }
    } catch (error) {
      console.log("Error transfering NFT: ", error);
      useAlert("Purchase failed...", "red");
    }
  };

  const _changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(String(event?.target?.value));
  };

  const _updatePrice = async () => {
    debugger
    try {
      const result = await updateNFT({ ...nft, cost: String(newPrice) });
      if (result) {
        useAlert("Price updated...", "green");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error updating file: ", error);
      useAlert("Update failed...", "red");
    }
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={metadataURI}
            alt="nft image"
            className={styles.nftImage}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{title}</div>
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
              <div onClick={openNFT} className={styles.changePriceButton}>
                Cambia prezzo
              </div>
            </>
          )}
        </div>
      </div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={closeNFT}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acquista NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.imgContainerModal}>
              <Image
                src={metadataURI}
                alt="nft image"
                className={styles.nftImage}
              />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.ownerPriceContainer}>
              <div className={styles.owner}>{owner}</div>
              <div className={styles.price}>
                Prezzo {props.buyable ? "" : "corrente:"} {cost} ETH
              </div>
            </div>
            {!props.buyable && 
              <InputGroup className={styles.changePriceInput}>
                <Input type="number" onChange={_changePrice} />
                <InputRightAddon children='ETH' />
              </InputGroup>}
          </ModalBody>

          <ModalFooter>
            {props.buyable ? (
              <>
                <Button  variant="solid" colorScheme="whiteAlpha" mr={3} onClick={_buy}>
                  Acquista
                </Button>
              </>
            ) : (
              <>
                <Button variant="solid" colorScheme="whiteAlpha" mr={3} onClick={_updatePrice}>
                  Aggiorna prezzo
                </Button>
              </>
            )}
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
