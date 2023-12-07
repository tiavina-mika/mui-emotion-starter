/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack } from "@mui/material";

import Chip from "../../components/chip/Chip";
import { IWorkflow } from "../../types/workflow.type";

const classes = {
  root: (backgroundColor: string, color: string) => ({
    backgroundColor,
    color,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  }),
  workflow: {
    fontWeight: 700
  }
};

type Props = {
  workflow: IWorkflow;
};
const EntityWorkflowChip = ({ workflow }: Props) => {
  return (
    <Chip
      label={
        <Stack direction="row" spacing={0.7}>
          <span css={{ fontWeight: 400 }}>{workflow.phase.name}</span>
          <span css={classes.workflow}>|</span>
          <span css={classes.workflow}>{workflow.name}</span>
        </Stack>
      }
      variant="semifilled"
      css={classes.root(workflow.phase.backgroundColor, workflow.phase.color)}
    />
  );
};

export default EntityWorkflowChip;
