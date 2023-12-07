/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  IEntityDescriptionInput,
  IEntityType,
  IEntityTypeEnum
} from "../../../../types/entity.type";
import { entityDescriptionSchema } from "../../../../validations/entity.validation";
import Form from "../../../../components/form/Form";
import TextareaField from "../../../../components/form/fields/TextareaField";
import { useEffect } from "react";

const placeHolders = {
  [IEntityTypeEnum.problematic]:
    "Provide as much information as possible. This field has only one limit, yours.",
  [IEntityTypeEnum.feature]:
    "Specify your feature with the information currently available to you.",
  [IEntityTypeEnum.bug]:
    "Specify your bug with the information currently available to you.",
  [IEntityTypeEnum.userStory]:
    "pecify your user story with the information currently available to you."
};

type Props = {
  onSave: (values: IEntityDescriptionInput) => void;
  type: IEntityType;
  initialValues: IEntityDescriptionInput;
};
const EntityDescriptionForm = ({
  onSave,
  initialValues,
  type = "problematic"
}: Props) => {
  const form = useForm<IEntityDescriptionInput>({
    resolver: zodResolver(entityDescriptionSchema)
  });

  // set initial values
  useEffect(() => form.reset(initialValues), [form, initialValues]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IEntityDescriptionInput) => {
    onSave(values);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText="Save"
      buttonFullWidth
    >
      <TextareaField
        name="description"
        placeholder={placeHolders[type]}
        rows={7}
        multiline
        label="Description"
      />
    </Form>
  );
};

export default EntityDescriptionForm;
