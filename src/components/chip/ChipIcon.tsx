/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import Emoji from "../Emoji";

type Props = {
  smiley?: string;
  image?: string;
};

const ChipIcon = ({ smiley, image }: Props) => {
  if (smiley) {
    return <Emoji emoji={smiley} />;
  }

  return <img alt="" src={image} />;
};

export default ChipIcon;
