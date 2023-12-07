import { Alert as MUIAlert, AlertProps } from "@mui/material";

type Props = {
  message?: string;
  color?: "error" | "info" | "success" | "warning" | string;
} & AlertProps;
const Alert = ({
  variant = "filled",
  severity = "success",
  message,
  color,
  ...alertProps
}: Props) => {
  return (
    <MUIAlert
      {...alertProps}
      variant={variant}
      severity={severity}
      color={color}
      iconMapping={{
        ...(variant !== "filled" && {
          info: <img alt="" src="/icons/filled-info.svg" />
        })
      }}
    >
      {severity === "success" &&
        !message &&
        "Modification bien prise en compte."}
      {/* eslint-disable-next-line prettier/prettier */}
      {severity === "error" && !message && "Une erreur s'est produite."}
      {message}
    </MUIAlert>
  );
};

export default Alert;
