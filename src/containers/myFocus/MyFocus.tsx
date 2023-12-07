/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { IconButton, lighten, Stack, Typography } from "@mui/material";
import { css, cx } from "@emotion/css";

import AddIcon from "../../components/AddIcon";
import EntitySelectionDialog from "./EntitySelectionDialog";
import Chip from "../../components/chip/Chip";
import Divider from "../../components/Divider";
import ButtonsSwitch from "../../components/ButtonsSwitch";
import HomeTabsTitle from "../home/navigations/HomeTabsTitle";
import { ISelectOption } from "../../types/app.type";
import { entities } from "../../utils/data/entity";
import { useToggle } from "../../hooks/useToggle";
import EntityPreviewDialog from "../entity/preview/EntityPreviewDialog";

const dateOptions: ISelectOption<string>[] = [
  {
    label: "Cette semaine 4",
    // TODO: chnage this?
    value: "thisWeek4"
  },
  {
    label: "La semaine prochaine 6",
    // TODO: chnage this?
    value: "nexTWeek6"
  }
];

const classes = {
  workflow: (color: string) => ({
    color,
    backgroundColor: lighten(color, 0.91)
  }),
  tabs: {
    marginTop: 17,
    marginBottom: 31
  },
  chip: {
    height: 21
  },
  priorisationChip: {
    "& .MuiChip-label": {
      fontWeight: 500,
      lineHeight: 1
    }
  },
  divider: {
    bottom: -20
  },
  tabActive: css({
    fontWeight: "700"
  })
};

const MyFocus = () => {
  const [openEntitySelectionDialog, setOpenEntitySelectionDialog] = useState<
    boolean
  >(false);

  const {
    open: openEntityPreviewDialog,
    toggle: toggleEntityPreviewDialog
  } = useToggle();
  const toggleOpenEntitySelectionDialog = () =>
    setOpenEntitySelectionDialog(!openEntitySelectionDialog);

  const handleSelectDate = (value: string) => {
    console.log("handleSelectDate value", value);
  };

  const handleFilter = () => console.log("filter");

  return (
    <div className="flexColumn stretchSelf flex1">
      {/* just for test */}

      {/* ------------ title ------------ */}
      <div className="flexRow center stretchSelf spaceBetween">
        <HomeTabsTitle title=" Mon Focus" />
        <IconButton onClick={handleFilter}>
          <img alt="filter" src="/icons/filter.svg" />
        </IconButton>
      </div>
      {/* -------------- tabs ------------ */}
      <div css={classes.tabs} className="flexColumn stretchSelf">
        <ButtonsSwitch
          onSelect={handleSelectDate}
          options={dateOptions}
          className="stretchSelf"
          color="default"
          labelActiveClassName={cx(classes.tabActive, "grey800")}
        />
      </div>

      {/* -------------- card ------------ */}
      <div className="flexColumn stretch stretchSelf">
        <Stack spacing={4.4}>
          {entities.map((entity, index) => (
            <div key={entity.objectId + index} className="positionRelative">
              <Stack direction="row" spacing={1}>
                {/* left */}
                <div className="flexRow stretchSelf">
                  <Chip
                    label={
                      <span className="flexRow center">
                        {entity.priorisation}&nbsp;
                        <img alt="" src="/icons/priorisation.svg" />
                      </span>
                    }
                    variant="filled"
                    color="error" // TODO: maybe this should be dynamic depending of the value
                    className="lh1"
                    css={[classes.chip, classes.priorisationChip]}
                  />
                </div>
                {/* right */}
                <Stack spacing={1.3} className="flex1">
                  {/* top */}
                  <div className="flexRow stretchSelf spaceBetween">
                    {/* top left */}
                    <Chip
                      label={entity.workflow.name}
                      css={[
                        classes.workflow(entity.workflow.color),
                        classes.chip
                      ]}
                    />
                    {/* top right */}
                    <Chip
                      label={entity.ticket}
                      variant="outlined"
                      css={classes.chip}
                    />
                  </div>
                  {/* bottom */}
                  <div>
                    <Typography className="grey800 lh15">
                      {entity.description}
                    </Typography>
                  </div>
                </Stack>
              </Stack>
              <Divider css={classes.divider} />
            </div>
          ))}
        </Stack>
      </div>
      <EntitySelectionDialog
        open={openEntitySelectionDialog}
        onClose={toggleOpenEntitySelectionDialog}
      />

      <EntityPreviewDialog
        open={openEntityPreviewDialog}
        onClose={toggleEntityPreviewDialog}
      />

      <AddIcon onClick={toggleOpenEntitySelectionDialog} />
    </div>
  );
};

export default MyFocus;
