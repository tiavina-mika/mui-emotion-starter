import { css, cx } from "@emotion/css";
import { Stack, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ISelectOption, ISelectedOptionValue } from "../../../types/app.type";
import Card, { CardProps } from "../../Card";

const classes = {
  card: (theme: Theme) => ({
    border: "1px solid " + theme.palette.grey[100],
    boxShadow: "0px 0px 8px rgba(31, 31, 31, 0.05)",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer"
  }),
  activeRow: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.light,
    border: "1px solid " + theme.palette.primary.dark,
    borderRadius: 6
  }),
  activeColumn: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.light,
    border: "1px solid " + theme.palette.primary.dark
  })
};

type Props = {
  onChange: (value: ISelectedOptionValue[] | ISelectedOptionValue) => void;
  value?: ISelectedOptionValue[] | ISelectedOptionValue;
  options: ISelectOption[];
  direction?: "row" | "column";
  right?: ReactNode;
  isMultiple?: boolean;
  leftCardClassName?: string;
  withLeftCardDivider?: boolean;
  cardRootClassName?: string;
  cardCheckboxContentClassName?: string;
  cardContentClassName?: string;
  selectedCardClassName?: string;
  selectedTextClassName?: string;
} & CardProps;

const CardCheckboxInput = ({
  onChange,
  leftCardClassName,
  withLeftCardDivider,
  cardRootClassName,
  cardCheckboxContentClassName,
  cardContentClassName,
  selectedCardClassName,
  selectedTextClassName,
  value = [],
  options = [],
  direction = "row",
  right,
  isMultiple = true,
  ...rest
}: Props) => {
  const handleChange = (selectedValue: string): void => {
    if (isMultiple) {
      // unselect
      if (Array.isArray(value) && value.includes(selectedValue)) {
        const nonSelectedValues = value.filter(
          (formValue: string): boolean => formValue !== selectedValue
        );
        onChange(nonSelectedValues);
        // select
      } else {
        onChange([selectedValue, ...value]);
      }
      return;
    }
    onChange(selectedValue);
  };

  const isActiveRow = (optionValue: string) =>
    value.includes(optionValue) && direction === "row";
  const isActiveColumn = (optionValue: string) =>
    value.includes(optionValue) && direction === "column";

  return (
    <Stack direction={direction} spacing={2} useFlexGap flexWrap="wrap">
      {options.map((option: ISelectOption, index: number) => (
        <Card
          key={option.value + index}
          onClick={() => handleChange(option.value)}
          leftClassName={leftCardClassName}
          rootClassName={cardRootClassName}
          contentClassName={cardContentClassName}
          className={cx(
            cardCheckboxContentClassName,
            (isActiveRow(option.value) || isActiveColumn(option.value)) && [
              selectedCardClassName,
              css({
                border: "1px solid " + option.color,
                backgroundColor: option.backgroundColor
              })
            ]
          )}
          left={option.icon}
          withLeftDivider={withLeftCardDivider}
          right={right}
          css={[
            classes.card,
            isActiveRow(option.value) && classes.activeRow,
            isActiveColumn(option.value) && classes.activeColumn
          ]}
          isActive={!!value.includes(option.value)} // new
          {...rest}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <div className="flexColumn gapTwo">
              <Typography
                variant="h4"
                className={cx(
                  !!value.includes(option.value) && selectedTextClassName,
                  css({ color: option.color })
                )}
              >
                {option.label}
              </Typography>
              {option.text && (
                <Typography
                  variant="h6"
                  css={
                    (isActiveRow(option.value) ||
                      isActiveColumn(option.value)) && { color: option.color }
                  }
                >
                  {option.text}
                </Typography>
              )}
            </div>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default CardCheckboxInput;
