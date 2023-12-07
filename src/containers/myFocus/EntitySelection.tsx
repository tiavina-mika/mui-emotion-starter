/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { IEntitySelectOption, IEntityType } from "../../types/entity.type";
import Card from "../../components/Card";
import { css } from "@emotion/css";

const selectOptions: IEntitySelectOption[] = [
  {
    icon: "problematic",
    label: "Problematique",
    value: "problematic"
  },
  {
    icon: "feature",
    label: "Fonctionnalité",
    value: "feature"
  },
  {
    icon: "user-story",
    label: "User story",
    value: "userStory"
  },
  {
    icon: "bug",
    label: "Bug",
    value: "bug"
  }
];

const classes = {
  cardRoot: css({
    // 2 cards per row (minus card padding X)
    width: "calc(50% - 10px)"
  }),
  card: css({
    minHeight: 80
  })
};

type Props = {
  onSelect: (type: IEntityType) => void;
};

const EntitySelection = ({ onSelect }: Props) => {
  const handleSelectEntityType = (type: IEntityType) => {
    onSelect(type);
  };

  return (
    <div className="stretchSelf flex1">
      <Stack direction="row" spacing={2}>
        {selectOptions.map((option: IEntitySelectOption, index: number) => (
          <Card
            onClick={() => handleSelectEntityType(option.value)}
            className={classes.card}
            contentClassName="flexCenter flex1"
            rootClassName={classes.cardRoot}
            hasShadow
            key={option.value + index}
          >
            <Stack spacing={0.5}>
              <div className="flexCenter">
                <img
                  alt={option.label}
                  src={"/icons/" + option.icon + ".svg"}
                />
              </div>
              <Typography variant="h4">{option.label}</Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default EntitySelection;
