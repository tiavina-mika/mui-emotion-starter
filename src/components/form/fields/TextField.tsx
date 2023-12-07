/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";
import { jsx } from "@emotion/react";
import { Theme } from "@emotion/react";
import { TextFieldProps, FormHelperText, Stack } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextFieldInput from "../inputs/TextFieldInput";

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
  }),
  left: css({
    padding: "9px 0 !important" // Note: height is not working
  })
};

export type CustomTextFieldProps = {
  className?: string;
  name: string;
  fullWidth?: boolean;
  errorMessage?: string;
  left?: ReactNode;
  shrinkLabel?: boolean;
  hasPreview?: boolean;
  onFieldChange?: (value: string | number) => void;
} & TextFieldProps;

const TextField = ({
  name,
  fullWidth = true,
  errorMessage,
  left,
  onFieldChange,
  className,
  shrinkLabel,
  hasPreview,
  ...inputProps
}: CustomTextFieldProps) => {
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
          <TextFieldInput
            {...field}
            {...inputProps}
            css={classes.root}
            className={className}
            variant="outlined"
            fullWidth={fullWidth}
            error={!!errors[name] || !!errorMessage}
            leftClassName={classes.left}
            left={left}
            shrinkLabel={shrinkLabel}
            hasPreview={hasPreview}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              field.onChange(event.target.value);
              onFieldChange?.(event.target.value);
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

export default TextField;
