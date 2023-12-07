/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import Section from "../../../../components/Section";
import { Typography } from "@mui/material";

type Props = {
  description: string | undefined;
};
const MainTab = ({ description }: Props) => {
  return (
    <Section title="Details" spacing={1}>
      <Typography className="fs14" css={{ color: "#000" }}>
        {description || "No description"}
      </Typography>
    </Section>
  );
};

export default MainTab;
