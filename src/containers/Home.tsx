/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import Footer from "../components/Footer";
import { Theme } from "@emotion/react";
import { useState } from "react";
import { Editor as NovelEditor } from "novel";
import { Markdown } from "tiptap-markdown";

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
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <div className="flexColumn spaceBetween" css={classes.root}>
      <div className="stretchSelf">
        <div css={classes.header}>
          <Typography variant="h3">Mik.</Typography>
        </div>
        <div css={classes.content}>
          <div css={{ marginTop: 4 }}>
            <Typography className="grey800" css={{ fontSize: 14 }}>
              A project starter for Material UI 5, Emotion and TypeScript
            </Typography>
          </div>
        </div>
        <div>
          <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400"></div>
          <NovelEditor
            defaultValue={value}
            onDebouncedUpdate={(e) => {
              setValue(e.getHTML());
            }}
            disableLocalStorage
            extensions={[
              Markdown.configure({
                html: true,
                transformCopiedText: true,
                transformPastedText: true
              })
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
