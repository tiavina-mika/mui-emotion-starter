/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userProfilesSchema } from "../../../validations/user.validation";
import { IUserProfilesInput } from "../../../types/user.type";

import Form from "../../../components/form/Form";
import { profiles } from "../../../utils/data/profiles";
import UserProfilesField from "./fields/UserProfilesField";
import { ISelectOption } from "../../../types/app.type";

const defaultValues = {
  profiles: []
};

type Props = {
  onConfirm: (values: IUserProfilesInput) => void;
  initialValues: IUserProfilesInput | undefined;
};
const UserProfilesForm = ({ onConfirm, initialValues }: Props) => {
  const form = useForm<IUserProfilesInput>({
    resolver: zodResolver(userProfilesSchema)
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      return;
    }

    // empty form
    form.reset(defaultValues);
  }, [initialValues, form]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IUserProfilesInput) => {
    onConfirm(values);
  };

  // from db
  const options = profiles.map(
    (profile: any): ISelectOption => ({
      value: profile.objectId,
      icon: profile.icon,
      label: profile.label
    })
  );

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      withSpacing
      primaryButtonText="Next"
      buttonFullWidth
    >
      <UserProfilesField name="profiles" options={options} />
    </Form>
  );
};

export default UserProfilesForm;
