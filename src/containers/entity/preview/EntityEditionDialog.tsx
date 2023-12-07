/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Dialog from "../../../components/Dialog";
import { ReactNode } from "react";
import Title from "../../../components/typography/Title";
import { Stack, Typography } from "@mui/material";

const classes = {
  description: {
    lineHeight: 1.5,
    letterSpacing: 0.12
  }
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
};
const EntityEditionDialog = ({
  open,
  onClose,
  description,
  title,
  children
}: Props) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullScreen
      withCloseButton
      contentClassName="flexColumn flex1"
    >
      <Stack spacing={4.4} direction="column" className="flex1 stretchSelf">
        <Stack spacing={1.2}>
          <Title text={title} />
          <Typography variant="h5" css={classes.description}>
            {description}
          </Typography>
        </Stack>
        <div className="flexColumn stretchSelf flex1">{children}</div>
      </Stack>
    </Dialog>
  );
};

export default EntityEditionDialog;
