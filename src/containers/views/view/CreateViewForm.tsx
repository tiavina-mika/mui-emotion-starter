/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { IView, IViewInput } from "../../../types/view.type";
import { viewSchema } from "../../../validations/view.validation";
import Form from "../../../components/form/Form";
import { slugify } from "../../../utils/utils";
import TextField from "../../../components/form/fields/TextField";

const classes = {
  textField: (theme: Theme) => ({
    "&.MuiFormControl-root": {
      [theme.breakpoints.up("md")]: {
        width: 250
      },
      [theme.breakpoints.down("md")]: {
        width: "60vw"
      }
    },
    "& .MuiOutlinedInput-root": {
      "& .MuiInputBase-input": {
        "&::placeholder": {
          fontFamily: "Product Sans Medium",
          color: theme.palette.grey[600],
          fontSize: 26,
          lineHeight: 1,
          fontWeight: 500,
          opacity: 1
        }
      },
      "& fieldset": {
        border: "none"
      },
      "&.Mui-focused fieldset": {
        border: "none"
      }
    }
  })
};
type Props = {
  onSave: (values: IView) => void;
};
const CreateViewForm = ({ onSave }: Props) => {
  const form = useForm<IViewInput>({
    resolver: zodResolver(viewSchema)
  });

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IViewInput) => {
    // simlulate data to save to the db
    const newValues = {
      objectId: uuidv4(),
      slug: slugify(values.name),
      ...values
    };

    onSave(newValues as IView);
  };

  return (
    <Form
      form={form}
      onSubmit={handleSubmit(onSubmitHandler)}
      primaryButtonText="Save"
      buttonSx={{ py: 0.15, px: 1 }}
      direction="row"
      className="center"
    >
      <TextField placeholder="Name" name="name" css={classes.textField} />
    </Form>
  );
};

export default CreateViewForm;
