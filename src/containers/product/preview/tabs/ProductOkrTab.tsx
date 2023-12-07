/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

import Card from "../../../../components/Card";
import AddIcon from "../../../../components/AddIcon";
import { IOkr } from "../../../../types/okr.type";
import { useResponsive } from "../../../../hooks/useResponsive";

type Props = {
  okr: IOkr | undefined;
};
const ProductOkrTab = ({ okr }: Props) => {
  const { isMobile } = useResponsive();

  const handleAddClick = () => console.log("go to okr");
  const handleRemoveOkr = () => console.log("handleRemoveOkr");

  return (
    <div className="flex1 stretchSelf">
      {okr ? (
        <Card
          left={okr.icon}
          isActive
          withLeftDivider
          withRightDivider
          right={<img alt="minus" src="/icons/minus.svg" />}
          onClickRight={handleRemoveOkr}
        >
          <Stack direction="row" spacing={0.6} className="stretchSelf">
            <Typography variant="h4">{okr.name}</Typography>
          </Stack>
        </Card>
      ) : (
        <Typography>No OKR</Typography>
      )}
      {isMobile && <AddIcon onClick={handleAddClick} />}
    </div>
  );
};

export default ProductOkrTab;
