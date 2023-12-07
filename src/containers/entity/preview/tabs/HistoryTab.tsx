/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Link, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getUserFullName } from "../../../../utils/user.utils";
import { users } from "../../../../utils/data/user";

dayjs.extend(relativeTime);

const histories = [
  {
    user: users[0],
    label: "modified this feature",
    createdAt: dayjs().subtract(2, "minutes").toDate()
  },
  {
    user: users[0],
    label: "added this feature",
    createdAt: dayjs().subtract(2, "minutes").toDate()
  },
  {
    user: users[0],
    label: "modified this feature",
    createdAt: dayjs().subtract(2, "minutes").toDate()
  },
  {
    user: users[1],
    label: "modified this feature",
    createdAt: dayjs().subtract(2, "days").toDate()
  },
  {
    user: users[1],
    label: "modified this feature",
    createdAt: dayjs().subtract(2, "weeks").toDate()
  },
  {
    user: users[0],
    label: "modified this feature",
    createdAt: dayjs().subtract(7, "month").toDate()
  }
];

const getHistoryRelativeDate = (date: Date) => {
  // greater than 6 mons
  if (dayjs(dayjs()).diff(date, "month") > 6) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  // display "date" ago
  return dayjs(date).fromNow();
};

const classes = {
  link: (theme: Theme) => ({
    color: theme.palette.primary.main
  })
};

const HistoryTab = () => {
  return (
    <Stack spacing={0.8}>
      {histories.map((history, index) => (
        <div key={index} className="flexRow center spaceBetween">
          <div key={index} className="flexRow center">
            {/* user name */}
            <Link
              href="/"
              variant="body1"
              className="textCenter"
              css={classes.link}
            >
              {getUserFullName(history.user)}
            </Link>
            &nbsp;
            {/* label */}
            <Typography variant="body1" className="grey800 textCenter">
              {history.label}.
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              {getHistoryRelativeDate(history.createdAt)}
            </Typography>
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default HistoryTab;
