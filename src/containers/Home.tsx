/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";

import Footer from "../components/Footer";
import Header from "../components/Header";

const classes = {
  root: {
    minHeight: "100vh"
  },
  content: {
    padding: LAYOUT_CONTENT_PADDING
  }
};

const Home = () => {
  return (
    <div className="flexColumn spaceBetween" css={classes.root}>
      <div className="flexColumn stretchSelf flex1">
        <Header />
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
