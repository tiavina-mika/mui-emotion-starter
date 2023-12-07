/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Dialog from "../../components/Dialog";
import { Stack } from "@mui/material";

import { IEntityType } from "../../types/entity.type";
import EntitySelection from "./EntitySelection";
import EntitySuccessCreation from "./EntitySuccessCreation";
import { useState } from "react";

const classes = {
  dialog: {
    "& .MuiDialog-paper": {
      padding: "28px 16px"
    }
  }
};
type Props = {
  open: boolean;
  onClose: () => void;
};
const EntitySelectionDialog = ({ open, onClose }: Props) => {
  const [
    selectedEntityType,
    setSelectedEntityType
  ] = useState<IEntityType | null>(null);

  const closeSelectEntityTypeDialog = () => setSelectedEntityType(null);

  const handleSelectEntityType = (type: IEntityType) => {
    setSelectedEntityType(type);
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="xl"
      withCloseButton={false}
      css={classes.dialog}
    >
      <Stack spacing={2} className="flexCenter stretchSelf flex1">
        <div className="stretchSelf flex1">
          <EntitySelection onSelect={handleSelectEntityType} />
        </div>
      </Stack>
      <Dialog
        onClose={closeSelectEntityTypeDialog}
        open={selectedEntityType === "problematic"}
        fullWidth
        maxWidth="xl"
        withCloseButton
        closeButtonPosition="start"
      >
        <EntitySuccessCreation />
      </Dialog>
    </Dialog>
  );
};

export default EntitySelectionDialog;
