/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx, Theme } from "@emotion/react";

import { LAYOUT_CONTENT_PADDING } from "../utils/constants";

const classes = {
  divider: (theme: Theme) => ({
    height: 1,
    backgroundColor: theme.palette.grey[100],
    left: -LAYOUT_CONTENT_PADDING /* this override the parent pagging */,
    right: -LAYOUT_CONTENT_PADDING /* this override the parent pagging */
  })
};

type Props = {
  className?: string;
};
const Divider = ({ className }: Props) => {
  return (
    <div css={classes.divider} className={cx(className, "positionAbsolute")} />
  );
};

export default Divider;
