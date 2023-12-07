/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { FormControlLabel, Stack } from "@mui/material";

import Dialog from "../../../../components/Dialog";
import FieldSwitch from "./FieldSwitch";
import FieldsSearch from "./FieldsSearch";
import { ISwitchOption } from "../../../../types/app.type";
import Scrollable from "../../../../components/scrollable/Scrollable";

const classes = {
  switchesContainer: {
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 14
  },
  scrollableContainer: {
    height: 352
  },
  formControl: (theme: Theme) => ({
    "&.MuiFormControlLabel-root": {
      marginLeft: 0,
      marginRight: 0
    },
    "& .MuiSwitch-root ": {
      order: 2
    },
    "& .MuiFormControlLabel-label": {
      color: theme.palette.grey[800],
      fontSize: 14,
      lineHeight: 1,
      fontWeight: 400
    }
  })
};

type Props = {
  open: boolean;
  onClose: () => void;
  switchesOptions: ISwitchOption[];
  onCheck: (value: string) => void;
};

const FieldsSelectionDialog = ({
  open,
  onClose,
  switchesOptions,
  onCheck
}: Props) => {
  return (
    <Dialog onClose={onClose} open={open} withTopLine fullWidth maxWidth="xl">
      <div className="flexCenter">
        <div className="flexCenter" css={{ width: 290 }}>
          {/* search input */}
          <FieldsSearch onCheck={onCheck} />
          {/* switches */}
          <div className="stretchSelf" css={classes.switchesContainer}>
            <Scrollable
              direction="vertical"
              className="flexColumn"
              css={classes.scrollableContainer}
            >
              <Stack spacing={2.6} className="stretchSelf">
                {switchesOptions.map((field: ISwitchOption, index: number) => (
                  <FormControlLabel
                    key={field.value + index}
                    control={<FieldSwitch checked={!!field.checked} />}
                    css={classes.formControl}
                    onChange={() => onCheck(field.value)}
                    value={!!field.checked}
                    className="flexRow spaceBetween"
                    label={field.label}
                  />
                ))}
              </Stack>
            </Scrollable>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FieldsSelectionDialog;
