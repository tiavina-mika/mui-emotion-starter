import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider, Box } from "@mui/material";
import { theme } from "./src/utils/theme";
import Routes from "./src/Routes";
import { GlobalStyles } from "./src/GlobalStyle";
import { FORCE_MOBILE } from "./src/utils/constants";

const sx = {
  content: {
    width: 390,
    border: "1px solid #F0F0F0",
    borderRadius: 6,
    overflow: "hidden"
  }
};

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <GlobalStyles theme={theme} />
          {FORCE_MOBILE ? (
            <Box className="flexCenter" bgcolor="#000">
              <Box className="positionRelative" sx={sx.content} bgcolor="#fff">
                <Routes />
              </Box>
            </Box>
          ) : (
            <Routes />
          )}
        </EmotionThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
