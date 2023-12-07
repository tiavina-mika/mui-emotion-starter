/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";
import ChipIcon from "../../../components/chip/ChipIcon";

import { IOkr } from "../../../types/okr.type";
import { cutText } from "../../../utils/utils";

const cutOkrName = (name: string): string => {
  if (name.length > 30) {
    return cutText(name, 30);
  }

  return name;
};

type Props = {
  okrs: IOkr[];
};
const EntityOkrs = ({ okrs = []}: Props) => {
  return (
    <EntitySummaryItem label="Objectifs">
      {okrs.map((okr: IOkr, index: number) => (
        <Chip
          key={okr.objectId + index}
          label={cutOkrName(okr.name)}
          icon={<ChipIcon smiley={okr.icon} />}
          variant="outlined"
        />
      ))}
    </EntitySummaryItem>
  );
};

export default EntityOkrs;
