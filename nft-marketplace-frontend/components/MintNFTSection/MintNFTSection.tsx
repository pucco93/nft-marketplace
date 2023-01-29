import React, { useCallback, useState } from "react";
import styles from "./MintNFTSection.module.scss";
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
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";

interface IMintNFTSectionProps {}

interface FormModel {
  title: string;
  image: any;
  description: string;
  price: string;
}

const mockForm = {
  title: "",
  image: undefined,
  description: "",
  price: "",
};

const MintNFTSection = (props: IMintNFTSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, updateForm] = useState<FormModel>(mockForm);
  const [isDisabled, updateDisabled] = useState<boolean>(true);

  const _updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      updateForm({ ...form, title: event.target.value });
      checkForm();
    }
  };

  const _updateDescription = (event: any) => {
    if (event.target.value !== "") {
      updateForm({ ...form, description: event.target.value });
      checkForm();
    }
  };

  const _updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      updateForm({ ...form, price: event.target.value });
      checkForm();
    }
  };

  const _updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files[0]) {
      let file = URL.createObjectURL(event.target.files[0]);
      updateForm({ ...form, image: file });
      checkForm();
    }
  };

  const checkForm = () => {
    if(Object.values(form).some(value => !value)) {
      updateDisabled(true);
    }
  };

  const _onClose = () => {
    onClose();
    updateForm(mockForm);
  };

  const _mint = () => {};

  return (
    <div className={styles.mintSection}>
    <div className={styles.nftCreationLabel}>Creazione NFT</div>
      <Button
        variant="outline"
        mr={3}
        onClick={onOpen}
        className={styles.mintButton}
      >
        Crea NFT
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className={styles.formControl}>
              <FormLabel>Nome</FormLabel>
              <Input type="text" onChange={_updateTitle} />
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Immagine</FormLabel>
              <input type="file" onChange={_updateFile} className={styles.imageInput} />
              {form?.image ? <Image
                src={form.image}
                width={250}
                height={250}
                alt="nft image"
                className={styles.nftImage}
              /> : <div className={styles.imagePlaceholder}></div>}
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Descrizione</FormLabel>
              <Textarea onChange={_updateDescription} />
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Prezzo</FormLabel>
              <InputGroup className={styles.changePriceInput}>
                <Input type="number" onChange={_updatePrice} />
                <InputRightAddon children="ETH" />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme="whiteAlpha"
              mr={3}
              onClick={_mint}
              disabled={isDisabled}
            >
              Crea
            </Button>
            <Button variant="outline" mr={3} onClick={_onClose}>
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MintNFTSection;
