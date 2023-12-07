/** @jsxRuntime classic /
/* @jsx jsx */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
/** @jsxImportSource @emotion/react */
import { Stack, Button, SxProps, Theme, Alert } from "@mui/material";
import { FormEvent, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { FORM_FIELDS_SPACING } from "../../utils/constants";

type Props = {
  onSubmit?: (() => void) | ((event: FormEvent<HTMLFormElement>) => void);
  form?: any;
  loading?: boolean;
  children?: ReactNode;
  primaryButtonText?: string;
  error?: string;
  contentClassName?: string;
  buttonSx?: SxProps<Theme>;
  withSpacing?: boolean;
  formId?: string;
  direction?: "row" | "column";
  className?: string;
  buttonFullWidth?: boolean;
  isDisabled?: boolean;
  fieldsSpacing?: number;
};

const Form = ({
  formId,
  onSubmit,
  form,
  error,
  children,
  primaryButtonText,
  loading,
  buttonSx,
  withSpacing,
  className,
  contentClassName,
  fieldsSpacing = FORM_FIELDS_SPACING,
  buttonFullWidth = false,
  isDisabled = true,
  direction = "column"
}: Props) => {
  const {
    getFieldState,
    formState: { isDirty, isValid }
  } = form;

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={onSubmit}
        className="flexColumn stretchSelf flex1"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {error}
          </Alert>
        )}
        <div
          className={cx(
            direction === "row" ? "flexRow" : "flexColumn",
            "flex1 stretchSelf spaceBetween",
            className
          )}
        >
          <div className={cx("stretchSelf", contentClassName)}>
            {withSpacing ? (
              <Stack direction={direction} spacing={fieldsSpacing}>
                {children}
              </Stack>
            ) : (
              children
            )}
          </div>

          {/* internal button */}
          {!formId && (
            <Button
              type="submit"
              variant="contained"
              fullWidth={buttonFullWidth}
              className={direction === "column" ? "endSelf" : ""}
              sx={buttonSx}
              disabled={
                isDisabled && (!isDirty || getFieldState().invalid || !isValid)
              }
            >
              {loading ? "..." : primaryButtonText}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
