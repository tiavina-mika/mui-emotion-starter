/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import { Theme } from "@emotion/react";
import { IconButton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { getAlignment } from "../../utils/utils";

import TopIcon from "./TopIcon";
import { LAYOUT_CONTENT_PADDING } from "../../utils/constants";
import Divider from "../Divider";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

import { useToggle } from "../../hooks/useToggle";

const classes = {
  pageLayoutRoot: {
    height: "100svh"
  },
  pageLayoutContent: (theme: Theme) => ({
    paddingBottom: 32,
    paddingTop: 32,
    paddingLeft: LAYOUT_CONTENT_PADDING,
    paddingRight: LAYOUT_CONTENT_PADDING,
    flex: 1,
    [theme.breakpoints.up("md")]: {
      maxWidth: 600
    }
  }),
  titleContainer: (alignment: "left" | "center" | "right") => ({
    alignItems: getAlignment(alignment)
  }),
  subtitle: (alignment: "left" | "center" | "right") => (theme: Theme) => ({
    color: theme.palette.grey[600],
    textAlign: alignment
  }),
  title: (alignment: "left" | "center" | "right") => ({
    fontWeight: 700,
    textAlign: alignment
  }),
  description: (alignment: "left" | "center" | "right") => ({
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    textAlign: alignment
  }),
  imageContainer: (alignment: "left" | "center" | "right") => ({
    "& img": {
      width: "100%"
    },
    justifyContent: getAlignment(alignment)
  })
};

type Props = {
  children?: ReactNode;
  title?: string | ReactNode;
  subtitle?: string;
  description?: string | ReactNode;
  info?: string;
  alignment?: "left" | "center" | "right";
  image?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  subtitleClassName?: string;
  rootClassName?: string;
  topClassName?: string;
  className?: string;
  titleSpacing?: number;
  contentClassName?: string;
  textSpacing?: number;
  imageContainerClassName?: string;
  onBack?: () => void;
  onSearch?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  shouldConfirmDeletion?: boolean;
  withHeaderDivider?: boolean;
};

const PageLayout = ({
  children,
  title,
  description,
  image,
  descriptionClassName,
  titleClassName,
  subtitleClassName,
  rootClassName,
  contentClassName,
  imageContainerClassName,
  className,
  subtitle,
  onBack,
  onSearch,
  onEdit,
  onDelete,
  textSpacing = 1,
  withHeaderDivider = false,
  shouldConfirmDeletion = false,
  alignment = "left",
  titleSpacing = 3
}: Props) => {
  const {
    open: openDeleteConfirmationDialog,
    toggle: toggleDeleteConfirmationDialog
  } = useToggle();

  // shouldConfirmDeletion
  const handleDeleteClick = () => {
    if (!onDelete) return;

    if (shouldConfirmDeletion) {
      toggleDeleteConfirmationDialog();
      return;
    }
    onDelete();
  };

  return (
    <div
      className={cx("flexRow justifyCenter", rootClassName)}
      css={classes.pageLayoutRoot}
    >
      <div
        className={cx("flexCenter stretchSelf", contentClassName)}
        css={classes.pageLayoutContent}
      >
        {/* ---------- header ---------- */}
        <Stack
          className="stretchSelf"
          spacing={titleSpacing}
          css={classes.titleContainer(alignment)}
        >
          {/* ---------- top ---------- */}
          <div className="stretchSelf flexRow spaceBetween">
            {onBack && (
              <IconButton onClick={onBack} sx={{ p: 0 }}>
                <TopIcon alignment="left" image="/icons/prev-arrow.svg" />
              </IconButton>
            )}
            {onSearch && (
              <IconButton onClick={onSearch} sx={{ p: 0 }}>
                <TopIcon alignment="right" image="/icons/search.svg" />
              </IconButton>
            )}
            {onEdit && (
              <IconButton onClick={onEdit} sx={{ p: 0 }}>
                <img alt="edit" src="/icons/edit-write-md.svg" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={handleDeleteClick} sx={{ p: 0 }}>
                <img alt="edit" src="/icons/trash.svg" />
              </IconButton>
            )}
          </div>
          {image && (
            <TopIcon
              alignment={alignment}
              image={image}
              css={imageContainerClassName}
            />
          )}
          {/* ---------- bottom ---------- */}
          <Stack className="stretchSelf flexColumn positionRelative">
            <Stack
              className="stretchSelf flexColumn"
              spacing={textSpacing}
              css={classes.titleContainer(alignment)}
            >
              {/* subtitle */}
              {subtitle && (
                <div className="stretchSelf">
                  <Typography
                    variant="h5"
                    className={subtitleClassName}
                    css={classes.subtitle(alignment)}
                  >
                    {subtitle}
                  </Typography>
                </div>
              )}
              {/* title */}
              {title && (
                <div className="stretchSelf">
                  <Typography
                    variant="h2"
                    className={cx(titleClassName, "fw700")}
                    css={classes.title(alignment)}
                  >
                    {title}
                  </Typography>
                </div>
              )}
              {/* description */}
              {description && (
                <div className="stretchSelf">
                  <Typography
                    variant="h4"
                    css={classes.description(alignment)}
                    className={descriptionClassName}
                  >
                    {description}
                  </Typography>
                </div>
              )}
            </Stack>
            {withHeaderDivider && <Divider css={{ bottom: -18 }} />}
          </Stack>
        </Stack>
        {/* ---------- content ---------- */}
        {children && (
          <div
            className={cx("flex1 stretchSelf flexColumn", className)}
            // TODO: the without divider margin may be changed
            css={{ marginTop: withHeaderDivider ? 35 : 6 }}
          >
            {children}
          </div>
        )}
      </div>

      {/* delete confirmation dialog */}
      {onDelete && (
        <DeleteConfirmationDialog
          open={openDeleteConfirmationDialog}
          onClose={toggleDeleteConfirmationDialog}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
};

export default PageLayout;
