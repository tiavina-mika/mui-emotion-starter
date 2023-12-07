import { FC } from "react";

import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Stack } from "@mui/system";

import { EntityDriver } from "../../../../types/entity.type";
import ProblematicDriverSelect from "./ProblematicDriverSelect";

type Props = {
  name: string;
  helperText?: string;
  options: EntityDriver[];
};

const ProblematicDriverSelectField: FC<Props> = ({
  name,
  helperText,
  options
}) => {
  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Stack spacing={1}>
          <ProblematicDriverSelect
            onChange={onChange}
            value={value}
            options={options}
          />

          {/* ----------- helper text ----------- */}
          {helperText && <FormHelperText>{helperText}</FormHelperText>}

          {/* ----------- errors ----------- */}
          {errors[name] && (
            <FormHelperText error sx={{ my: 1 }}>
              {(errors as any)[name]?.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export default ProblematicDriverSelectField;
