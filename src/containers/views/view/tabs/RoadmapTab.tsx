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
const RoadmapTab = ({ views }: Props) => {
  const isLaptop = useBreakpoint("lg");
  const isTablet = useBreakpoint("md");
  const isMobile = useBreakpoint("sm");

  // column width depending of the screen size (in vw (%))
  const columnWidth = useMemo((): number => {
    if (isMobile) return 85;
    if (isTablet) return 50;
    if (isLaptop) return 40;

    return 20;
  }, [isMobile, isTablet, isLaptop]);

  return <CardViews views={views} columnWidth={columnWidth} />;
};

export default RoadmapTab;
