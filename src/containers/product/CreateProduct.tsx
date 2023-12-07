/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import PageLayout from "../../components/layouts/PageLayout";
import ProductForm from "./ProductForm";

import { IProduct } from "../../types/product.type";

type Props = {
  onSave: (values: IProduct) => void;
  onBack: () => void;
};

const CreateProduct = ({ onSave, onBack }: Props) => {
  return (
    <PageLayout
      subtitle="Create product"
      title="My new product"
      onBack={onBack}
      // withHeaderDivider
    >
      <ProductForm onSave={onSave} />
    </PageLayout>
  );
};

export default CreateProduct;
