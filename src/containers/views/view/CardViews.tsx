/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

import ScrollableList from "../../../components/scrollable/ScrollableList";
import { IEntity, IViewTableData } from "../../../types/entity.type";
import ViewCardAccordion from "./ViewCardAccordion";
import { VIEWS_CARD_LIST_SPACING } from "../../../utils/entity.utils";

const classes = {
  column: (columnWidth: number) => ({
    width: `${columnWidth}vw`
  }),
  headerColumn: {
    border: "1px solid #DCDCDC",
    backgroundColor: "#f8f8f8",
    padding: "8.5px 12px"
  },
  firstHeaderColumn: {
    borderTopLeftRadius: 6
  },
  lastHeaderColumn: {
    borderTopRightRadius: 6
  }
};

type Props = {
  views: IViewTableData[];
  columnWidth: number;
};
const CardViews = ({ views, columnWidth }: Props) => {
  return (
    <ScrollableList columnsCount={views.length} columnWidth={columnWidth}>
      <Stack direction="row" spacing={VIEWS_CARD_LIST_SPACING}>
        {views.map((view: IViewTableData, index: number) => (
          // column
          <Stack
            spacing={VIEWS_CARD_LIST_SPACING}
            key={view.header.value + index}
            css={classes.column(columnWidth)}
            useFlexGap={false}
            sx={{ flexWrap: "no-wrap" }}
          >
            {/* column header */}
            <div
              css={[
                classes.headerColumn,
                index === 0 && classes.firstHeaderColumn,
                index === views.length - 1 && classes.lastHeaderColumn
              ]}
              className="flexCenter"
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {view.header.label}
              </Typography>
            </div>
            {/* column body */}
            <Stack spacing={VIEWS_CARD_LIST_SPACING}>
              {view.entities.map((entity: IEntity, subIndex: number) => (
                <ViewCardAccordion
                  key={entity.objectId + index + subIndex}
                  entity={entity}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </ScrollableList>
  );
};

export default CardViews;
