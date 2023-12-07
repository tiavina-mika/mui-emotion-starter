/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";

import { IWorkflow } from "../../../types/workflow.type";

type Props = {
  workflow: IWorkflow;
};
const EntityWorkflow = ({ workflow }: Props) => {
  return (
    <EntitySummaryItem label="Etat">
      <Chip
        label={workflow.status}
        variant="semifilled"
        withBorder={false}
        color="error"
      />
    </EntitySummaryItem>
  );
};

export default EntityWorkflow;