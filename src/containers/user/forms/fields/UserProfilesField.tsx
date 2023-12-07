/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { FormHelperText, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { ISelectOption } from "../../../../types/app.type";
import UserProfilesSelect from "./UserProfilesSelect";

export type Props = {
  name: string;
  options: ISelectOption[];
};

const UserProfilesField = ({ name, options }: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <Stack>
          <UserProfilesSelect
            onChange={onChange}
            value={value}
            options={options}
          />
          {errors[name] && (
            <FormHelperText error>
              {(errors as any)[name].message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export default UserProfilesField;
