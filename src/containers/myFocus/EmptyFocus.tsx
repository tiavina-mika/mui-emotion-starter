/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { IconButton, lighten, Stack, Typography } from "@mui/material";
import AddIcon from "../../components/AddIcon";
// import DriverSliderField from "../../components/form/fields/DriverSliderField";
import EntitySelectionDialog from "./EntitySelectionDialog";

import { useState } from "react";
import Chip from "../../components/chip/Chip";
import Divider from "../../components/Divider";
import ButtonsSwitch from "../../components/ButtonsSwitch";
import { ISelectOption } from "../../types/app.type";
import { css, cx } from "@emotion/css";

const entitties = [
  {
    objectId: "p001",
    description:
      "Retrouver la croissance du volume d’inscrits en menant une discovery approfondie côté SC.",
    entityId: "P-01",
    priorisation: 75,
    type: "problematic",
    workflow: {
      objectId: "p001w01",
      status: "Discovery",
      color: "#37ACB7"
    }
  },
  {
    objectId: "f002",
    description: "Ajouter des couverts (sur tous les corners).",
    entityId: "F-41",
    priorisation: 30,
    type: "feature",
    workflow: {
      objectId: "f001w01",
      status: "Test awaiting",
      color: "#6F00FF"
    }
  },
  {
    objectId: "f003",
    description:
      "Résoudre le manque de fluidité perçu par les utilisateurs pour leur offrir une meilleure expérience de navigation..",
    entityId: "F-34",
    priorisation: 18,
    type: "feature",
    workflow: {
      objectId: "f002w01",
      status: "Evaluate",
      color: "#00AE70"
    }
  },
  {
    objectId: "us004",
    description: "Supprimer la fonction d’ajout.",
    entityId: "US-23",
    priorisation: 15,
    type: "userStory",
    workflow: {
      objectId: "us002w01",
      status: "Conception",
      color: "#FF274F"
    }
  }
];

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
  title: {
    fontSize: 26,
    fontFamily: "Product Sans Medium",
    lineHeight: 1
  },
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

  const toggleOpenEntitySelectionDialog = () =>
    setOpenEntitySelectionDialog(!openEntitySelectionDialog);

  const handleSelectDate = (value: string) => {
    console.log("handleSelectDate value", value);
  };

  const handleFilter = () => console.log("filter");

  return (
    <div className="flexColumn stretchSelf flex1">
      {/* just for test */}
      {/* <DriverSliderField /> */}

      {/* ------------ title ------------ */}
      <div className="flexRow center stretchSelf spaceBetween">
        <Typography variant="h1" css={classes.title}>
          Mon Focus
        </Typography>
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
          {entitties.map((entity, index) => (
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
                      label={entity.workflow.status}
                      css={[
                        classes.workflow(entity.workflow.color),
                        classes.chip
                      ]}
                    />
                    {/* top right */}
                    <Chip
                      label={entity.entityId}
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
      <AddIcon onClick={toggleOpenEntitySelectionDialog} />
    </div>
  );
};

export default MyFocus;
