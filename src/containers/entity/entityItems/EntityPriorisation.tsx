/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";

type Props = {
  priorisation: number;
};
const EntityPriorisation = ({ priorisation }: Props) => {
  return (
    <EntitySummaryItem label="Priorisation">
      <Chip
        label={
          <span className="flexRow center">
            {priorisation}&nbsp;&nbsp;
            <img alt="" src="/icons/priorisation.svg" />
          </span>
        }
        variant="filled"
        color="error" // TODO: maybe this should be dynamic depending of the value
        className="lh1"
      />
    </EntitySummaryItem>
  );
};

export default EntityPriorisation;