/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Theme } from "@emotion/react";
import { TextFieldProps } from "@mui/material";
import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
  StaticDatePicker,
  StaticDateTimePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import TextFieldInput from "./TextFieldInput";

const classes = {
  root: (theme: Theme) => ({
    "&.MuiFormControl-root": {
      flex: 1
    },
    "& .MuiDateCalendar-root": {
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: 6,
      boxShadow: "0px 0px 10px #0000000d"
    },
    "& .MuiDayCalendar-weekDayLabel": {
      fontSize: 12
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
      fontSize: 12
    },
    "& .MuiPickersDay-root": {
      fontSize: 12,
      "&.Mui-selected": {
        backgroundColor: "#1976d2"
      }
    },
    "& .MuiPickersToolbar-root": {
      display: "none !important"
    }
  }),
  toolbar: (close: boolean) => ({
    "& .MuiPickersToolbar-root": {
      display: "none"
    },
    "& .MuiDialogActions-root": {
      display: close ? "none" : "initial"
    }
  }),
  input: (theme: Theme) => ({
    "& label.Mui-focused": {
      fontWeight: 400,
      color: theme.palette.grey[800]
    },
    "& .MuiInputLabel-shrink": {
      color: theme.palette.grey[800]
    },
    "& .MuiInputBase-root": {
      "& fieldset": {
        border: `1px solid ${theme.palette.grey[800]}`,
        borderRadius: 6,
        transition: "all 0.125s ease 0s"
      },
      "& .MuiInputBase-input": {
        color: theme.palette.grey[800],
        "&::placeholder": {
          color: theme.palette.grey[300],
          fontSize: 14,
          opacity: 1
        }
      },
      "&:hover fieldset": {
        border: `1px solid ${theme.palette.grey[800]}`
      },
      "&.Mui-focused fieldset": {
        border: `1px solid ${theme.palette.grey[800]}`
      }
    }
  })
};

type Props = {
  value?: Dayjs;
  onChange: (value: any) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
  withHour?: boolean;
  displayStatic?: boolean;
  label?: string;
  inputFormat?: string;
  className?: string;
  closeOnSelect?: boolean;
} & TextFieldProps;

const DatePickerInput = ({
  value,
  disableFuture,
  disablePast,
  onChange,
  label,
  inputFormat,
  className,
  withHour = false,
  displayStatic = false,
  closeOnSelect = false,
  ...inputProps
}: Props) => {
  let Component: any = displayStatic ? StaticDatePicker : MobileDatePicker;
  if (withHour) {
    Component = displayStatic ? StaticDateTimePicker : MobileDateTimePicker;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <Component
        label={label}
        value={value}
        onChange={onChange}
        inputFormat={
          inputFormat ?? (withHour ? "DD/MM/YYYY @ HH:mm" : "DD/MM/YYYY")
        }
        displayStaticWrapperAs="desktop"
        disableFuture={disableFuture}
        disablePast={disablePast}
        closeOnSelect={closeOnSelect}
        className={className}
        css={[classes.root, classes.toolbar(closeOnSelect)]}
        slots={{
          textField: (params: TextFieldProps) => (
            <TextFieldInput
              variant="outlined"
              fullWidth
              css={classes.input}
              {...params}
              {...inputProps}
            />
          )
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
