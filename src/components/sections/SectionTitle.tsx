/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Typography } from "@mui/material";

type Props = {
  title: string;
};
const SectionTitle = ({ title }: Props) => {
  return (
    <Typography variant="body2" component="h6" className="textUpperCase fw700">
      {title}
    </Typography>
  );
};

export default SectionTitle;
