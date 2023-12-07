/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Typography } from "@mui/material";

const classes = {
  title: {
    fontSize: 26,
    fontFamily: "Product Sans Medium",
    lineHeight: 1
  }
};

type Props = {
  title: string;
};
const HomeTabsTitle = ({ title }: Props) => {
  return (
    <Typography variant="h1" css={classes.title}>
      {title}
    </Typography>
  );
};

export default HomeTabsTitle;
