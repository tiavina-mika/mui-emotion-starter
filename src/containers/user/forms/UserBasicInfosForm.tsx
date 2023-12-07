/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inviteUserBasicInfosSchema } from "../../../validations/user.validation";
import { IInviteUserBasicInfosInput } from "../../../types/user.type";
import Form from "../../../components/form/Form";
import TextField from "../../../components/form/fields/TextField";
import { useEffect, useMemo } from "react";
import { ISelectOption } from "../../../types/app.type";
import { teams } from "../../../utils/data/teams";
import UserProfileMemberField from "./fields/UserProfileMemberField";
import TeamField from "../../team/forms/TeamField";
import { ITeam } from "../../../types/team.type";
import Alert from "../../../components/Alert";

const profileMemberOptions: ISelectOption<"maker" | "contributor">[] = [
  {
    label: "Maker",
    value: "maker"
  },
  {
    label: "Contributor",
    value: "contributor"
  }
];

const defaultValues = {
  firstName: "",
  lastName: "",
  email: ""
};

type Props = {
  onConfirm: (values: IInviteUserBasicInfosInput) => void;
  initialValues: IInviteUserBasicInfosInput | undefined;
};
const UserBasicInfosForm = ({ onConfirm, initialValues }: Props) => {
  const form = useForm<IInviteUserBasicInfosInput>({
    resolver: zodResolver(inviteUserBasicInfosSchema)
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      return;
    }

    // empty form
    form.reset(defaultValues);
  }, [initialValues, form]);

  const { handleSubmit, formState, getFieldState } = form;

  const onSubmitHandler = (values: IInviteUserBasicInfosInput) => {
    onConfirm(values);
  };

  // check if email and team are changed
  const fieldStates = useMemo(() => {
    return {
      email: getFieldState("email", formState),
      team: getFieldState("team", formState)
    };
  }, [formState, getFieldState]);

  const teamOptions = teams.map(
    (team: ITeam): ISelectOption => ({
      value: team.objectId,
      label: team.name,
      icon: team.icon
    })
  );

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      withSpacing
      primaryButtonText="Next"
      buttonFullWidth
      contentClassName="flex1 positionRelative"
    >
      <TextField
        label="First name"
        placeholder="First name"
        name="firstName"
        shrinkLabel
        hasPreview
      />
      <TextField
        label="Last name"
        placeholder="Last name"
        name="lastName"
        shrinkLabel
        hasPreview
      />
      <TextField
        label="e-mail address"
        placeholder="E-mail address"
        type="email"
        name="email"
        shrinkLabel
        hasPreview
      />
      {/* team */}
      <TeamField name="team" placeholder="Team" options={teamOptions} />
      {/* profile member: display when an email is entered */}
      {fieldStates.email.isDirty && !fieldStates.email.invalid && (
        <UserProfileMemberField
          name="profileMember"
          label="What is his profile member ?"
          options={profileMemberOptions}
          css={{ marginTop: 2 }}
        />
      )}
      {/* alert: display when a team is selected */}
      {fieldStates.team.isDirty && !fieldStates.team.invalid && (
        <div
          className="positionAbsolute"
          css={{ bottom: 23, right: 0, left: 0 }}
        >
          <Alert
            severity="info"
            color={"primary" as any}
            variant="standard"
            message="Popup message"
          />
        </div>
      )}
    </Form>
  );
};

export default UserBasicInfosForm;
