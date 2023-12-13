/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import { Theme } from "@emotion/react";

const classes = {
  header: (theme: Theme) => ({
    borderBottom: "1px solid " + theme.palette.grey[300],
    padding: `16px ${LAYOUT_CONTENT_PADDING}px`
  })
};

const Header = () => {
  return (
    <div css={classes.header} className="stretchSelf">
      <Typography variant="h3">Mik.</Typography>
    </div>
  );
};

export default Header;
