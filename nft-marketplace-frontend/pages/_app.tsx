import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { store } from "../store/appStore";
import { Provider } from "react-redux";
import NoSSR from "react-no-ssr";
import customTheme from "../styles/Theme";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <NoSSR>
      <ChakraProvider theme={customTheme}>
        <Provider store={store}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </NoSSR>
  );
};
