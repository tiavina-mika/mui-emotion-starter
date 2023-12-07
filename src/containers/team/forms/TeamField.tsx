/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { FormHelperText, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { ISelectOption } from "../../../types/app.type";
import TeamSelect from "./TeamSelect";

export type Props = {
  name: string;
  options: ISelectOption[];
  label?: string;
  placeholder?: string;
};

const TeamField = ({ name, options, placeholder, label }: Props) => {
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
          <TeamSelect
            onChange={onChange}
            value={value}
            options={options}
            label={label}
            placeholder={placeholder}
            left="😊"
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

export default TeamField;
