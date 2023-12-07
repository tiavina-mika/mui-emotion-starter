/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import Chip from "../../../components/chip/Chip";
import Dialog from "../../../components/Dialog";
import Tabs from "../../../components/Tabs";
import { ISelectOption } from "../../../types/app.type";
import { entities } from "../../../utils/data/entity";
import EntityWorkflowChip from "../EntityWorkflowChip";
import EntityDescriptionTab from "./tabs/EntityDescriptionTab";
import EntityDetailsTab from "./tabs/EntityDetailsTab";
import EntityResultsTab from "./tabs/EntityResultsTab";
import EntityMembersTab from "./tabs/EntityMembersTab";
import HistoryTab from "./tabs/HistoryTab";
import TasksTab from "./tabs/TasksTab";

const entity = entities[0];

const tabs: ISelectOption<string>[] = [
  {
    label: "Description",
    value: "description"
  },
  {
    label: "Details",
    value: "details"
  },
  {
    label: "Tasks",
    value: "tasks"
  },
  {
    label: "Results",
    value: "results"
  },
  {
    label: "Profiles",
    value: "profils"
  },
  {
    label: "Members",
    value: "members"
  },
  {
    label: "History",
    value: "history"
  }
];
type Props = {
  open: boolean;
  onClose: () => void;
  // entity: IEntity;
};
const EntityPreviewDialog = ({ open, onClose }: Props) => {
  const [tab, setTab] = useState<string>(tabs[0].value);

  const handleTabChange = (tab: string) => setTab(tab);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullScreen
      maxWidth="xl"
      withCloseButton
      closeButtonPosition="start"
      closeIcon="/icons/prev-arrow.svg"
      className={css({ paddingTop: 6 })}
      // title={(stepInfos as IStepInfos)[step].title}
      // description={(stepInfos as IStepInfos)[step].description}
      contentClassName="stretchSelf flex1 flexColumn"
    >
      <Stack spacing={3.2} className="stretchSelf">
        <Stack spacing={1}>
          <div className="flexRow spaceBetween stretchSelf">
            <EntityWorkflowChip workflow={entity.workflow} />
            <Chip label={entity.ticket} variant="outlined" />
          </div>
          <div>
            <Typography
              variant="h2"
              css={{ fontWeight: 700, lineHeight: 1.36 }}
            >
              {entity.title}
            </Typography>
          </div>
        </Stack>
        <div className="positionRelative">
          <Tabs
            onTabChange={handleTabChange}
            tab={tab}
            options={tabs}
            tabsClassName={css({ backgroundColor: "transparent", padding: 0 })}
          />
          <div css={{ marginTop: 18 }}>
            {tab === "description" && (
              <EntityDescriptionTab
                description={entity.description}
                type={entity.type}
              />
            )}
            {tab === "details" && (
              <EntityDetailsTab
                products={entity.products || []}
                components={entity.components || []}
                drivers={entity.drivers || []}
                type={entity.type}
              />
            )}
            {tab === "tasks" && <TasksTab tasks={entity.tasks || []} />}
            {tab === "results" && (
              <EntityResultsTab results={entity.results || []} />
            )}
            {tab === "members" && (
              <EntityMembersTab
                teams={entity.teams || []}
                members={entity.members || []}
              />
            )}
            {tab === "history" && <HistoryTab />}
          </div>
        </div>
      </Stack>
    </Dialog>
  );
};

export default EntityPreviewDialog;
