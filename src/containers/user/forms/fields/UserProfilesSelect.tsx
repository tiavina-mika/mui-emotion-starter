/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack } from "@mui/material";
import { ISelectOption } from "../../../../types/app.type";
import Card from "../../../../components/Card";

export type Props = {
  value: string[];
  options: ISelectOption[];
  onChange: (ids: string[]) => void;
};

const UserProfilesSelect = ({ onChange, options, value = [] }: Props) => {
  const handleSelectOption = (id: string) => {
    const newValues = [...value, id];
    onChange(newValues);
  };

  return (
    <Stack spacing={1.9}>
      {options.map((option: ISelectOption, index: number) => (
        <Card
          key={option.value + index}
          left={option.icon}
          title={option.label}
          onClick={() => handleSelectOption(option.value)}
          isActive={value.includes(option.value)}
          withLeftDivider={false}
        />
      ))}
    </Stack>
  );
};

export default UserProfilesSelect;
