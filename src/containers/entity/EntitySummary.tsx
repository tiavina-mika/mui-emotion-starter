/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { css } from "@emotion/css";

import Dialog from "../../components/Dialog";
import {
  getTotalDriversImpact,
  getEntityTypeLabel
} from "../../utils/entity.utils";
import EntitySummaryItem from "./EntitySummaryItem";
import { Button, Stack, Typography } from "@mui/material";
import UserAvatar from "../../components/UserAvatar";
import Chip from "../../components/chip/Chip";

import { getRandomPalette } from "../../utils/theme";
import { IEntity, IEntityType } from "../../types/entity.type";
import { entities } from "../../utils/data/entity";
import EntityOkrs from "./entityItems/EntityOkrs";
import EntityWorkflow from "./entityItems/EntityWorkflow";
import EntityPriorisation from "./entityItems/EntityPriorisation";
import EntityProducts from "./entityItems/EntityProducts";
import EntityDrivers from "./entityItems/EntityDrivers";

const entity: IEntity = entities[0];

const classes = {
  buttonContainer: {
    paddingTop: 24,
    bottom: 0,
    left: "100%"
  },
  dialogContent: css({
    marginTop: 52,
    marginBottom: 2
  }),

  dialog: {
    paddingTop: 3
  },
  leaderAvatar: (theme: Theme) => ({
    color: theme.palette.info.main,
    backgroundColor: theme.palette.info.light
  }),
  followersAvatar: (max: number) => {
    const color = getRandomPalette(max);
    return {
      color: color.main,
      backgroundColor: color.light
    };
  },
  driversImpactContainer: (theme: Theme) => ({
    border: "1px solid " + theme.palette.error.main,
    width: 40,
    height: 40,
    borderRadius: "100%"
  }),
  driversImpact: {
    color: "#000",
    lineHeight: 1,
    fontWeight: 400
  }
};

type Props = {
  type: IEntityType;
  open: boolean;
  onClose: () => void;
};
const EntitySummary = ({ open, onClose, type = "problematic" }: Props) => {
  const handleFinalValidate = () => {
    console.log("handleFinalValidate");
  };

  if (!entity) {
    return <Typography>No entity found</Typography>;
  }

  return (
    <Dialog
      subtitle={getEntityTypeLabel(type)}
      title={entity.title}
      description={entity.description}
      open={open}
      onClose={onClose}
      withCloseButton
      contentClassName={classes.dialogContent}
      closeButtonPosition="start"
      css={classes.dialog}
      fullScreen
      actions={
        <Button variant="contained" fullWidth onClick={handleFinalValidate}>
          Créer la problématique
        </Button>
      }
    >
      <Stack spacing={2}>
        {/* priorisation */}
        {entity.priorisation && (
          <EntityPriorisation priorisation={entity.priorisation} />
        )}

        {/* workflow */}
        <EntityWorkflow workflow={entity.workflow} />

        {/* okrs */}
        <EntityOkrs okrs={entity.okrs} />

        {/* effort */}
        <EntitySummaryItem label="Effort">
          <Chip
            // TODO: the smiley should be different depending of the value?
            label={entity.effort + " 😎"}
            variant="outlined"
          />
        </EntitySummaryItem>

        {/* product */}
        <EntityProducts products={entity.products} />

        {/* drivers */}
        <EntityDrivers drivers={entity.drivers} />

        {/* impact drivers */}
        <EntitySummaryItem label="Impact drivers">
          <div css={classes.driversImpactContainer} className="flexCenter">
            <Typography variant="h4" css={classes.driversImpact}>
              {/* TODO: is it a sum? */}x
              {getTotalDriversImpact(entity.drivers || [])}
            </Typography>
          </div>
        </EntitySummaryItem>

        {/* responsible */}
        <EntitySummaryItem label="Responsable">
          {entity.leader && (
            <UserAvatar
              user={entity.leader}
              size={40}
              css={classes.leaderAvatar}
            />
          )}
        </EntitySummaryItem>

        {/* Assigné */}
        <EntitySummaryItem label="Assigné.s">
          {entity.followers?.map((follower, index) => (
            <UserAvatar
              key={follower.objectId + index}
              user={follower}
              size={40}
              css={classes.followersAvatar(entity.followers.length)}
            />
          ))}
        </EntitySummaryItem>

        {/* creation */}
        {entity.owner && (
          <EntitySummaryItem label="Créateur">
            <UserAvatar
              user={entity.owner}
              size={40}
              css={classes.leaderAvatar}
            />
          </EntitySummaryItem>
        )}

        {/* createdAt */}
        <EntitySummaryItem label="Date de création">
          <Chip label={entity.createdAt as string} variant="outlined" />
        </EntitySummaryItem>

        {/* startDate */}
        <EntitySummaryItem label="Lancement">
          <Chip
            label={entity.startDate}
            variant="semifilled"
            color="success"
            labelColor="default"
          />
        </EntitySummaryItem>

        {/* endDate */}
        <EntitySummaryItem label="Date limite">
          <Chip
            label={entity.endDate}
            variant="semifilled"
            color="error"
            labelColor="default"
          />
        </EntitySummaryItem>
      </Stack>
    </Dialog>
  );
};

export default EntitySummary;
