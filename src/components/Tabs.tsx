/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Tab, Tabs as MUITabs } from "@mui/material";
import { ISelectOption } from "../types/app.type";
import { SyntheticEvent } from "react";
import { cx } from "@emotion/css";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";

const classes = {
  tabsContainer: (theme: Theme) => ({
    height: "calc(72px - 12px)",
    backgroundColor: "#fff",
    borderBottom: "1px solid " + theme.palette.grey[100]
  }),
  tabsContent: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      maxWidth: `calc(100vw - ${LAYOUT_CONTENT_PADDING * 2}px)`
    }
  })
};

type Props = {
  onTabChange: (tab: any) => void;
  tab: any;
  options: ISelectOption[];
  className?: string;
  tabsClassName?: string;
  noBackgroundColor?: boolean;
};
const Tabs = ({
  options,
  tab,
  onTabChange,
  className,
  tabsClassName,
  noBackgroundColor =  false
}: Props) => {
  const handleTabChange = (_: SyntheticEvent, value: any) => {
    onTabChange(value);
  };

  return (
    <div className={cx("stretchSelf", className)} css={classes.tabsContainer}>
      <div css={classes.tabsContent}>
        <MUITabs
          value={tab}
          onChange={handleTabChange}
          className={tabsClassName}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable-setting-tabs"
          TabIndicatorProps={{ sx: { display: "none" } }}
          css={noBackgroundColor ? { backgroundColor: '#fff'} : null}
        >
          {options.map((option: ISelectOption, index: number) => (
            <Tab
              key={index}
              label={option.label}
              value={option.value}
              className="flex1"
            />
          ))}
        </MUITabs>
      </div>
    </div>
  );
};

export default Tabs;
