/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack, Link, Typography } from "@mui/material";
import { useState } from "react";

import { IView } from "../../../types/view.type";
import View from "../view/View";

type Props = {
  views: IView[];
  title: string;
  onSelectView: (view: IView) => void;
  selectedView: IView | null;
};

const ViewsSection = ({ views, title, onSelectView }: Props) => {
  // simulate route change
  // const [selectedView, setSelectedView] = useState<IView | null>(null);

  const handleSelectView = (view: IView) => onSelectView(view);

  // if (selectedView) {
  //   return (
  //     <View view={selectedView} />
  //   )
  // }

  return (
    <Stack spacing={1.8}>
      {/* section title */}
      <Typography variant="h4" className="lh1 textUpperCase grey600">
        {title}
      </Typography>
      {/* list */}
      <Stack spacing={1.6}>
        {views.map((view: IView, index: number) => (
          <Link
            css={{ textDecoration: "none" }}
            key={view.objectId + index}
            // similute href redirection
            onClick={() => handleSelectView(view)}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {view.favorite && <img alt="favorite" src="/icons/love.svg" />}
              <Typography className="grey800 lh1" css={{ fontSize: 14 }}>
                {view.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default ViewsSection;
