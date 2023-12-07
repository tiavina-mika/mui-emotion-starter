/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";
import ChipIcon from "../../../components/chip/ChipIcon";

import { EntityDriver } from "../../../types/entity.type";


type Props = {
  drivers: EntityDriver[];
};
const EntityDrivers = ({ drivers }: Props) => {
  return (
    <EntitySummaryItem label="Drivers">
      {drivers?.map((driver: EntityDriver, index: number) => (
        <Chip
          key={driver.driver.objectId + index}
          label={driver.driver.name}
          icon={<ChipIcon smiley={driver.driver.icon} />}
          variant="outlined"
        />
      ))}
    </EntitySummaryItem>
  );
};

export default EntityDrivers;
