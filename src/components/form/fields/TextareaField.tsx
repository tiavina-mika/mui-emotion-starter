/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Theme } from "@emotion/react";
import {
  TextFieldProps,
  FormHelperText,
  Stack,
  TextField
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const classes = {
  root: (theme: Theme) => ({
    "& label": {
      fontSize: 14,
      fontWeight: 400
    },
    "& label.Mui-focused": {
      fontSize: 14,
      fontWeight: 400,
      color: theme.palette.grey[800]
    },
    "& .MuiInputLabel-shrink": {
      color: theme.palette.grey[800]
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#dcdcdc"
    },
    "& .MuiInputBase-root": {
      "& fieldset": {
        fontSize: 14,
        border: "1px solid #dcdcdc",
        borderRadius: 6,
        transition: "all 0.125s ease 0s"
      },
      "& .MuiInputBase-input": {
        fontSize: 14,
        lineHeight: 1.6,
        color: theme.palette.grey[800],
        "&::placeholder": {
          lineHeight: 1.6,
          color: theme.palette.grey[300],
          fontSize: 14,
          opacity: 1
        }
      },
      "& .MuiInputLabel-shrink": {
        color: theme.palette.grey[800]
      },
      "&.Mui-focused fieldset": {
        fontSize: 14,
        border: "1px solid #dcdcdc"
      },
      "&:hover fieldset": {
        border: "1px solid #dcdcdc"
      }
    }
  })
};

export type Props = {
  name: string;
  fullWidth?: boolean;
  errorMessage?: string;
  className?: string;
  rows?: number;
  shrinkLabel?: boolean;
} & TextFieldProps;

const TextareaField = ({
  name,
  fullWidth = true,
  errorMessage,
  className,
  shrinkLabel,
  rows = 4,
  ...inputProps
}: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Stack>
          <TextField
            {...field}
            {...inputProps}
            error={!!errors[name] || !!errorMessage}
            multiline
            rows={rows}
            css={classes.root}
            className={className}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              ...(shrinkLabel && { shrink: shrinkLabel }),
              ...inputProps.InputLabelProps
            }}
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

export default TextareaField;
