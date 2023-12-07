/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { IComponentsEntityFormInput } from "../../../../types/entity.type";
import { componentsEntitySchema } from "../../../../validations/entity.validation";
import Form from "../../../../components/form/Form";
import CardCheckboxField from "../../../../components/form/fields/CardCheckboxField";

import { components } from "../../../../utils/data/entity";
import { formatComponentOptions } from "../../../../utils/component.utils";
import { css } from "@emotion/css";

type Props = {
  onSave: (values: IComponentsEntityFormInput) => void;
  initialValues: IComponentsEntityFormInput;
};
const EntityComponentsForm = ({ onSave, initialValues }: Props) => {
  const form = useForm<IComponentsEntityFormInput>({
    resolver: zodResolver(componentsEntitySchema)
  });
  const productOptions = formatComponentOptions(components);

  // set initial values
  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IComponentsEntityFormInput) => {
    onSave(values);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText="Save"
      buttonFullWidth
    >
      <CardCheckboxField
        options={productOptions}
        name="components"
        withLeftDivider={false}
        rootClassName={css({ minHeight: 28, borderRadius: 100 })}
      />
    </Form>
  );
};

export default EntityComponentsForm;
