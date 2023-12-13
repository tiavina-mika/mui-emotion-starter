/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Avatar, Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING } from "../utils/constants";
import { Theme } from "@emotion/react";

const classes = {
  header: (theme: Theme) => ({
    borderBottom: "1px solid " + theme.palette.grey[300],
    padding: `6px ${LAYOUT_CONTENT_PADDING}px`
  })
};

const Header = () => {
  return (
    <div
      css={classes.header}
      className="flexRow spaceBetween center stretchSelf"
    >
      <Typography variant="h3">Mik.</Typography>
      <div>
        <Avatar
          alt="profile"
          src="/images/tiavina-mika.jpg"
          sx={{ width: 32, height: 32 }}
        />
      </div>
    </div>
  );
};

export default Header;
