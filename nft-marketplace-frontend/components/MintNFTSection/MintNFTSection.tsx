import React, { useEffect, useState } from "react";
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
  Progress,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import nftAPIManager from "../../managers/NFTStorageManager";
import NFTToMint from "../../models/NFTToMint";
import { RootState } from "../../store/appStore";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../Alert/Alert";
import { setLoading } from "../../store/slices/LoadingSlice";

interface IMintNFTSectionProps {}

const MintNFTSection = (props: IMintNFTSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMultiple, setMultiple] = useState<boolean>(false);
  const dispatch = useDispatch();
  const connectedAccount = useSelector(
    (state: RootState) => state.connectAccount.value
  );

  const mockForm = {
    name: "",
    image: undefined,
    description: "",
    price: "",
    author: connectedAccount,
    year: 0,
  };

  const [form, updateForm] = useState<NFTToMint>(mockForm);
  const [isDisabled, updateDisabled] = useState<boolean>(true);
  const isLoading = useSelector((state: RootState) => state.loading.value.show);

  const currentYear = (new Date()).getFullYear();
  const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  const yearOptions = range(currentYear + 25, currentYear - 25, -1);

  useEffect(() => {
    updateForm({ ...form, author: connectedAccount });
    checkForm();
  }, [connectedAccount]);

  const _updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      updateForm({ ...form, name: event.target.value });
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

  const _updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      updateForm({ ...form, amountToMint: Number(event.target.value) });
      checkForm();
    }
  };

  const _updateYear = (event: any) => {
    if (!event?.target?.value) return;
    updateForm({ ...form, year: Number(event.target.value) });
    checkForm();
  };

  const _updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      let file = event.target.files[0];
      updateForm({ ...form, image: file });
      checkForm();
    }
  };

  const checkForm = () => {
    if (Object.values(form).some((value) => !value)) {
      updateDisabled(true);
    } else {
      updateDisabled(false);
    }
  };

  const _onClose = () => {
    onClose();
    updateForm(mockForm);
  };

  const _mint = async () => {
    dispatch(
      setLoading({
        show: true,
        msg: "",
      })
    );
    const isCreated = await nftAPIManager.mint(form);
    if (isCreated) {
      onClose();
    }
  };

  const _mintMultiple = async () => {
    if (form.amountToMint) {
      dispatch(
        setLoading({
          show: true,
          msg: "",
        })
      );

      const requests = [];
      for (let i = 1; i <= form.amountToMint; i++) {
        let newBottle = {
          ...form,
          name: `${form.name} ${i}/50`,
        };
        requests.push(nftAPIManager.mint(newBottle));
      }
      const isCreated = await Promise.all(requests);
      if (isCreated) {
        onClose();
      }
    }
  };

  return (
    <div className={styles.mintSection}>
      <div className={styles.nftCreationLabel}>Creazione NFT</div>
      <Button
        variant="outline"
        mr={3}
        onClick={() => {
          setMultiple(false);
          onOpen();
        }}
        className={styles.mintButton}
      >
        Crea NFT
      </Button>
      {/* <Tooltip label="Questa funzione arriverá in futuro!" aria-label="tooltip"> */}
      <Button
        variant="outline"
        mr={3}
        onClick={() => {
          setMultiple(true);
          onOpen();
        }}
        className={styles.mintButton}
      >
        Crea una intera annata
      </Button>
      {/* </Tooltip> */}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={_onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isMultiple ? "Crea NFTs" : "Crea NFT"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className={styles.formControl}>
              <FormLabel>
                Nome (verrá automaticamente aggiunto un numero per identificare
                ogni bottiglia, es. 1/40)
              </FormLabel>
              <Input type="text" onChange={_updateTitle} />
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Immagine</FormLabel>
              <input
                type="file"
                onChange={_updateFile}
                className={styles.imageInput}
              />
              {form?.image ? (
                <Image
                  src={URL?.createObjectURL(form.image)}
                  width={250}
                  height={250}
                  alt="nft image"
                  className={styles.nftImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}></div>
              )}
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Descrizione</FormLabel>
              <Textarea onChange={_updateDescription} />
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Prezzo</FormLabel>
              <InputGroup className={styles.changePriceInput}>
                <Input type="number" min={0} onChange={_updatePrice} />
                <InputRightAddon children="ETH" />
              </InputGroup>
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Anno di produzione</FormLabel>
              <Select
                variant="outline"
                placeholder="Seleziona l'anno"
                colorScheme="customPrimary"
                className={styles.yearInput}
                onChange={_updateYear}
                value={form.year}
              >
                {yearOptions?.map((year: number, index: number) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl className={styles.formControl}>
              <FormLabel>Quantitá (tra 1 e 50)</FormLabel>
              <InputGroup className={styles.amountInput}>
                <Input
                  type="number"
                  min={0}
                  max={50}
                  onChange={_updateAmount}
                />
              </InputGroup>
            </FormControl>
            {isLoading && (
              <div className={styles.loader}>
                <Progress size="sm" isIndeterminate />
              </div>
            )}

            <AlertComponent />
          </ModalBody>

          <ModalFooter>
            {!isLoading && (
              <Tooltip
                isDisabled={!isDisabled}
                label="Controlla di essere connesso!"
              >
                <Button
                  variant="solid"
                  mr={3}
                  onClick={isMultiple ? _mintMultiple : _mint}
                  disabled={isDisabled}
                >
                  Crea
                </Button>
              </Tooltip>
            )}
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
