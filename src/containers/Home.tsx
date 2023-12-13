/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography, useTheme } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import Footer from "../components/Footer";
import { Theme } from "@emotion/react";

const classes = {
  root: {
    minHeight: "100vh"
  },
  content: {
    padding: LAYOUT_CONTENT_PADDING
  },
  header: (theme: Theme) => ({
    borderBottom: "1px solid " + theme.palette.grey[300],
    padding: `16px ${LAYOUT_CONTENT_PADDING}px`
  })
};

const Home = () => {
  return (
    <div className="flexColumn spaceBetween" css={classes.root}>
      <div className="flexColumn stretchSelf flex1">
        <div css={classes.header} className="stretchSelf">
          <Typography variant="h3">Mik.</Typography>
        </div>
        <div css={classes.content}>
          <div css={{ marginTop: 4 }}>
            <Typography className="grey800" css={{ fontSize: 14 }}>
              Material UI v5, Emotion, TypeScript, React Hook Form starter
            </Typography>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
