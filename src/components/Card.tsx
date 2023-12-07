/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { cx } from "@emotion/css";
import { Theme } from "@emotion/react";
import { CardContent, Stack, Typography } from "@mui/material";
import { MouseEvent, ReactNode } from "react";
import MUICard, { CardProps as MUICardProps } from "@mui/material/Card";

const borderColor = "#DCDCDC";

const classes = {
  root: {
    border: "1px solid " + borderColor,
    boxShadow: "none",
    borderRadius: 6,
    minHeight: 44
  },
  rootWithLabel: {
    overflow: "initial"
  },
  content: {
    padding: "0px !important"
  },
  labelContainer: {
    top: -5,
    left: 10
  },
  label: (theme: Theme) => ({
    color: theme.palette.grey[800]
  }),
  left: {
    paddingLeft: 11,
    paddingRight: 11
  },
  withDivider: (isActive: boolean, direction: "left" | "right" = "left") => (
    theme: Theme
  ) => {
    const color = isActive ? theme.palette.primary.main : borderColor;
    const border = "1px solid " + color;

    if (direction === "left") {
      return {
        borderRight: border
      };
    }
    return {
      borderLeft: border
    };
  },
  withoutLeftDivider: {
    paddingLeft: 0,
    paddingRight: 0
  },
  withoutLeftDividerAndWithIcon: {
    paddingRight: 0,
    paddingLeft: 11
  },
  center: {
    paddingLeft: 14,
    paddingRight: 14
  },
  active: (theme: Theme) => ({
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light
  }),
  activeText: (theme: Theme) => ({
    color: theme.palette.primary.main
  }),
  right: {
    paddingLeft: 21,
    paddingRight: 21
  },
  rightArrow: {
    border: "none"
  },
  rootWithDescription: {
    minHeight: 68
  },
  typography: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1
  },
  shadow: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)"
  }
};

const getLeftClasses = (
  withLeftDivider: boolean,
  hasIcon: boolean,
  isActive: boolean
) => {
  if (withLeftDivider) return classes.withDivider(isActive, "left");
  if (hasIcon) return classes.withoutLeftDividerAndWithIcon;
  return classes.withoutLeftDivider;
};

export type CardProps = {
  className?: string;
  rootClassName?: string;
  contentClassName?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  centerClassName?: string;
  activeClassName?: string;
  children?: ReactNode;
  content?: string;
  left?: ReactNode;
  right?: ReactNode;
  isActive?: boolean;
  hasShadow?: boolean;
  onClick?: () => void;
  onClickRight?: () => void;
  description?: string;
  title?: string;
  withLeftDivider?: boolean;
  withRightDivider?: boolean;
  withArrow?: boolean;
  leftClassName?: string;
  label?: string;
  titleTextClassName?: string;
  rightClassName?: string;
} & MUICardProps;

const Card = ({
  children,
  className,
  content,
  rootClassName,
  contentClassName,
  descriptionClassName,
  titleClassName,
  description,
  title,
  left,
  right,
  onClick,
  leftClassName,
  titleTextClassName,
  rightClassName,
  centerClassName,
  activeClassName,
  label,
  onClickRight,
  isActive = false,
  hasShadow = false,
  withRightDivider = true,
  withLeftDivider = true,
  withArrow = false,
  ...rest
}: CardProps) => {
  const handleClickRight = (event: MouseEvent<HTMLDivElement>) => {
    if (!onClickRight) return;
    event.stopPropagation();
    onClickRight();
  };

  return (
    <MUICard
      css={[
        classes.root,
        isActive && classes.active,
        hasShadow && classes.shadow,
        label && classes.rootWithLabel,
        description && classes.rootWithDescription
      ]}
      elevation={0}
      className={cx(
        "flexColumn stretchSelf positionRelative",
        rootClassName,
        onClick ? "cursorPointer" : "",
        isActive ? activeClassName : ""
      )}
      onClick={onClick}
      {...rest}
    >
      {label && (
        <div css={classes.labelContainer} className="positionAbsolute">
          <Typography css={classes.label} variant="body2">
            {label}
          </Typography>
        </div>
      )}
      <CardContent
        className={cx("flexRow flex1 justifyCenter stretchSelf", className)}
        css={classes.content}
      >
        {/* ----- left ----- */}
        {left && (
          <div
            className={cx(
              "flexCenter stretchSelf",
              isActive ? activeClassName : "",
              leftClassName
            )}
            css={[
              classes.left,
              isActive && classes.active,
              getLeftClasses(withLeftDivider, !!left, isActive)
            ]}
          >
            {left}
          </div>
        )}
        {/* ----- center ----- */}
        <div
          className={cx("flex1 centerSelf", contentClassName, centerClassName)}
          css={classes.center}
        >
          {/* ------- title & description ------- */}
          {(title || description) && (
            <Stack spacing={0.9}>
              <div className={titleClassName}>
                {title && (
                  <Typography
                    variant="h4"
                    className={titleTextClassName}
                    css={isActive && classes.activeText}
                  >
                    {title}
                  </Typography>
                )}
              </div>
              {description && (
                <div className={descriptionClassName}>
                  <Typography variant="body1" sx={{ lineHeight: 0.8 }}>
                    {description}
                  </Typography>
                </div>
              )}
            </Stack>
          )}
          {/* text content */}
          {content && (
            <Typography css={classes.typography} alignSelf="flex-start">
              {content}
            </Typography>
          )}
          {/* component content */}
          {children}
        </div>
        {/* ----- right ----- */}
        {right && (
          <div
            className={cx(
              "flexCenter stretchSelf",
              onClickRight ? "cursorPointer" : "",
              rightClassName
            )}
            css={[
              classes.right,
              isActive && classes.active,
              withRightDivider && classes.withDivider(isActive, "right")
            ]}
            onClick={handleClickRight}
          >
            {right}
          </div>
        )}
        {onClick && withArrow && (
          <div
            className="flexCenter stretchSelf"
            css={[classes.right, classes.rightArrow]}
          >
            <img alt="eto" src="/icons/superior.svg" />
          </div>
        )}
      </CardContent>
    </MUICard>
  );
};

export default Card;
