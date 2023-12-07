/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";
import SectionTitle from "./SectionTitle";

type Props = {
  title: string;
  onEdit?: () => void;
  children: ReactNode;
  className?: string;
  rootClassName?: string;
};
const EditableSection = ({
  title,
  onEdit,
  children,
  className,
  rootClassName
}: Props) => {
  return (
    <div className={cx("flexColumn", rootClassName)}>
      <div className="flexRow stretchSelf center spaceBetween">
        <SectionTitle title={title} />
        {onEdit && (
          <IconButton onClick={onEdit}>
            <img alt="edit" src="/icons/edit-write.svg" />
          </IconButton>
        )}
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default EditableSection;
