// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme({
  colors: {
    customPrimary: {
        50: '#b972a8',
        100: '#b972a8',
        200: '#ab5697',
        300: '#ab5697',
        400: '#9d3a85',
        500: '#9d3a85',
        600: '#8f1e74',
        700: '#8f1e74',
        800: '#820263',
        900: '#820263',
    },
  },
});

export default customTheme;