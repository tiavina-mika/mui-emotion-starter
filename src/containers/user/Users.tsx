/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack } from "@mui/material";
import { useState } from "react";
import AddIcon from "../../components/AddIcon";
import CreateUserDialog from "./CreateUserDialog";

const Users = () => {
  const [openUserCreationDialog, setOpenUserCreationDialog] = useState<boolean>(
    false
  );

  const toggleUserCreationDialog = () =>
    setOpenUserCreationDialog(!openUserCreationDialog);

  return (
    <div className="flexColumn stretchSelf flex1">
      <Stack spacing={3.4}>
        <span>Users</span>
      </Stack>
      <CreateUserDialog
        onClose={toggleUserCreationDialog}
        open={openUserCreationDialog}
      />
      <AddIcon onClick={toggleUserCreationDialog} />
    </div>
  );
};

export default Users;
