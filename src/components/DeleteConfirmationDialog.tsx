/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Button, Stack, Typography } from "@mui/material";

import Dialog from "./Dialog";
import TopIcon from "./layouts/TopIcon";

const classes = {
  dialog: {
    paddingTop: 5,
    paddingBottom: 6,
    "& .MuiDialog-paper": {
      paddingTop: 32
    }
  },
  button: {
    fontSize: 14,
    fontFamily: "Product Sans Regular"
  }
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const DeleteConfirmationDialog = ({
  open,
  loading,
  onClose,
  onConfirm
}: Props) => {
  const handleDelete = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xl"
      css={classes.dialog}
    >
      <Stack spacing={4}>
        <Stack spacing={2} className="flexCenter">
          <TopIcon image={"/icons/trash-active.svg"} />
          <Stack>
            <Typography variant="h4" align="center">
              You will permanently delete this information.
            </Typography>
            <Typography variant="h4" align="center">
              Are you sure of your choice?
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleDelete}
            css={classes.button}
          >
            {loading ? "..." : "Yes, I want to delete it"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleCancel}
            css={classes.button}
          >
            No I want to keep it
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
