/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const classes = {
  label: {
    width: 103
  }
};

type Props = {
  label?: string;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
};
const SummaryItem = ({ label, className, labelClassName, children }: Props) => {
  return (
    <div className="flexRow center stretchSelf">
      {/* left */}
      <div
        css={classes.label}
        className={cx("flexRow center stretchSelf", labelClassName)}
      >
        <Typography sx={{ fontWeight: 400 }} variant="body2">
          {label}
        </Typography>
      </div>
      {/* right */}
      {(children as ReactNode[]).length > 1 ? (
        <Stack
          spacing={2.1}
          direction="row"
          className={cx(className, "flex1")}
          sx={{ rowGap: 1.2 }} // line spacing
        >
          {children}
        </Stack>
      ) : (
        <div className={className}>{children}</div>
      )}
    </div>
  );
};

export default SummaryItem;
