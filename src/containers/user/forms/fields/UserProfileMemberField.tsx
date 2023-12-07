/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { FormHelperText, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { ISelectOption } from "../../../../types/app.type";
import UserProfileMemberRadio from "./UserProfileMemberRadio";

export type Props = {
  name: string;
  options: ISelectOption[];
  className?: string;
  label?: string;
};

const UserProfileMemberField = ({ name, options, className, label }: Props) => {
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
          <UserProfileMemberRadio
            onChange={onChange}
            value={value}
            options={options}
            className={className}
            label={label}
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

export default UserProfileMemberField;
