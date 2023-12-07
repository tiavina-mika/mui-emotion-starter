/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { ISelectOption } from "../../../../types/app.type";
import Card from "../../../../components/Card";

export type Props = {
  value: string;
  options: ISelectOption[];
  onChange: (id: string) => void;
  className?: string;
  label?: string;
};

const UserProfileMemberRadio = ({
  onChange,
  options,
  value,
  label,
  className
}: Props) => {
  const handleSelectOption = (id: string) => {
    const newValues = id;
    onChange(newValues);
  };

  return (
    <div className={className}>
      <Stack spacing={1.3}>
        {label && <Typography>{label}</Typography>}
        <Stack spacing={1.9} direction="row">
          {options.map((option: ISelectOption, index: number) => (
            <Card
              rootClassName="flex1"
              titleClassName="textCenter"
              key={option.value + index}
              title={option.label}
              onClick={() => handleSelectOption(option.value)}
              isActive={value.includes(option.value)}
            />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default UserProfileMemberRadio;
