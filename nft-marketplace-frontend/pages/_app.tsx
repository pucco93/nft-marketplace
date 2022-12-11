import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  ColorModeScript,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import { store } from "../store/appStore";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <Provider store={store}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
