/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Chip from "../../../../components/chip/Chip";

const classes = {
  effort: {
    height: 22,
    padding: "6px 8px"
  }
};

type Props = {
  effort: number;
};
const EffortChip = ({ effort }: Props) => {
  return (
    <Chip
      // TODO: the smiley should be different depending of the value?
      label={effort + " 😎"}
      variant="outlined"
      css={classes.effort}
    />
  );
};

export default EffortChip;
