/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import { Theme } from "@emotion/react";
import Footer from "../components/Footer";

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
      <div css={classes.content}>
        <Typography variant="h3">
          A project starter for MUI and Emotion
        </Typography>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
