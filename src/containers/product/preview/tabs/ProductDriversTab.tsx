import { Stack, Typography } from "@mui/material";

import { IDriver } from "../../../../types/driver.type";
import { useResponsive } from "../../../../hooks/useResponsive";
import Card from "../../../../components/Card";
import Loading from "../../../../components/Loading";
import AddIcon from "../../../../components/AddIcon";

type Props = {
  productId: string;
  drivers: IDriver[] | undefined;
  // onRemoveOkr: (id: string) => void;
  loading?: boolean;
};
const ProductDriversTab = ({ productId, drivers, loading }: Props) => {
  const { isMobile } = useResponsive();

  const handleAddClick = () => console.log("click", productId);
  const handleRemoveDriver = (id: string) => console.log("remove drivers", id);

  return (
    <div className="flex1 stretchSelf">
      {drivers?.length ? (
        <Stack spacing={2}>
          {drivers.map((driver: IDriver, index: number) => (
            <Card
              key={driver.objectId + index}
              left={driver.icon}
              isActive
              withLeftDivider
              description={driver.description}
              title={driver.name}
              withRightDivider
              right={
                loading ? (
                  <Loading size={14} />
                ) : (
                  <img alt="minus" src="/icons/minus.svg" />
                )
              }
              onClickRight={() => handleRemoveDriver(driver.objectId)}
            />
          ))}
        </Stack>
      ) : (
        <Typography>This product has no drivers</Typography>
      )}
      {isMobile && <AddIcon onClick={handleAddClick} />}
    </div>
  );
};

export default ProductDriversTab;
