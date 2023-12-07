/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { useState } from "react";
import { IconButton, Stack } from "@mui/material";

import {
  ISelectOption,
  ISwitchOption,
  IViewTableDatasTab
} from "../../../types/app.type";
import Tabs from "../../../components/Tabs";
import HomeTabsTitle from "../../home/navigations/HomeTabsTitle";
import Chip from "../../../components/chip/Chip";
import RoadmapTab from "./tabs/RoadmapTab";
import InProgressTab from "./tabs/InProgressTab";
import ListTab from "./tabs/ListTab";
import CreateViewForm from "./CreateViewForm";

import { entities } from "../../../utils/data/entity";
import { IViewTableData } from "../../../types/entity.type";
import { HOME_BOTTOM_TABS_HEIGHT } from "../../../utils/constants";
import FieldsSelectionDialog from "./fieldsSelection/FieldsSelectionDialog";
import { entityFields } from "../../../utils/entity.utils";
import { IView } from "../../../types/view.type";

// TODO: should be data from database
const roadmapViews: IViewTableData[] = [
  {
    header: {
      label: "Avril",
      value: "april"
    },
    entities
  },
  {
    header: {
      label: "Mai",
      value: "may"
    },
    entities: [...entities, ...entities]
  },
  {
    header: {
      label: "Juin",
      value: "june"
    },
    entities
  }
];

const inProgressViews: IViewTableData[] = [
  {
    header: {
      label: "A faire",
      value: "todo"
    },
    entities
  },
  {
    header: {
      label: "En cours",
      value: "inProgress"
    },
    entities: [...entities, ...entities]
  },
  {
    header: {
      label: "A tester",
      value: "toTest"
    },
    entities
  }
];

const options: ISelectOption<IViewTableDatasTab>[] = [
  {
    label: "In Progress",
    value: "inProgress"
  },
  {
    label: "Roadmap",
    value: "roadmap"
  },
  {
    label: "Liste",
    value: "list"
  }
];

const classes = {
  tabs: (theme: Theme) => ({
    bottom: HOME_BOTTOM_TABS_HEIGHT + 16, // +marginBottom

    // reduce width and center in mobile
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      "& > div": {
        width: 800
      },
      "& .MuiTabs-flexContainer": {
        justifyContent: "center"
      }
    }
  }),
  iconButton: {
    padding: 2
  },
  filtersContainer: {
    marginTop: 13
  },
  tabPanel: {
    paddingTop: 14
  },
  filtersButton: {
    paddingLeft: 10.5,
    paddingRight: 10.5,
    "& .MuiChip-label": {
      marginLeft: 4
    }
  }
};

type Props = {
  view?: IView;
};
const View = ({ view }: Props) => {
  const [tab, setTab] = useState<IViewTableDatasTab>("roadmap");
  const [openFieldsSelectionDialog, setOpenFieldsSelectionDialog] = useState<
    boolean
  >(false);
  const [switchesOptions, setSwitchesOptions] = useState<ISwitchOption[]>(
    entityFields.map(
      (field: ISelectOption): ISwitchOption => ({ ...field, checked: false })
    )
  );

  const handleTabChange = (value: IViewTableDatasTab) => {
    setTab(value);
  };

  // switch check
  const handleCheckField = (value: string) => {
    const newFieldsOptions = switchesOptions.map(
      (field: ISwitchOption): ISwitchOption => {
        if (value === field.value) {
          return { ...field, checked: !field.checked };
        }

        return field;
      }
    );

    setSwitchesOptions(newFieldsOptions);
  };

  const handleShare = () => console.log("share");
  const handleFavorite = () => console.log("favorite");
  const handleDuplicate = () => console.log("duplicate");
  const handleFilter = () => console.log("filter");
  const toggleFieldsSelectionDialog = () =>
    setOpenFieldsSelectionDialog(!openFieldsSelectionDialog);

  const handleSaveView = (values: IView) => console.log("values", values);

  return (
    <div className="flexColumn spaceBetween stretchSelf flex1">
      {/* top */}
      <div className="flexColumn stretchSelf flex1">
        {/* header */}
        <div className="flexColumn stretchSelf">
          {/* title & icons */}
          {view ? (
            <div className="flexRow stretchSelf flex1 center spaceBetween">
              <HomeTabsTitle title={view.name} />
              <Stack direction="row" spacing={0.4} alignItems="center">
                <IconButton onClick={handleShare} css={classes.iconButton}>
                  <img alt="share" src="/icons/share.svg" />
                </IconButton>
                <IconButton onClick={handleFavorite} css={classes.iconButton}>
                  <img
                    alt="duplicate"
                    src={`/icons/${
                      view.favorite ? "heart-filled" : "heart"
                    }.svg`}
                  />
                </IconButton>
                <IconButton onClick={handleDuplicate} css={classes.iconButton}>
                  <img alt="duplicate" src="/icons/duplicate.svg" />
                </IconButton>
              </Stack>
            </div>
          ) : (
            <CreateViewForm onSave={handleSaveView} />
          )}

          {/* filters */}
          <div
            css={classes.filtersContainer}
            className="flexColumn stretchSelf"
          >
            <Stack direction="row" spacing={1}>
              {/* field */}
              <Chip
                shape="angular"
                variant="outlined"
                icon={<img alt="field" src="/icons/filter2.svg" />}
                label="Champ"
                css={classes.filtersButton}
                onClick={toggleFieldsSelectionDialog}
              />
              {/* filter */}
              <Chip
                shape="angular"
                variant="outlined"
                icon={<img alt="field" src="/icons/filter3.svg" />}
                label="Filtre"
                css={classes.filtersButton}
                onClick={handleFilter}
              />
            </Stack>
          </div>
        </div>
        {/* content */}
        <div css={classes.tabPanel} className="flexColumn stretchSelf flex1">
          {tab === "inProgress" && <InProgressTab views={inProgressViews} />}
          {tab === "roadmap" && <RoadmapTab views={roadmapViews} />}
          {tab === "list" && <ListTab entities={[...entities, ...entities]} />}
        </div>
      </div>

      {/* fields selection dialog */}
      <FieldsSelectionDialog
        open={openFieldsSelectionDialog}
        onClose={toggleFieldsSelectionDialog}
        onCheck={handleCheckField}
        switchesOptions={switchesOptions}
      />

      {/* bottom tabs */}
      <Tabs
        css={classes.tabs}
        options={options}
        onTabChange={handleTabChange}
        tab={tab}
        className="positionSticky"
      />
    </div>
  );
};

export default View;
