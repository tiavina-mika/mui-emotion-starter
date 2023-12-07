/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Typography, Chip } from "@mui/material";

import { ITask, ITaskStatusType } from "../../../../types/task.type";

const getTaskStatusColor = (status: ITaskStatusType, theme: Theme) => {
  switch (status) {
    case "in-progress":
      return {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main
      };
    case "done":
      return {
        backgroundColor: theme.palette.success.light,
        color: "#00AE70"
      };
    // to-do
    default:
      return {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.main
      };
  }
};

const getTaskStatusLabel = (status: ITaskStatusType): string => {
  switch (status) {
    case "in-progress":
      return "In progress";
    case "done":
      return "Done";
    // to-do
    default:
      return "To do";
  }
};

const classes = {
  tasks: {
    // override parent margin top
    marginTop: -18
  },
  task: (theme: Theme) => ({
    borderBottom: "1px solid " + theme.palette.grey[200],
    paddingTop: 19,
    paddingBottom: 19
  }),
  status: (status: ITaskStatusType) => (theme: Theme) => ({
    ...getTaskStatusColor(status, theme),
    paddingLeft: 12,
    paddingRight: 12
  })
};

type Props = {
  tasks: ITask[];
};
const TasksTab = ({ tasks }: Props) => {
  return (
    <div css={classes.tasks}>
      {tasks.map((task: ITask, index: number) => (
        <div
          key={task.objectId + index}
          className="flexRow center spaceBetween "
          css={classes.task}
        >
          <Typography variant="h4" className="grey800 textCenter">
            {task.name}.
          </Typography>
          {/* <Typography variant="body1">{task.status}</Typography> */}
          <Chip
            label={getTaskStatusLabel(task.status)}
            color="success"
            variant="outlined"
            css={classes.status(task.status)}
          />
        </div>
      ))}
    </div>
  );
};

export default TasksTab;
