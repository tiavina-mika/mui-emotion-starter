/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

const classes = {
  root: {
    paddingTop: 23,
    paddingBottom: 23
  },
  description: {
    lineHeight: 1.57
  }
};

const MyFocusNoData = () => {
  return (
    <div className="flex1 stretchSelf" css={classes.root}>
      <Stack spacing={1.1}>
        <div className="flexCenter">
          <img alt="no-data" src="/icons/hands-up.svg" />
        </div>
        <div className="flexCenter">
          <Typography
            css={classes.description}
            variant="h4"
            className="grey900 textCenter"
          >
            Almost set !<br />
            Go to the setup tab to start
            <br />
            building great products.
          </Typography>
        </div>
      </Stack>
    </div>
  );
};

export default MyFocusNoData;
