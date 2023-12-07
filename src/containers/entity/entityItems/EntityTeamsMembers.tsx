/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";
import ChipIcon from "../../../components/chip/ChipIcon";
import { ITeam } from "../../../types/team.type";
import { IUser } from "../../../types/user.type";
import UserAvatar from "../../../components/UserAvatar";
import { getRandomPalette } from "../../../utils/theme";

type Props = {
  teams: ITeam[];
  members: IUser[];
};
const EntityTeamsMembers = ({ teams = [], members = [] }: Props) => {
  return (
    <EntitySummaryItem label="Équipe/Membre">
      {teams.map((team: ITeam, index: number) => (
        <Chip
          key={team.objectId + index}
          label={team.name}
          icon={<ChipIcon smiley={team.icon} />}
          variant="outlined"
        />
      ))}
      {members.map((member: IUser, index: number) => {
        const palette = getRandomPalette(members.length);
        return (
          <UserAvatar
            key={member.objectId + index}
            user={member}
            css={{
              backgroundColor: palette.light,
              color: palette.main
            }}
          />
        )
      })}
    </EntitySummaryItem>
  );
};

export default EntityTeamsMembers;
