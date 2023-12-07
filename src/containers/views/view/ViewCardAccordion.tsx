/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

import Card from "../../../components/Card";
import EntityWorkflow from "../../entity/entityItems/EntityWorkflow";
import EntityOkrs from "../../entity/entityItems/EntityOkrs";
import EntityProducts from "../../entity/entityItems/EntityProducts";
import EntityTeamsMembers from "../../entity/entityItems/EntityTeamsMembers";

import { IEntity } from "../../../types/entity.type";
import PriorisationChip from "./fields/PriorisationChip";
import { getAllMembers } from "../../../utils/user.utils";

const classes = {
  card: css({
    minHeight: "initial",
    paddingTop: 9.5,
    paddingBottom: 9.5
    // height: 42
  })
};

type Props = {
  entity: IEntity;
};
const ViewCardAccordion = ({ entity }: Props) => {
  return (
    <Card rootClassName={classes.card}>
      {/* top */}
      <Stack spacing={0.81}>
        <Stack direction="row" spacing={1}>
          <div>
            <PriorisationChip value={entity.priorisation || 0} />
          </div>
          <div className="flexRow center flex1">
            <Typography variant="h5" sx={{ lineHeight: 1.5 }}>
              {entity.title}
            </Typography>
          </div>
        </Stack>

        {/* body (collapasible) */}
        <Stack spacing={1}>
          {/* workflow */}
          {entity.workflow && <EntityWorkflow workflow={entity.workflow} />}
          {/* okrs */}
          {entity.okrs && <EntityOkrs okrs={entity.okrs} />}
          {/* product */}
          {entity.products && <EntityProducts products={entity.products} />}
          {/* teams and members */}
          {(entity.teams ||
            entity.leader ||
            entity.owner ||
            entity.followers) && (
            <EntityTeamsMembers
              teams={entity.teams || []}
              members={getAllMembers(entity)}
            />
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ViewCardAccordion;
