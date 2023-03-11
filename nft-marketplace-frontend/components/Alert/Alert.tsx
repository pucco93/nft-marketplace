import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/appStore";
import styles from "./Alert.module.scss";

const AlertComponent = () => {
  const alert = useSelector((state: RootState) => state.alert.value);

  return (
    <>
      {alert?.show && (
        <Alert
          status={alert.color === "red" ? "error" : "success"}
          className={styles.alert}
        >
          <AlertIcon />
          <AlertTitle>{alert.color === "red" ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{alert.msg}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
