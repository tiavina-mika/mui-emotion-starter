/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Theme } from "@emotion/react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Paper
} from "@mui/material";
import {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState
} from "react";
import { ISelectOption } from "../../../types/app.type";
import TextFieldInput from "../../../components/form/inputs/TextFieldInput";
import Card from "../../../components/Card";
import { css } from "@emotion/css";

const classes = {
  autocomplete: (theme: Theme) => ({
    "& .MuiAutocomplete-inputRoot": {
      paddingRight: "0px !important",
      paddingLeft: "0px !important",
      paddingTop: 0,
      paddingBottom: 0
    },
    "& .MuiFormControl-root": {
      padding: "0px !important",
      border: "1px solid " + theme.palette.grey[800],
      borderRadius: 6
    },
    "& .MuiInputBase-input": {
      fontSize: 14,
      paddingLeft: "6px !important",
      "&::placeholder": {
        fontSize: 14,
        paddingLeft: "2px !important"
      }
    },
    // use the textField border
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent"
    }
  }),
  autocompleteNotFocused: {
    "&.Mui-focused .MuiFormControl-root": {
      borderRadius: 6
    }
  },
  autocompleteFocused: {
    "& .MuiFormControl-root": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  cardOption: (isLastItem: boolean) => {
    const values: Record<string, string | number> = {};

    if (!isLastItem) {
      return css({
        borderBottom: "none",
        borderRadius: 0
      });
    }
    return css({
      ...values,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    });
  }
};
type Props = {
  value: any;
  label?: string;
  options: any[];
  onChange: (value: any) => void;
  placeholder?: string;
  loading?: boolean;
  left?: ReactNode | string;
};

const TeamSelect = ({
  value,
  label,
  onChange,
  placeholder,
  options = [],
  loading,
  left,
  ...autoCompleteProps
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [togglePreview, setTogglePreview] = useState<boolean>(false);

  useEffect(() => {
    if (!value) return;
    setTogglePreview(true);
  }, [value]);

  // input change
  const handleChange = (_: SyntheticEvent, value: ISelectOption) => {
    setFocused(false);
    onChange(value);
    // hide input and show value preview
    setTogglePreview(true);
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const handleHidePreview = () => {
    setTogglePreview(false);
    setFocused(true);
  };

  // value preview
  if (togglePreview && value) {
    return (
      <Card left={value.icon} title={value.label} onClick={handleHidePreview} />
    );
  }

  return (
    <Autocomplete
      {...autoCompleteProps}
      loading={loading}
      sx={{ flex: 1 }}
      css={[
        classes.autocomplete,
        focused ? classes.autocompleteFocused : classes.autocompleteNotFocused
      ]}
      value={value}
      onChange={handleChange}
      options={options}
      getOptionLabel={(option: ISelectOption): string => {
        return option.label || "";
      }}
      isOptionEqualToValue={(
        option: ISelectOption,
        value: ISelectOption
      ): boolean => {
        return option.value === value?.value;
      }}
      autoComplete
      includeInputInList
      filterSelectedOptions
      selectOnFocus
      clearOnBlur
      autoFocus={focused}
      handleHomeEndKeys
      disableClearable
      onFocus={onFocus}
      onBlur={onBlur}
      renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
        <TextFieldInput
          {...params}
          placeholder={placeholder}
          label={label}
          left={left}
        />
      )}
      renderOption={(
        params: HTMLAttributes<HTMLLIElement>,
        option: ISelectOption
      ) => {
        // remove the select value, so we always get the last option
        const filteredOptions = options.filter(
          (option: ISelectOption): boolean => option.value !== value.value
        );
        const isLastItem: boolean =
          (params as any)["data-option-index"] === filteredOptions.length - 1;
        return (
          <li {...params} className="flex1">
            <Card
              left={option.icon}
              title={option.label}
              rootClassName={classes.cardOption(isLastItem)}
            />
          </li>
        );
      }}
      PaperComponent={({ children }): ReactElement => {
        return (
          <Paper
            elevation={0}
            css={{ backgroundColor: "transparent", marginTop: -7 }}
          >
            {children}
          </Paper>
        );
      }}
    />
  );
};

export default TeamSelect;
