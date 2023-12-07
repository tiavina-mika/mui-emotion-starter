/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";

import MuiChip, { ChipProps } from "@mui/material/Chip";
import { ReactNode } from "react";

const classes = {
  root: (withBorder: boolean, color: string) => (theme: Theme) => {
    if (!withBorder) {
      return {
        border: "1px solid transparent" // to avoid empty space
      };
    }

    if (!color) return {};

    return {
      border:
        "1px solid " + (theme.palette as any)[color as any].main + "!important"
    };
  },
  defaultColorLabel: (theme: Theme) => ({
    color: theme.palette.grey[800]
  }),
  angular: {
    borderRadius: 6
  }
};

type Props = {
  label: string | ReactNode;
  withBorder?: boolean;
  className?: string;
  labelColor?: "default" | "colored";
  shape?: "rounded" | "angular";
} & ChipProps;

const Chip = ({
  label,
  className,
  withBorder = true,
  labelColor = "colored",
  shape = "rounded",
  ...props
}: Props) => {
  return (
    <MuiChip
      {...props}
      label={label}
      className={className}
      css={[
        classes.root(withBorder, props.color as string),
        // force the label color to default even if the color are other than default
        labelColor === "default" && classes.defaultColorLabel,
        shape === "angular" && classes.angular
      ]}
    />
  );
};

export default Chip;
