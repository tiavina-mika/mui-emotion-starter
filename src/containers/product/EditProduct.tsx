/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import PageLayout from "../../components/layouts/PageLayout";
import ProductForm from "./ProductForm";

import { IProduct } from "../../types/product.type";
import { Typography } from "@mui/material";

type Props = {
  onSave: (values: IProduct) => void;
  onBack: () => void;
  product: IProduct | null;
  onDelete: (id: string) => void;
};

const EditProduct = ({ onSave, onBack, product, onDelete }: Props) => {
  if (!product) {
    return <Typography>No product found</Typography>;
  }

  const handleDelete = () => onDelete(product.objectId);

  return (
    <PageLayout
      subtitle="Modify product"
      title={product.name}
      onBack={onBack}
      onDelete={handleDelete}
      shouldConfirmDeletion
    >
      <ProductForm onSave={onSave} product={product} />
    </PageLayout>
  );
};

export default EditProduct;
