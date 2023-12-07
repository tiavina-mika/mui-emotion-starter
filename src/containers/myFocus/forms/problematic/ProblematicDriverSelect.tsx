/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Stack, useTheme } from "@mui/material";
import { css } from "@emotion/css";
import { useState } from "react";

import Card from "../../../../components/Card";
import { EntityDriver } from "../../../../types/entity.type";
import { getEntityDriverOption } from "../../../../utils/entity.utils";
import Slider from "../../../../components/form/inputs/Slider";

const classes = {
  root: css({
    minHeight: "initial"
  }),
  card: (selected: boolean) => ({
    paddingTop: "15px !important",
    paddingBottom: !selected ? "22px !important" : "initial"
  }),
  active: (theme: Theme) =>
    css({
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    }),
  slider: (value: number) => ({
    marginTop: 6,
    marginLeft: value < 4 ? 10 : "initial",
    marginRight: value > 96 ? 10 : "initial"
  })
};

type Props = {
  onChange: (value: EntityDriver[]) => void;
  value: EntityDriver[];
  options: EntityDriver[];
};
const ProblematicDriverSelect = ({
  options = [],
  onChange,
  value = []
}: Props) => {
  const [isSliderFocus, setIsSliderFocus] = useState<boolean>(false);

  const theme = useTheme();

  const handleChangeImpact = (
    selectedDriver: EntityDriver,
    impact: number | number[]
  ) => {
    // change impact of current selected driver
    const newValues = value.map(
      (currentValue: EntityDriver): EntityDriver => {
        if (currentValue.driver.objectId === selectedDriver.driver.objectId) {
          return { ...currentValue, impact: impact as number };
        }
        return currentValue;
      }
    );

    onChange(newValues);
  };

  const handleSelect = (
    selectedDriver: EntityDriver,
    updatedDriver?: EntityDriver
  ) => {
    // not update the list there is already the current selectedDriver is already in the list
    if (updatedDriver) {
      if (!isSliderFocus) {
        // if already selected, remove it from the selected list
        const newValues = value.filter(
          (currentValue: EntityDriver) =>
            currentValue.driver.objectId !== updatedDriver.driver.objectId
        );
        onChange(newValues);
        return;
      }

      setIsSliderFocus(false);
      return;
    }

    onChange([selectedDriver, ...value]);
  };

  return (
    <div className="flexColumn stretchSel">
      <Stack spacing={2} className="flexColumn stretchSelf">
        {options.map((driver: EntityDriver, index: number) => {
          // current selected driver
          const updatedDriver = value.find(
            (currentValue: EntityDriver) =>
              currentValue.driver.objectId === driver.driver.objectId
          );

          const entityDriverOption = getEntityDriverOption(
            updatedDriver?.impact || (0 as number),
            theme
          );

          return (
            <Card
              key={driver.driver.objectId + index}
              title={driver.driver.name}
              left={driver.driver.icon}
              description={driver.driver.description}
              rootClassName={
                (driver.driver.description || !!updatedDriver) && classes.root
              }
              css={
                (driver.driver.description || !!updatedDriver) &&
                classes.card(!!updatedDriver)
              }
              onClick={() => handleSelect(driver, updatedDriver)}
              isActive={!!updatedDriver}
              activeClassName={classes.active(theme)}
            >
              {/* display the slider only if the current tab is selected */}
              {!!updatedDriver && (
                <div css={classes.slider(updatedDriver.impact)}>
                  <Slider
                    thumbIcon={`/icons/driver/${entityDriverOption.icon}.svg`}
                    value={updatedDriver.impact}
                    onChange={(value: number) => {
                      handleChangeImpact(driver, value);
                      setIsSliderFocus(true);
                    }}
                    withLabel={false}
                    sliderColor={entityDriverOption.color}
                  />
                </div>
              )}
            </Card>
          );
        })}
      </Stack>
    </div>
  );
};

export default ProblematicDriverSelect;
