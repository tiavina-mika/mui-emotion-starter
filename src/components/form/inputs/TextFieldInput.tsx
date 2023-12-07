/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Theme,
  Typography
} from "@mui/material";
import { ReactNode, forwardRef, useState, useEffect } from "react";
import Card from "../../Card";

const classes = {
  rootWithIcons: (theme: Theme) => ({
    "& .MuiInputBase-root": {
      height: "44px !important"
    },
    "& .MuiInputAdornment-root": {
      padding: "9.8px 0", // when the height of the input change
      width: 44,
      height: "100%",
      display: "flex",
      justifyItems: "center",
      alignItems: "center"
    },
    "& .MuiInputAdornment-positionEnd": {
      borderLeft: "1px solid " + theme.palette.grey[800],
      borderTopRightRadius: theme.shape.borderRadius + "px",
      borderBottomRightRadius: theme.shape.borderRadius + "px"
    },
    "& .MuiInputAdornment-positionStart": {
      borderRight: "1px solid " + theme.palette.grey[800],
      borderTopLeftRadius: theme.shape.borderRadius + "px",
      borderBottomLeftRadius: theme.shape.borderRadius + "px"
    },

    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        // color: "#fff",
        "&::placeholder": {
          color: theme.palette.grey[300],
          opacity: 1,
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1
        }
      },
      "&:hover fieldset": {
        border: "none"
      },
      "&.Mui-focused fieldset": {
        border: "none"
      }
    }
  }),
  root: (theme: Theme) => ({
    "& .MuiInputBase-root": {
      height: "46px !important"
    },
    "& .MuiInputAdornment-root": {
      padding: "14px 0",
      borderTopLeftRadius: theme.shape.borderRadius + "px",
      borderBottomLeftRadius: theme.shape.borderRadius + "px",
      width: 65,
      height: "100%",
      display: "flex",
      justifyItems: "center",
      alignItems: "center"
      // borderRight: "1px solid " + theme.palette.grey[800]
    }
  }),
  leftText: (theme: Theme) => ({
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 14,
    color: theme.palette.grey[800]
  })
};

type Props = {
  left?: ReactNode | string;
  right?: ReactNode;
  rightClassName?: string;
  leftClassName?: string;
  className?: string;
  shrinkLabel?: boolean;
  hasPreview?: boolean;
} & TextFieldProps;

/**
 * should use `forwardRef` if using an refactored component with emotion
 * issue: https://stackoverflow.com/questions/66312566/how-to-type-forwardref-in-separate-select-component
 */
const TextFieldInput = forwardRef<HTMLDivElement, Props>(
  (
    {
      left,
      right,
      rightClassName,
      className,
      leftClassName,
      hasPreview = false,
      shrinkLabel = false,
      ...otherProps
    },
    ref
  ) => {
    const [togglePreview, setTogglePreview] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    useEffect(() => {
      if (!otherProps.value && !hasPreview) return;
      setTogglePreview(true);
    }, [otherProps.value, hasPreview]);

    // hide input and show preview on blur
    const handleBlur = () => {
      if (!hasPreview) return;
      setTogglePreview(true);
      setFocused(false);
    };

    const handleFocus = () => {
      setFocused(true);
    };

    const handleHidePreview = () => {
      setTogglePreview(false);
      setFocused(true);
    };

    // show the value preview
    if (hasPreview && togglePreview && otherProps.value && !focused) {
      return (
        <Card title={otherProps.value as string} onClick={handleHidePreview} />
      );
    }

    return (
      <TextField
        ref={ref}
        {...otherProps}
        className={className}
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoFocus={focused}
        css={left || right ? classes.rootWithIcons : classes.root}
        InputLabelProps={{
          ...(shrinkLabel && { shrink: shrinkLabel }),
          ...otherProps.InputLabelProps
        }}
        InputProps={{
          ...otherProps.InputProps,
          startAdornment: left ? (
            <InputAdornment position="start" className={leftClassName}>
              <div className="flex1 flexCenter">
                {typeof left === "string" ? (
                  <Typography css={classes.leftText}>{left}</Typography>
                ) : (
                  left
                )}
              </div>
            </InputAdornment>
          ) : null,
          endAdornment: right ? (
            <InputAdornment position="end" className={rightClassName}>
              <div className="flex1 flexCenter">{right}</div>
            </InputAdornment>
          ) : null
        }}
      />
    );
  }
);

export default TextFieldInput;
