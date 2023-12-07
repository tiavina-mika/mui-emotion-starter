/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Stack } from "@mui/material";
import { useState } from "react";

import AddIcon from "../../../components/AddIcon";
import { IView } from "../../../types/view.type";
import HomeTabsTitle from "../../home/navigations/HomeTabsTitle";
import View from "../view/View";
import ViewsSection from "./ViewsSection";

const favoriteViews = [
  {
    objectId: "v01",
    slug: "backlog-marketing",
    name: "Backlog Marketing",
    favorite: true
  },
  {
    objectId: "v02",
    slug: "roadmap-data",
    name: "Roadmap Data",
    favorite: true
  },
  {
    objectId: "v03",
    slug: "roadmap-produit",
    name: "Roadmap Produit",
    favorite: true
  }
];

const otherViews = [
  {
    objectId: "v04",
    slug: "backlog-marketing",
    name: "Backlog Marketing"
  },
  {
    objectId: "v05",
    slug: "roadmap-data",
    name: "Roadmap Data"
  },
  {
    objectId: "v06",
    slug: "roadmap-produit",
    name: "Roadmap Produit"
  }
];

const Views = () => {
  const [isCreateView, setIsCreateView] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<IView | null>(null);

  const handleSelectView = (view: IView | null) => setSelectedView(view);
  const toggleCreateView = () => setIsCreateView(!isCreateView);

  if (isCreateView) {
    return <View />;
  }

  if (selectedView) {
    return <View view={selectedView} />;
  }

  return (
    <div className="flexColumn stretchSelf flex1">
      <Stack spacing={3.4}>
        <HomeTabsTitle title="Toutes les vues" />
        <Stack spacing={3.8}>
          <ViewsSection
            selectedView={selectedView}
            onSelectView={handleSelectView}
            views={favoriteViews}
            title="Vues favorites"
          />
          <ViewsSection
            selectedView={selectedView}
            onSelectView={handleSelectView}
            views={otherViews}
            title="Autres vues"
          />
        </Stack>
      </Stack>
      <AddIcon onClick={toggleCreateView} />
    </div>
  );
};

export default Views;
