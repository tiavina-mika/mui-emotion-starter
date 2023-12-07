/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import Card from "../../../../components/Card";
import Emoji from "../../../../components/Emoji";
import EditableSection from "../../../../components/sections/EditableSection";
import { ITeam } from "../../../../types/team.type";
import { IUser } from "../../../../types/user.type";
import { getUserFullName } from "../../../../utils/user.utils";

type Props = {
  teams: ITeam[];
  members: IUser[];
};
const EntityMembersTab = ({ teams, members }: Props) => {
  const handleEditTeams = () => console.log("edit teams");
  const handleEditMembers = () => console.log("edit members");

  return (
    <Stack spacing={2}>
      {/* teams */}
      <EditableSection
        onEdit={handleEditTeams}
        title="Teams"
        className="gapEight stretchSelf flexColumn"
      >
        {teams?.length ? (
          teams.map((team: ITeam, index: number) => (
            <div key={team.objectId + index} className="stretchSelf">
              <Card left={<Emoji emoji={team.icon} />} title={team.name} />
            </div>
          ))
        ) : (
          <Typography className="grey800 fs14 textCenter">
            No teams yet
          </Typography>
        )}
      </EditableSection>

      {/* teams */}
      <EditableSection
        onEdit={handleEditMembers}
        title="Members"
        className="gapEight stretchSelf flexColumn"
      >
        {members?.length ? (
          members.map((member: IUser, index: number) => (
            <div key={member.objectId + index} className="stretchSelf">
              <Card
                // TODO: dynamize this
                right={<Typography>Product</Typography>}
                left={<Emoji emoji="👩🏻‍🤝‍👨🏽" />}
                title={getUserFullName(member)}
                withRightDivider={false}
              />
            </div>
          ))
        ) : (
          <Typography className="grey800 fs14 textCenter">
            No members yet
          </Typography>
        )}
      </EditableSection>
    </Stack>
  );
};

export default EntityMembersTab;
