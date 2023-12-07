/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Form from "../../../../components/form/Form";
import ProblematicDriverSelectField from "./ProblematicDriverSelectField";
import { IProblematicDriverInput } from "../../../../types/entity.type";
import { problematicDriverSchema } from "../../../../validations/entity.validation";
import { entityDrivers } from "../../../../utils/data/drivers";

type Props = {
  initialValues: IProblematicDriverInput;
  onSave: (values: IProblematicDriverInput) => void;
};

const ProblematicDriversForm = ({ initialValues, onSave }: Props) => {
  const form = useForm<IProblematicDriverInput>({
    resolver: zodResolver(problematicDriverSchema)
  });

  // set initial values
  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IProblematicDriverInput) => {
    onSave(values);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText="Enregistrer"
    >
      <ProblematicDriverSelectField name="drivers" options={entityDrivers} />
    </Form>
  );
};

export default ProblematicDriversForm;
