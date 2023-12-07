/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { useMemo } from "react";

import { IViewTableData } from "../../../../types/entity.type";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";
import CardViews from "../CardViews";

type Props = {
  views: IViewTableData[];
};
const InProgressTab = ({ views }: Props) => {
  const isLaptop = useBreakpoint("lg");
  const isTablet = useBreakpoint("md");
  const isMobile = useBreakpoint("sm");

  // column width depending of the screen size (in vw (%))
  const columnWidth = useMemo((): number => {
    if (isMobile) return 60;
    if (isTablet) return 40;
    if (isLaptop) return 30;

    return 20;
  }, [isMobile, isTablet, isLaptop]);

  return <CardViews views={views} columnWidth={columnWidth} />;
};

export default InProgressTab;
