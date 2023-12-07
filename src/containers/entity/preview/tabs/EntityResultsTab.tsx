/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/css";
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import Card from "../../../../components/Card";
import Emoji from "../../../../components/Emoji";
import { IEntityResult } from "../../../../types/entity.type";

type Props = {
  results: IEntityResult[];
};
const EntityResultsTab = ({ results }: Props) => {
  if (!results || results.length === 0) {
    return (
      <div css={{ marginTop: 42 }}>
        <Stack spacing={1.6} className="flexCenter">
          <img alt="" src="/icons/ghost.svg" />
          <Typography
            className="grey800 fs14 textCenter"
            css={{ lineHeight: 1.57 }}
          >
            It’s a bit empty here ! <br />
            Go to the setup tab to start <br />
            building great products.
          </Typography>
        </Stack>
      </div>
    );
  }

  return (
    <Stack spacing={2}>
      {results.map((result: IEntityResult, index: number) => (
        <div key={result.result + index}>
          <Card
            rootClassName={css({ minHeight: 42 })}
            contentClassName="gapEight flexRow justifyCenter center"
          >
            <Emoji emoji={result.icon} />
            <Typography className="grey800 fs14 lh1">
              {result.result}
            </Typography>
          </Card>
        </div>
      ))}
    </Stack>
  );
};

export default EntityResultsTab;
