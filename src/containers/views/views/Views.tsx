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
import Tabs from "../../../components/Tabs";
import Card from "../../../components/Card";

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

const tabs = [
  {
    label: "❤️",
    value: "favorites"
  },
  {
    label: "All views",
    value: "all"
  },
];

type ITab = 'favorites' | 'all';

const Views = () => {
  const [isCreateView, setIsCreateView] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<IView | null>(null);
  const [tab, setTab] = useState<ITab>('favorites');

  const handleSelectView = (view: IView | null) => setSelectedView(view);
  const toggleCreateView = () => setIsCreateView(!isCreateView);

  if (isCreateView) {
    return <View />;
  }

  if (selectedView) {
    return <View view={selectedView} />;
  }

  const handleTabChange = (tab: ITab) => {
    setTab(tab);
  }

  return (
    <div className="flexColumn stretchSelf flex1">
      <HomeTabsTitle title="Views" />
      <Tabs
        options={tabs}
        onTabChange={handleTabChange}
        tab={tab}
        noBackgroundColor
      />
      <Stack className="stretchSelf" spacing={3.4}>
        <Stack spacing={1}>
          {favoriteViews.map((view: IView, index: number) => (
            <Card
              key={view.name + index}
              title={view.name}
              onClick={() => handleSelectView(view)}
              withArrow
            />
          ))}
        </Stack>
      </Stack>
      <AddIcon onClick={toggleCreateView} />
    </div>
  );
};

export default Views;
