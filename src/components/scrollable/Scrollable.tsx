/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { jsx } from "@emotion/react";
import { MutableRefObject, ReactNode, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { IDirection } from "../../types/app.type";
import { getScrollClassName } from "../../utils/app.utils";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: IDirection;
};

const Scrollable = ({
  children,
  className,
  direction = "horizontal"
}: Props) => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLInputElement
  >;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true
  });

  return (
    <div
      {...events}
      className={cx(
        className,
        getScrollClassName(direction),
        "hideScrollbar flex1 flexColumn"
      )}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default Scrollable;
