import { createTheme } from "@mui/system";

const palette = {
  prime: "#E6007E",
  dark: "#2B2926",
  bg: "#FFFFFF",
  gray1: "#F8F8F8",
  gray2: "#EEEEEE",
  gray3: "#D0D0D0",
};

export const theme = createTheme({
  palette: {
    prime: palette.prime,
    dark: palette.dark,
    bg: palette.bg,
    gray1: palette.gray1,
    gray2: palette.gray2,
    gray3: palette.gray3,
  },
});
