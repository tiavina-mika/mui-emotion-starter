/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme, useTheme } from "@emotion/react";
import MUISlider, { SliderProps as MUISliderProps } from "@mui/material/Slider";

import { getSliderColorByPercent } from "../../../utils/app.utils";

type ISliderRootProps = {
  height?: number;
  thumbSize?: number;
  withLabel?: boolean;
  thumbIcon?: string;
  color?: string;
};

const classes = {
  root: ({
    thumbIcon,
    color,
    height = 8,
    thumbSize = 24,
    withLabel = false
  }: ISliderRootProps) => (theme: Theme) => {
    const values: Record<string, any> = {
      color: color || theme.palette.info.main,
      height,
      "& .MuiSlider-track": {
        border: "none"
      },
      "& .MuiSlider-thumb": {
        height: thumbSize,
        width: thumbSize,
        ...(thumbIcon && {
          background: thumbIcon
            ? `#fff url("${thumbIcon}") no-repeat 50% 30%`
            : "#fff"
        }),
        border: "1px solid currentColor",
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
          boxShadow: "inherit"
        },
        "&:before": {
          display: "none"
        }
      },
      "& .MuiSlider-rail": {
        opacity: 1,
        backgroundColor: theme.palette.grey[100]
      }
    };

    if (withLabel) {
      values["& .MuiSlider-valueLabel"] = {
        lineHeight: 1.2,
        fontSize: 12,
        background: "unset",
        padding: 0,
        height: 20,
        backgroundColor: "none",
        color: theme.palette.grey[800],
        fontWeight: 700,
        fontFamily: "Product Sans Bold",
        transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
        "&:before": { display: "none" },
        "&.MuiSlider-valueLabelOpen": {
          transform: "translate(50%, -100%) rotate(-45deg) scale(1)"
        },
        "& > *": {
          transform: "rotate(45deg)"
        }
      };
    } else {
      values["& .MuiSlider-valueLabel"] = {
        display: "none"
      };
    }

    return values;
  }
};

export type ISliderProps = {
  className?: string;
  sliderColor?: string;
  value: number | number[];
  onChange: (value: number | number[]) => void;
} & ISliderRootProps &
  Omit<MUISliderProps, "onChange">; // use our ownn onChange

const Slider = ({
  className,
  value,
  onChange,
  height,
  withLabel = true,
  thumbSize,
  thumbIcon,
  sliderColor,
  ...props
}: ISliderProps) => {
  const theme = useTheme();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    event.stopPropagation();
    onChange(newValue);
  };

  return (
    <MUISlider
      {...props}
      className={className}
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      value={value}
      onChange={handleSliderChange}
      // onChangeCommitted={onChangeCommitted}
      css={classes.root({
        thumbSize,
        height,
        withLabel,
        thumbIcon,
        color:
          sliderColor || getSliderColorByPercent(value as number, theme.palette)
      })}
    />
  );
};

export default Slider;
