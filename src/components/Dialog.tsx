/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Button,
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  SxProps,
  Theme as MUITheme,
  Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactNode } from "react";
import { cx } from "@emotion/css";

import { getVerticalAlignment } from "../utils/utils";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { FORCE_MOBILE, LAYOUT_CONTENT_PADDING } from "../utils/constants";

type IAlignment = "top" | "center" | "bottom";
const getDialogBorderRadius = (alignment: IAlignment) => {
  if (alignment === "top") {
    return "0 0 10px 10px";
  }

  if (alignment === "center") {
    return 10;
  }

  return "10px 10px 0 0";
};

const classes = {
  root: (alignment: IAlignment, fullWidth = false, fullScreen = false) => ({
    "& .MuiDialog-container": {
      alignItems: getVerticalAlignment(alignment)
    },
    "& .MuiDialog-paper": {
      margin: 0,
      borderRadius: getDialogBorderRadius(alignment),
      ...(fullScreen && {
        minHeight: `calc(100% - ${LAYOUT_CONTENT_PADDING * 2 - 2}px)`,
        borderRadius: 0
      }),
      // NOTE: force mobile is only for codesanbox
      ...((fullWidth || fullScreen) && {
        width: FORCE_MOBILE ? 390 : "100%",
        marginLeft: FORCE_MOBILE ? -16 : 0
      })
    }
  }),
  titleContainer: {
    paddingLeft: LAYOUT_CONTENT_PADDING,
    paddingRight: LAYOUT_CONTENT_PADDING
  },
  titleContainerWithDescription: {
    marginBottom: 17
  },
  description: {
    marginBottom: 39
  },
  closeButtonContainer: {
    marginBottom: 5,
    paddingLeft: LAYOUT_CONTENT_PADDING,
    paddingRight: LAYOUT_CONTENT_PADDING
  },
  topLine: {
    top: 12,
    left: 0,
    right: 0
  }
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  children: ReactNode;
  actions?: ReactNode;
  title?: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
  alignment?: IAlignment;
  className?: string;
  maxWidth?: DialogProps["maxWidth"];
  sxPaper?: SxProps<MUITheme>;
  formId?: string;
  description?: string;
  contentContainerClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  loading?: boolean;
  withCloseButton?: boolean;
  fullScreen?: boolean;
  closeButtonPosition?: "end" | "start";
  withTopLine?: boolean;
  cancelButtonText?: string;
  closeIcon?: string;
  closeButtonClassName?: string;
} & DialogProps;

const Dialog = ({
  className,
  contentContainerClassName,
  contentClassName,
  open,
  onClose,
  children,
  actions,
  title,
  sxPaper,
  formId,
  loading,
  description,
  subtitle,
  cancelButtonText,
  closeButtonClassName,
  descriptionClassName,
  titleClassName,
  withCloseButton = false,
  fullScreen = false,
  maxWidth = "sm",
  alignment = "bottom",
  closeIcon = "/icons/close.svg",
  closeButtonPosition = "end",
  withTopLine = false,
  ...dialogProps
}: Props) => {
  const isSmallScreen = useBreakpoint();
  return (
    <MUIDialog
      {...dialogProps}
      maxWidth={isSmallScreen ? "xl" : maxWidth}
      className={className}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      // use dialog fullScreen in large screen instead of the style
      fullScreen={!isSmallScreen && fullScreen}
      aria-describedby="alert-dialog-slide-description"
      css={classes.root(
        alignment,
        dialogProps.fullWidth,
        // use style for full screen in mobile
        isSmallScreen && fullScreen
      )}
    >
      {/* grey top line */}
      {withTopLine && (
        <div className="flexCenter positionAbsolute" css={classes.topLine}>
          <img alt="" src="/icons/grey-line.svg" />
        </div>
      )}

      {/* close button */}
      {withCloseButton && (
        <div
          className={cx(
            "flexRow",
            closeButtonPosition === "end" ? "justifyEnd" : "justifyStart",
            closeButtonClassName
          )}
          css={classes.closeButtonContainer}
        >
          <IconButton
            sx={{ px: 0 }}
            aria-label="close"
            onClick={onClose}
            className="endSelf"
          >
            <img alt="close" src={closeIcon} />
          </IconButton>
        </div>
      )}

      {/* titles */}
      {(title || subtitle) && (
        <div
          css={[
            classes.titleContainer,
            !description && classes.titleContainerWithDescription
          ]}
        >
          <Stack spacing={1}>
            {/* subtitle */}
            <Typography
              variant="h6"
              className="grey600 textUpperCase lh1"
              sx={{ fontWeight: 700, letterSpacing: 0.1 }}
            >
              {subtitle}
            </Typography>
            <DialogTitle className={titleClassName}>{title}</DialogTitle>
          </Stack>
        </div>
      )}

      {/* dialog body */}
      <DialogContent
        className={cx(
          "flexColumn stretch",
          className,
          contentContainerClassName
        )}
      >
        {description && (
          <DialogContentText
            id="alert-dialog-slide-description"
            css={classes.description}
            className={descriptionClassName}
          >
            {description}
          </DialogContentText>
        )}
        <div className={contentClassName}>{children}</div>
      </DialogContent>

      {/* actions, mainly buttons */}
      {actions && <DialogActions>{actions}</DialogActions>}

      {/* actions for form (the formId should the form formId) */}
      {formId && (
        <DialogActions>
          <Button type="submit" variant="contained" fullWidth form={formId}>
            {loading ? "..." : "Enregistrer"}
          </Button>
          {cancelButtonText && (
            <Button variant="outlined" fullWidth onClick={onClose}>
              {cancelButtonText}
            </Button>
          )}
        </DialogActions>
      )}
    </MUIDialog>
  );
};

export default Dialog;
