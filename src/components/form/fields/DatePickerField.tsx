import { FormControl, FormHelperText, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import DatePickerInput from "../inputs/DatePickerInput";
import { CustomTextFieldProps } from "./TextField";

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  inputFormat?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  withHour?: boolean;
  tooltip?: string;
  displayStatic?: boolean;
  className?: string;
  closeOnSelect?: boolean;
} & CustomTextFieldProps;

const DatePickerField = ({
  name,
  label,
  helperText,
  disableFuture,
  disablePast,
  inputFormat,
  tooltip,
  withHour,
  displayStatic,
  className,
  closeOnSelect,
  ...inputProps
}: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl
      className={className}
      component="fieldset"
      error={!!errors[name]}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePickerInput
            disableFuture={disableFuture}
            disablePast={disablePast}
            displayStatic={displayStatic}
            inputFormat={inputFormat}
            value={value}
            onChange={onChange}
            withHour={withHour}
            label={label}
            closeOnSelect={closeOnSelect}
            {...inputProps}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText error>{(errors as any)[name].message}</FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default DatePickerField;
