/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Typography } from "@mui/material";
import EditableSection from "../../../../components/sections/EditableSection";
import { useToggle } from "../../../../hooks/useToggle";
import EntityEditionDialog from "../EntityEditionDialog";
import {
  IEntityDescriptionInput,
  IEntityType,
} from "../../../../types/entity.type";
import EntityDescriptionForm from "../forms/EntityDescriptionForm";
import { entityDialogDetails } from "../../../../utils/entity.utils";

type Props = {
  description: string;
  type: IEntityType;
};
const EntityDescriptionTab = ({ description, type }: Props) => {
  const { open: openEditionDialog, toggle: toggleEditionDialog } = useToggle();

  const initialValues = { description };

  const handleOpenEditDialog = () => toggleEditionDialog();

  const handleSave = (values: IEntityDescriptionInput) => {
    console.log(values);
  };

  return (
    <div>
      <EditableSection onEdit={handleOpenEditDialog} title="Description">
        <Typography
          variant="body1"
          className="grey800"
          css={{
            fontSize: 14,
            lineHeight: 1.57
          }}
        >
          {description}
        </Typography>
      </EditableSection>

      <EntityEditionDialog
        onClose={toggleEditionDialog}
        open={openEditionDialog}
        title={entityDialogDetails[type].title}
        description={entityDialogDetails[type].description}
      >
        <EntityDescriptionForm
          initialValues={initialValues}
          onSave={handleSave}
          type={type}
        />
      </EntityEditionDialog>
    </div>
  );
};

export default EntityDescriptionTab;
