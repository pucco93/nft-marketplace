import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button
} from "@chakra-ui/react";

export interface IDisclaimerProps {
  isOpen: boolean;
  closeDisclaimer: () => void;
}

const Disclaimer = (props: IDisclaimerProps) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.closeDisclaimer}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Disclaimer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            Non detengo in alcun modo alcun diritto riguardo loghi e/o immagini presenti sul sito o all'interno del progetto, qualora un qualsiasi contenuto leda in maniera offensiva/diffamatoria o non lo si ritenga congruo con l'immagine della propria persona e/o azienda, mi contatti tramite la piattaforma GitHub e provvederó alla cancellazione di tale contenuto al piú presto.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={props.closeDisclaimer}>
            Chiudi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Disclaimer;
