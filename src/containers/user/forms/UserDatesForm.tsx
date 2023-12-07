/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Stack } from "@mui/material";

import { userDatesSchema } from "../../../validations/user.validation";
import { IUserDatesInput } from "../../../types/user.type";
import Form from "../../../components/form/Form";
import DatePickerField from "../../../components/form/fields/DatePickerField";

const defaultValues = {
  arrivalDate: dayjs(),
  departureDate: null
};
type Props = {
  onConfirm: (values: IUserDatesInput) => void;
  initialValues: IUserDatesInput | undefined;
};
const UserDatesForm = ({ onConfirm, initialValues }: Props) => {
  const form = useForm<IUserDatesInput>({
    resolver: zodResolver(userDatesSchema),
    defaultValues
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      return;
    }
  }, [initialValues, form]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IUserDatesInput) => {
    onConfirm(values);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      withSpacing
      primaryButtonText="Invite member"
      buttonFullWidth
      isDisabled={false}
    >
      <Stack direction="row" spacing={2}>
        <DatePickerField
          className="flex1"
          label="Arrival date"
          name="arrivalDate"
          left={<img alt="" src="/icons/calendar.svg" />}
          closeOnSelect
        />
        <DatePickerField
          className="flex1"
          label="Departure date"
          name="departureDate"
          placeholder="Optional"
          left={<img alt="" src="/icons/calendar.svg" />}
          InputLabelProps={{
            shrink: true
          }}
          closeOnSelect
        />
      </Stack>
    </Form>
  );
};

export default UserDatesForm;
