/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Stack, useTheme } from "@mui/material";

import DriverSliderField from "../../../components/form/fields/DriverSliderField";
import Card from "../../../components/Card";
import { EntityDriver } from "../../../types/entity.type";
import { css } from "@emotion/css";

const drivers = [
  {
    driver: {
      objectId: "p-d01",
      icon: "🗣",
      name: "Acquisition",
      description: "Description du driver si existante."
    },
    impact: 0
  },
  {
    driver: {
      objectId: "p-d02",
      icon: "🎭",
      name: "Expérience Client",
      description: "Description du driver si existante."
    },
    impact: 0
  },
  {
    driver: {
      objectId: "p-d03",
      icon: "💸",
      name: "Fidélisation"
    },
    impact: 0
  }
];

const classes = {
  rootWithDescription: css({
    minHeight: "initial"
  }),
  contentClassName: {
    paddingTop: "15px !important",
    paddingBottom: "15px !important"
  },
  active: (theme: Theme) =>
    css({
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    })
};

type Props = {
  onChange: (value: EntityDriver) => void;
  value: EntityDriver[];
  options: EntityDriver[];
};
const ProblematicDriverSelect = ({
  options = [],
  onChange,
  value = []
}: Props) => {
  const theme = useTheme();

  const handleChangeImpact = (
    selectedDriver: EntityDriver,
    value: number | number[]
  ) => {
    const values = { ...selectedDriver, impact: value as number };
    onChange(values);
  };

  const handleChange = (selectedDriver: EntityDriver) => {
    onChange(selectedDriver);
  };

  return (
    <div className="flexColumn stretchSel">
      <Stack spacing={1} className="flexColumn stretchSelf">
        {options.map((driver: EntityDriver, index: number) => {
          const currentDriver = value.find(
            (currentValue) =>
              currentValue.driver.objectId === driver.driver.objectId
          );
          return (
            <Card
              key={driver.driver.objectId + index}
              title={driver.driver.name}
              left={driver.driver.icon}
              description={driver.driver.description}
              rootClassName={
                driver.driver.description && classes.rootWithDescription
              }
              css={classes.contentClassName}
              onClick={() => handleChange(driver)}
              isActive={!!currentDriver}
              activeClassName={classes.active(theme)}
            >
              {!!currentDriver && (
                <DriverSliderField
                  onChange={(value) => handleChangeImpact(driver, value)}
                  value={driver.impact}
                />
              )}
            </Card>
          );
        })}
      </Stack>
    </div>
  );
};

export default ProblematicDriverSelect;
