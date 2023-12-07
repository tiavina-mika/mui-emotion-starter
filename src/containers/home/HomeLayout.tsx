/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { IAlert, IHomeTab, ISettingsTab } from "../../types/app.type";
import { ITeam } from "../../types/team.type";
import { HOME_BOTTOM_TABS_HEIGHT, HOME_TABS } from "../../utils/constants";
import SettingsLayout from "./navigations/SettingsLayout";
import CurrentWorkspaceLayout from "./navigations/CurrentWorkspaceLayout";
import MyFocus from "../myFocus/MyFocus";
import Views from "../views/views/Views";
import { IDriver } from "../../types/driver.type";
import { IOkr } from "../../types/okr.type";
import { IProduct } from "../../types/product.type";

const classes = {
  tabs: {
    boxShadow: "0px -4px 8px rgba(31, 31, 31, 0.05)",
    height: HOME_BOTTOM_TABS_HEIGHT,
    backgroundColor: "#fff",
    paddingLeft: 40,
    paddingRight: 40,
    bottom: 0
  },
  tabsContent: (theme: Theme) => ({
    [theme.breakpoints.up("sm")]: {
      width: 400
    },
    [theme.breakpoints.down("sm")]: {
      flex: 1
    }
  }),
  label: (theme: Theme) => ({
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 1,
    color: theme.palette.grey[600],
    marginTop: 2
  }),
  active: (theme: Theme) => ({
    color: theme.palette.primary.main
  })
};

interface IOption {
  label: any;
  icon: ReactNode | string;
  value: IHomeTab;
}

const options: IOption[] = [
  {
    label: "Vues",
    icon: "views",
    value: "views"
  },
  {
    label: "Mon focus",
    icon: "my-focus",
    value: "myFocus"
  },
  {
    label: "Recherche",
    icon: "search",
    value: "search"
  }
];

type Props = {
  onTabChange: (tab: IHomeTab) => void;
  onSettingTabChange: (tab: ISettingsTab) => void;
  goToTeamCreation: () => void;
  goToDriverCreation: () => void;
  goToOkrCreation: () => void;
  teams: ITeam[];
  okrs: IOkr[];
  drivers: IDriver[];
  tab: IHomeTab;
  settingTab: ISettingsTab;
  onSelectDriver: (driver: IDriver) => void;
  onSelectOkr: (driver: IOkr) => void;
  alert?: IAlert;
  goToMyAccount?: () => void;
  goToProductCreation: () => void;
  products: IProduct[];
  onSelectProduct: (product: IProduct) => void;
};
const HomeLayout = ({
  tab,
  settingTab,
  onTabChange,
  goToTeamCreation,
  goToDriverCreation,
  onSettingTabChange,
  teams,
  drivers,
  onSelectDriver,
  alert,
  goToOkrCreation,
  okrs,
  onSelectOkr,
  goToMyAccount,
  goToProductCreation,
  products,
  onSelectProduct
}: Props) => {
  const handleTabChange = (value: IHomeTab) => {
    onTabChange(value);
  };

  const renderSetting = (goBack: () => void): ReactNode => (
    <SettingsLayout
      drivers={drivers}
      teams={teams}
      okrs={okrs}
      goToTeamCreation={goToTeamCreation}
      goToDriverCreation={goToDriverCreation}
      goToOkrCreation={goToOkrCreation}
      onTabChange={onSettingTabChange}
      tab={settingTab}
      onSelectDriver={onSelectDriver}
      onSelectOkr={onSelectOkr}
      alert={alert}
      goToMyAccount={goToMyAccount}
      onBack={goBack}
      goToProductCreation={goToProductCreation}
      products={products}
      onSelectProduct={onSelectProduct}
    />
  );

  return (
    <Box sx={{ minHeight: "100vh " }} className="flexColumn spaceBetween">
      {/* ------ content ------ */}
      <div className="flexColumn flex1 stretchSelf">
        {/* ------ tabs ------ */}
        {tab === HOME_TABS.MY_FOCUS && (
          <CurrentWorkspaceLayout renderSetting={renderSetting}>
            {/* simulate React Router outlet component */}
            <MyFocus />
          </CurrentWorkspaceLayout>
        )}
        {tab === HOME_TABS.VIEWS && (
          <CurrentWorkspaceLayout renderSetting={renderSetting}>
            {/* simulate React Router outlet component */}
            <Views />
          </CurrentWorkspaceLayout>
        )}
      </div>

      {/* ------ tabs ------ */}
      <div
        css={classes.tabs}
        className="positionSticky flexRow center justifyCenter stretchSelf"
      >
        <div className="flexRow spaceBetween" css={classes.tabsContent}>
          {options.map((option: IOption, index: number) => (
            <button
              className="transparentButton"
              onClick={() => handleTabChange(option.value)}
              key={option.label + index}
            >
              <div key={option.label + index}>
                <img
                  alt={option.label}
                  src={`/icons/${option.icon}${
                    tab === option.value ? "-active" : ""
                  }.svg`}
                />
              </div>
              <Typography
                css={[
                  classes.label,
                  tab === option.value ? classes.active : null
                ]}
              >
                {option.label}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default HomeLayout;
