/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import ScrollableList from "../../../../components/scrollable/ScrollableList";
import { IEntity } from "../../../../types/entity.type";
import { cutText } from "../../../../utils/utils";
import PriorisationChip from "../fields/PriorisationChip";
import EffortChip from "../fields/EffortChip";
import Chip from "../../../../components/chip/Chip";
import Emoji from "../../../../components/Emoji";
import { ITeam } from "../../../../types/team.type";
import { IOkr } from "../../../../types/okr.type";
import { IProduct } from "../../../../types/product.type";

const headers = [
  {
    label: "Résumé",
    value: "name"
  },
  {
    label: "Priorisation",
    value: "priorisation"
  },
  {
    label: "Objectif",
    value: "okrs"
  },
  {
    label: "Effort",
    value: "effort"
  },
  {
    label: "Équipe",
    value: "teams"
  },
  {
    label: "Ticket",
    value: "ticket"
  },
  {
    label: "Produit",
    value: "products"
  }
];

const border = "1px solid #dcdcdc";

const classes = {
  table: {
    borderCollapse: "separate" as const,
    overflow: "hidden",
    borderSpacing: 0
  },
  tableHead: {
    backgroundColor: "#f8f8f8",
    "& th": {
      borderTop: border,
      borderBottom: "none"
    },
    "& th:first-of-type": {
      borderRadius: "10px 0 0 0",
      borderLeft: border
    },
    "& th:last-child": {
      borderRadius: "0 10px 0 0",
      borderRight: border
    }
  },
  tableBody: {
    "& tr td": {
      borderBottom: border
    },
    "& tr td:first-of-type": {
      borderLeft: border
    },
    "& tr td:last-child": {
      borderRight: border
    }
  },
  tableHeadCell: {
    fontFamily: "Product Sans Bold",
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    paddingTop: 13,
    paddingBottom: 13
  },
  tableBodyCell: {
    paddingTop: 9,
    paddingBottom: 9
  }
};

const TABLE_WIDTH = 1130;

type Props = {
  entities: IEntity[];
};
const ListTab = ({ entities }: Props) => {
  return (
    <ScrollableList className="flex1" tableWidth={TABLE_WIDTH} type="table">
      <Table
        css={classes.table}
        aria-label="list table"
        sx={{ minWidth: TABLE_WIDTH }}
      >
        <TableHead css={classes.tableHead}>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={header.label + index} css={classes.tableHeadCell}>
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody css={classes.tableBody}>
          {entities.map((entity: IEntity, index: number) => (
            <TableRow key={entity.objectId + index}>
              {/* title */}
              <TableCell css={classes.tableBodyCell}>
                <Typography className="grey800" css={{ lineHeight: 1.5 }}>
                  {entity.title}
                </Typography>
              </TableCell>
              {/* priorisation */}
              <TableCell css={classes.tableBodyCell}>
                <PriorisationChip value={entity.priorisation || 0} />
              </TableCell>
              {/* okrs */}
              <TableCell sx={{ maxWidth: 274 }}>
                <Stack spacing={1.2} direction="row">
                  {entity.okrs?.map((okr: IOkr, okrIndex: number) => (
                    <Stack
                      spacing={0.9}
                      direction="row"
                      key={okr.objectId + okrIndex}
                    >
                      {/* emoji */}
                      <Emoji emoji={okr.icon} />
                      {/* name */}
                      <Typography className="grey800">
                        {cutText(okr.name, 36)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </TableCell>
              {/* effort */}
              <TableCell css={classes.tableBodyCell}>
                {entity.effort && <EffortChip effort={entity.effort} />}
              </TableCell>
              {/* team */}
              <TableCell css={classes.tableBodyCell}>
                <Stack spacing={1.4} direction="row">
                  {entity.teams?.map((team: ITeam, teamIndex: number) => (
                    <Chip
                      key={team.objectId + teamIndex}
                      icon={<Emoji emoji={team.icon} />}
                      label={team.name}
                      variant="outlined"
                      css={{ height: 26, paddingLeft: 3, paddingRigiht: 3 }}
                    />
                  ))}
                </Stack>
              </TableCell>
              {/* ticket */}
              <TableCell css={classes.tableBodyCell}>
                <Chip
                  label={entity.ticket}
                  variant="outlined"
                  className="grey600"
                  css={{ height: 20, paddingLeft: 5, paddingRigiht: 5 }}
                />
              </TableCell>
              {/* products */}
              <TableCell css={classes.tableBodyCell}>
                <Stack spacing={1.5} direction="row">
                  {entity.products?.map(
                    (product: IProduct, productIndex: number) => (
                      <Typography
                        className="grey800"
                        key={product.objectId + productIndex}
                      >
                        {product.name}
                      </Typography>
                    )
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollableList>
  );
};

export default ListTab;
