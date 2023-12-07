/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material";

import { IProductsEntityFormInput } from "../../../../types/entity.type";
import { productsEntitySchema } from "../../../../validations/entity.validation";
import Form from "../../../../components/form/Form";
import CardCheckboxField from "../../../../components/form/fields/CardCheckboxField";

import { formatProductOptions } from "../../../../utils/product.utils";
import { products } from "../../../../utils/data/product";

type Props = {
  onSave: (values: IProductsEntityFormInput) => void;
  initialValues: IProductsEntityFormInput;
};
const EntityProductsForm = ({ onSave, initialValues }: Props) => {
  const theme = useTheme();
  const form = useForm<IProductsEntityFormInput>({
    resolver: zodResolver(productsEntitySchema)
  });
  const productOptions = formatProductOptions(products);

  // set initial values
  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IProductsEntityFormInput) => {
    onSave(values);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText="Save"
      buttonFullWidth
    >
      <CardCheckboxField
        options={productOptions}
        name="products"
        withLeftDivider={false}
        selectedTextClassName={css({
          color: theme.palette.primary.main + " !important"
        })}
      />
    </Form>
  );
};

export default EntityProductsForm;
