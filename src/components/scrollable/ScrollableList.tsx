/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
import { ReactNode } from "react";

import { IDirection } from "../../types/app.type";
import { getScrollClassName } from "../../utils/app.utils";
import { LAYOUT_CONTENT_PADDING } from "../../utils/constants";
import Scrollable from "./Scrollable";

const classes = {
  root: {
    width: `calc(100vw - ${LAYOUT_CONTENT_PADDING}px)`
  },
  /**
   *
   * @param columnsCount total number of column
   * @param columnWidth width of each column
   * @returns
   */
  scrollableContent: (columnsCount: number, columnWidth: number) => ({
    width: `${columnsCount * columnWidth + LAYOUT_CONTENT_PADDING / 2}vw`
  }),
  scrollableTableContent: (tableWidth: number = 1130) => ({
    minWidth: tableWidth
  })
};

type Props = {
  children: ReactNode;
  columnsCount?: number;
  columnWidth?: number;
  direction?: IDirection;
  tableWidth?: number;
  type?: "card" | "table";
  className?: string;
};

const ScrollableList = ({
  children,
  tableWidth,
  className,
  columnsCount = 0,
  columnWidth = 90,
  direction = "horizontal",
  type = "card"
}: Props) => {
  return (
    <Scrollable direction={direction} css={classes.root}>
      <div
        className={cx(
          "flexRow stretchSelf flex1 hideScrollbar",
          getScrollClassName(direction),
          className
        )}
        css={
          type === "card"
            ? classes.scrollableContent(columnsCount, columnWidth)
            : classes.scrollableTableContent(tableWidth)
        }
      >
        {children}
      </div>
    </Scrollable>
  );
};

export default ScrollableList;
