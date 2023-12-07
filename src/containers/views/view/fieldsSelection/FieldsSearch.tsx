/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { IconButton, Typography } from "@mui/material";
import { HTMLAttributes, useState } from "react";

import { ISelectOption } from "../../../../types/app.type";
import AutocompleteInput from "../../../../components/form/inputs/AutocompleteInput";
import { searchText } from "../../../../utils/utils";
import { entityFields } from "../../../../utils/entity.utils";

const classes = {
  autocompleteCard: (theme: Theme) => ({
    borderRadius: 6,
    border: "1px solid " + theme.palette.grey[100],
    background: "#fff",
    boxShadow: "0px 0px 8px 0px rgba(31, 31, 31, 0.05)",
    paddingTop: 5,
    paddingBottom: 5
  }),
  autocompleteInput: (theme: Theme) => ({
    "& .MuiFormControl-root": {
      padding: "0px !important",
      border: "1px solid transparent !important",
      borderRadius: 6
    },
    "& fieldset": {
      border: "none"
    },
    "& .MuiInputBase-root": {
      padding: 0
    },
    "& .MuiInputBase-input": {
      paddingLeft: "32px !important",
      "&::placeholder": {
        color: theme.palette.grey[600],
        opacity: 1
      }
    }
  }),
  autocompleteInputOption: {
    background: "#fff",
    paddingTop: "8px !important",
    paddingBottom: "8px !important"
  },
  autocompleteInputOptionText: (theme: Theme) => ({
    color: theme.palette.grey[800],
    fontSize: 14,
    fontWeight: 400
  })
};

type Props = {
  // options: ISelectOption[];
  onCheck: (value: string) => void;
};

const FieldsSearch = ({ onCheck }: Props) => {
  const [searchedField, setSearchedField] = useState<ISelectOption | null>(
    null
  );

  const [autocompleteOptions, setAutocompleteOptions] = useState<
    ISelectOption[]
  >([]);

  // input search
  const handleSearch = (option: ISelectOption) => {
    // update dynamic options
    const newAutocompleteOptions = entityFields.filter(
      (field: ISelectOption) => {
        const regex = searchText(option.value);
        return field.value.match(regex) !== null;
      }
    );
    setAutocompleteOptions(newAutocompleteOptions);
  };

  // input select
  const handleSearchSelect = (option: ISelectOption) => {
    setSearchedField(option);
    // update fields list
    onCheck(option.value);
    // clear the option after a option selection
    setAutocompleteOptions([]);
  };

  // clear input select and options
  const handleClearAutocomplete = () => {
    setSearchedField(null);
    // clear the option after a option selection
    setAutocompleteOptions([]);
  };

  return (
    <div
      className="flexRow stretchSelf positionRelative center"
      css={classes.autocompleteCard}
    >
      {/* search icon */}
      <div
        css={{ bottom: 0, top: 0, left: 10 }}
        className="stretchSelf flexCenter positionAbsolute"
      >
        <img alt="" src="/icons/search.svg" css={{ width: 16, height: 16 }} />
      </div>
      {/* input */}
      <AutocompleteInput
        value={searchedField}
        onInputChange={handleSearch}
        onChange={handleSearchSelect}
        options={autocompleteOptions}
        withPreview
        fullWidth
        css={classes.autocompleteInput}
        placeholder="Rechercher"
        disableClearable={false}
        PaperComponent={undefined}
        renderOption={(
          props: HTMLAttributes<HTMLLIElement>,
          option: ISelectOption
        ) => (
          <li css={classes.autocompleteInputOption} {...props}>
            <Typography css={classes.autocompleteInputOptionText}>
              {option.label}
            </Typography>
          </li>
        )}
      />
      {/* clear icon */}
      <div
        css={{ bottom: 0, top: 0, right: 10 }}
        className="stretchSelf flexCenter positionAbsolute"
      >
        <IconButton
          sx={{ p: 0 }}
          disableRipple
          onClick={handleClearAutocomplete}
        >
          <img
            alt=""
            src="/icons/close-red.svg"
            css={{ width: 16, height: 16 }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default FieldsSearch;
