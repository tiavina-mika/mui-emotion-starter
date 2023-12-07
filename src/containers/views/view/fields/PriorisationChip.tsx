/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Chip from "../../../../components/chip/Chip";

type Props = {
  value: number;
};
const PriorisationChip = ({ value = 0 }: Props) => {
  return (
    <Chip
      label={
        <span className="flexRow center">
          {value}&nbsp;&nbsp;
          <img alt="" src="/icons/priorisation.svg" />
        </span>
      }
      variant="filled"
      color="error" // TODO: maybe this should be dynamic depending of the value
      className="lh1"
      css={{ height: 21 }}
    />
  );
};

export default PriorisationChip;
