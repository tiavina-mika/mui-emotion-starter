/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { useState } from "react";
import { Typography } from "@mui/material";
import { css } from "@emotion/css";

import PageLayout from "../../components/layouts/PageLayout";
import { IProduct } from "../../types/product.type";
import { ISelectOption } from "../../types/app.type";
import Tabs from "../../components/Tabs";
import MainTab from "./preview/tabs/MainTab";
import ProductOkrTab from "./preview/tabs/ProductOkrTab";
import ProductDriversTab from "./preview/tabs/ProductDriversTab";

type ITabOptionValue = "main" | "okr" | "teams" | "members" | "drivers";
type ITabOption = ISelectOption<ITabOptionValue>;

const tabOptions: ITabOption[] = [
  {
    label: "Main",
    value: "main"
  },
  {
    label: "Okr",
    value: "okr"
  },
  {
    label: "Drivers",
    value: "drivers"
  },
  {
    label: "Teams",
    value: "teams"
  },
  {
    label: "Members",
    value: "members"
  }
];
type Props = {
  product: IProduct | null;
  onBack: () => void;
  goToEdition: (product: IProduct) => void;
};
const Product = ({ product, onBack, goToEdition }: Props) => {
  const [tab, setTab] = useState<ITabOptionValue>("main");

  if (!product) {
    return <Typography>No product found</Typography>;
  }

  const handleEdit = () => goToEdition(product);

  const handleTabChange = (selectedTab: ITabOptionValue) => setTab(selectedTab);

  return (
    <PageLayout
      subtitle="Product details"
      title={product.icon + " " + product.name}
      onBack={onBack}
      onEdit={handleEdit}
    >
      {/* tabs */}
      <div css={{ marginTop: 12 }}>
        <Tabs
          options={tabOptions}
          onTabChange={handleTabChange}
          tab={tab}
          tabsClassName={css({ backgroundColor: "#fff !important" })}
        />
      </div>
      {/* tab contents */}
      <div css={{ marginTop: 12 }}>
        {tab === "main" && <MainTab description={product.description} />}
        {tab === "okr" && <ProductOkrTab okr={product.okr} />}
        {tab === "drivers" && (
          <ProductDriversTab
            productId={product.objectId}
            drivers={product.drivers}
            // onRemoveOkr={handleRemoveOkr}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Product;
