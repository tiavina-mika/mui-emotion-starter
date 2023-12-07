/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import {
  Autocomplete,
  AutocompleteProps as MUIAutocompleteProps,
  Paper,
  Popper,
  PopperProps,
  Stack
} from "@mui/material";
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
  useMemo
} from "react";

import { IEntityOption } from "../../../types/team.type";

import TextFieldInput from "./TextFieldInput";

const classes = {
  autocomplete: {
    "& .MuiAutocomplete-inputRoot": {
      paddingRight: "0px !important",
      paddingTop: 0,
      paddingBottom: 0
    },
    "& .MuiFormControl-root": {
      padding: "0px !important",
      border: "1px solid #303030",
      borderRadius: 6
    }
  },
  paper: (theme: Theme) => ({
    "& .MuiAutocomplete-listbox": {
      marginTop: -8,
      marginBottom: -8,
      "& .MuiAutocomplete-option": {
        fontFamily: "Product Sans Regular",
        fontSize: 14,
        padding: 16,
        borderTop: `1px solid ${theme.palette.grey[100]}`
      }
    }
  }),
  popper: {
    "& .MuiAutocomplete-noOptions": {
      display: "none"
    }
  }
};
export type IAutocompleteInputProps = {
  value: any;
  label?: string;
  options: any[];
  onChange: (value: any) => void;
  placeholder?: string;
  onChangeList?: (value: IEntityOption[]) => void;
  loading?: boolean;
  withPreview?: boolean;
  left?: ReactNode | string;
  right?: ReactNode;
  renderPreviews?: (
    values: IEntityOption[],
    handleDelete?: (id: string) => void
  ) => ReactNode;
  onInputChange?: (value: any) => void;
  fullWidth?: boolean;
  inputClassName?: string;
  className?: string;
  disableClearable?: boolean;
  disableNoOptions?: boolean;
} & Omit<
  MUIAutocompleteProps<any, any, any, any>,
  "renderInput" | "onChange" | "onInputChange"
>;

const AutocompleteInput: FC<IAutocompleteInputProps> = ({
  value,
  label,
  onChange,
  placeholder,
  onChangeList,
  options = [],
  loading,
  withPreview,
  left,
  right,
  renderPreviews,
  onInputChange,
  inputClassName,
  className,
  fullWidth = false,
  disableClearable = true,
  disableNoOptions = true,
  ...props
}) => {
  const [values, setValues] = useState<IEntityOption[]>([]);
  const [dynamicOptions, setDynamicOptions] = useState<IEntityOption[]>([]);

  const originalOptions = useMemo(() => [...options], [options]);

  useEffect(() => {
    setDynamicOptions(options);
  }, [options]);

  const handleChange = (_: SyntheticEvent, value: IEntityOption) => {
    if (withPreview) {
      const newValues = [value, ...values];
      setValues(newValues);
      onChangeList?.(newValues);
      onChange(value);

      const index = options.findIndex(
        (option: IEntityOption) => option.value === value.value
      );
      options.splice(index, 1);
      setDynamicOptions(options);
      return;
    }

    onChange(value);
  };

  const handleDelete = (id: string) => {
    const newValues = values.filter(
      (value: IEntityOption) => value.value.objectId !== id
    );
    setValues(newValues);
    onChangeList?.(newValues);

    // --------- update options --------- //
    const removedValue = values.find(
      (value: IEntityOption) => value.value.objectId === id
    );
    if (!removedValue) return;

    // add the removed value to options
    setDynamicOptions((prev: IEntityOption[]): IEntityOption[] => [
      removedValue,
      ...prev
    ]);
  };

  const handleInputChange = (_: SyntheticEvent, value: string) => {
    onInputChange?.(value);
  };

  return (
    <Stack spacing={1.6} className={fullWidth ? "stretchSelf flex1" : ""}>
      <div className="flexRow">
        <Autocomplete
          loading={loading}
          sx={{ flex: 1 }}
          css={classes.autocomplete}
          className={className}
          value={value}
          onChange={handleChange}
          options={withPreview ? dynamicOptions : originalOptions}
          getOptionLabel={(option) => {
            return option.label || "";
          }}
          isOptionEqualToValue={(_: IEntityOption, value: IEntityOption) => {
            const currentOptions = withPreview
              ? dynamicOptions
              : originalOptions;
            return currentOptions.find(
              (option: IEntityOption) =>
                option.value.objectId === value.value?.objectId
            );
          }}
          onInputChange={handleInputChange}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable={disableClearable}
          renderInput={(params) => (
            <TextFieldInput
              {...params}
              placeholder={placeholder}
              label={label}
              left={left}
              right={right}
              className={inputClassName}
            />
          )}
          PaperComponent={({ children }) => {
            return (
              <Paper elevation={0} css={classes.paper} variant="outlined">
                {children}
              </Paper>
            );
          }}
          PopperComponent={(props: PopperProps) => {
            return (
              <Popper
                {...props}
                disablePortal={disableNoOptions}
                css={disableNoOptions && classes.popper}
                placement="bottom"
              />
            );
          }}
          {...props}
        />
      </div>

      {/* ------- preview ------- */}
      {withPreview &&
        values.length > 0 &&
        renderPreviews?.(values, handleDelete)}
    </Stack>
  );
};

export default AutocompleteInput;
