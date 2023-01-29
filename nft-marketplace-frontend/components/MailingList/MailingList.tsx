import {
  Button,
  InputGroup,
  Checkbox,
  Input,
  Text,
  FormErrorMessage,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import styles from "./MailingList.module.scss";
import {mailing_list} from '../../constants/Constants';

interface IMailingListProps {}

const MailingList = (props: IMailingListProps) => {
  const [isDisabled, changeDsabledStatus] = useState<boolean>(true);
  const [emailValue, updateEmail] = useState<string>("");
  const [isAccepted, changeAcceptStatus] = useState<boolean>(false);
  const [isUserInMailingList, updateMailingList] = useState<boolean>(false);

  const addMail = () => {
    sessionStorage.setItem(mailing_list, emailValue);
    updateMailingList(true);
  };

  useEffect(() => {
    const isInMailingList = sessionStorage.getItem(mailing_list);
    if (isInMailingList) {
      updateMailingList(true);
    }
  }, []);

  useEffect(() => {
    if (
      isAccepted &&
      emailValue &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm.test(emailValue)
    ) {
      changeDsabledStatus(false);
    } else {
      changeDsabledStatus(true);
    }
  }, [emailValue, isAccepted]);

  return (
    <section className={styles.mailingListSection}>
      {isUserInMailingList ? (
        <Text className={styles.congratsMessagge}>Grazie per esserti iscritto!</Text>
      ) : (
        <>
          <div className={styles.title}>Non perdere mai un'eccellenza</div>
          <Text className={styles.callToAction}>
            Iscriviti per ricevere informazioni sulle novità
          </Text>
          <InputGroup>
            <div className={styles.emailTextareaContainer}>
              <Input
                type="email"
                className={styles.inputEmail}
                placeholder="example@gmail.com"
                onChange={(event) => updateEmail(event.target.value)}
              />
              <InputRightElement width="auto">
                <Button
                  className={styles.buttonEmail}
                  disabled={isDisabled}
                  onClick={addMail}
                >
                  Iscriviti
                </Button>
              </InputRightElement>
            </div>
            <FormErrorMessage>Inserisci una email corretta</FormErrorMessage>
          </InputGroup>
          <Text className={styles.legalDisclaimer}>
            Dopo aver letto la Informativa sulla privacy, potrai iscriverti alla
            nostra newsletter per ricevere offerte speciali e sondaggi
            occasionali alla tua casella di posta. Annulla l'iscrizione in
            qualsiasi momento cliccando sul link contenuto nell'email.
          </Text>
          <FormControl className={styles.checkBoxContainer}>
            <Checkbox
              className={styles.checkbox}
              onChange={() => changeAcceptStatus(!isAccepted)}
            />
            <FormLabel style={{marginBottom: 0}}>
              Digitando la mia email e iscrivendomi confermo e accetto quanto
              sopra.
            </FormLabel>
          </FormControl>
        </>
      )}
    </section>
  );
};

export default MailingList;
