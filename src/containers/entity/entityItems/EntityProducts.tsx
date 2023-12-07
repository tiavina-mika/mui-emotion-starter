/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import EntitySummaryItem from "../EntitySummaryItem";

import Chip from "../../../components/chip/Chip";
import ChipIcon from "../../../components/chip/ChipIcon";

import { IProduct } from "../../../types/product.type";

type Props = {
  products: IProduct[];
};
const EntityProducts = ({ products = [] }: Props) => {
  return (
    <EntitySummaryItem label="Produit">
      {products?.map((product: IProduct, index: number) => (
        <Chip
          key={product.objectId + index}
          label={product.name}
          icon={<ChipIcon smiley={product.icon} />}
          variant="outlined"
        />
      ))}
    </EntitySummaryItem>
  )
};

export default EntityProducts;
