/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Theme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import { css } from "@emotion/css";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  capitalizeFirstThreeCharacters,
  capitalizeLongAbbreviation,
  fullNameAbbreviation
} from "../../utils/utils";
import { productSchema } from "../../validations/product.validation";
import TextField from "../../components/form/fields/TextField";
import WithEmojiTextField from "../../components/form/fields/WithEmojiTextField";
import Form from "../../components/form/Form";

import { IProduct, IProductInput } from "../../types/product.type";
import Section from "../../components/Section";
import TextareaField from "../../components/form/fields/TextareaField";
import Card from "../../components/Card";

const classes = {
  proposalText: (theme: Theme) => ({
    color: theme.palette.primary.main,
    fontWeight: 400
  }),
  proposalItem: css({
    padding: "0 2px",
    minHeight: 32,
    borderRadius: 100,
    cursor: "pointer"
  })
};

type IShortNameProposals = {
  first: string;
  second: string;
  third: string;
};
type Props = {
  onSave: (values: IProduct) => void;
  product?: IProduct;
};

const ProductForm = ({ onSave, product }: Props) => {
  const [shortNameProposals, setShortNameProposals] = useState<
    IShortNameProposals
  >({
    first: "",
    second: "",
    third: ""
  });

  const form = useForm<IProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      icon: "😊",
      description: ""
    }
  });

  const onChangeName = useCallback((value: string | number) => {
    setShortNameProposals(
      (prev: IShortNameProposals): IShortNameProposals => ({
        ...prev,
        first: capitalizeFirstThreeCharacters(value as string),
        second: fullNameAbbreviation(value as string),
        third: capitalizeLongAbbreviation(value as string)
      })
    );
  }, []);

  // initialize form in edition
  useEffect(() => {
    if (!product) return;
    form.reset({
      name: product.name,
      shortName: product.shortName,
      icon: product.icon,
      description: product.description
    });

    onChangeName(product.name);
  }, [form, product, onChangeName]);

  const { handleSubmit, setValue, getValues } = form;

  // update shortName field proposal depending of the proposals
  const handleProposalsClick = (value: string) => {
    setValue("shortName", value, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmitHandler: SubmitHandler<IProductInput> = (values) => {
    const newValues: Record<string, string> = { ...values };

    if (!product) {
      newValues.objectId = uuidv4();
    }

    // simlulate data to save to the db
    console.log("values: ", values);
    onSave(newValues as any);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText={product ? "Save changes" : "Create Product"}
      withSpacing
      buttonFullWidth
    >
      <Stack spacing={3.1}>
        {/* informations */}
        <Section title="Product informations">
          <WithEmojiTextField
            label="Product name"
            placeholder="Product name"
            name="name"
            onFieldChange={onChangeName}
          />
          <TextareaField
            label="Product details"
            placeholder="Product description"
            name="description"
            rows={1}
            shrinkLabel
          />
        </Section>

        {/* proposals */}
        {getValues("name") && (
          <Section title="Product short name" spacing={0.2}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                {/* label */}
                {shortNameProposals.first && (
                  <div className="flexRow gapTen">
                    <img src="/icons/proposal.svg" alt="proposal" />
                    <Typography variant="h5" css={classes.proposalText}>
                      We suggest you these short names
                    </Typography>
                  </div>
                )}
                <div className="flexRow gapSixteen">
                  {Object.keys(shortNameProposals).map(
                    (key: string, index: number) =>
                      (shortNameProposals as any)[key] && (
                        <Card
                          key={key + index}
                          rootClassName={classes.proposalItem}
                          onClick={() =>
                            handleProposalsClick(
                              (shortNameProposals as any)[key]
                            )
                          }
                        >
                          <Typography variant="h4">
                            {(shortNameProposals as any)[key]}
                          </Typography>
                        </Card>
                      )
                  )}
                </div>
              </Stack>

              {getValues("shortName") && (
                <div>
                  <TextField
                    label="Short name"
                    placeholder={getValues("shortName")}
                    name="shortName"
                    disabled
                    shrinkLabel
                  />
                </div>
              )}
            </Stack>
          </Section>
        )}
      </Stack>
    </Form>
  );
};

export default ProductForm;
