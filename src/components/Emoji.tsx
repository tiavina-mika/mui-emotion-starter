/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { cx } from "@emotion/css";

type Props = {
  emoji: string;
  className?: string;
};
const Emoji = ({ emoji, className }: Props) => {
  return (
    <span aria-label="okr" role="img" className={cx('lh1', className)}>
      {emoji}
    </span>
  );
};

export default Emoji;
