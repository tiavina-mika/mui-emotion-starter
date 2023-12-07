/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

const classes = {
  content: {
    cursor: "pointer",
    paddingTop: 10
  },
  text: {
    color: "#3d5af1"
  }
};

type Props = {
  title: string;
  handleClick: () => void;
};

const ButtonAddDesktop = ({ title, handleClick }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      onClick={handleClick}
      css={classes.content}
    >
      <img src="/icons/plus-active.svg" alt="" />
      <Typography variant="h4" css={classes.text}>
        Add a new {title}
      </Typography>
    </Stack>
  );
};

export default ButtonAddDesktop;
