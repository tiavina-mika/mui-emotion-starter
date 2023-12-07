/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { IAlert, ISettingsTab } from "../../../types/app.type";
import { IDriver } from "../../../types/driver.type";
import { ITeam } from "../../../types/team.type";
import TeamsTab from "../../team/TeamsTab";
import Products from "../../product/Products";
import Drivers from "../../driver/Drivers";
import General from "../../general/General";
import Okrs from "../../okr/Okrs";
import Users from "../../user/Users";
import { LAYOUT_CONTENT_PADDING, SETTING_TABS } from "../../../utils/constants";
import { IOkr } from "../../../types/okr.type";
import { SyntheticEvent } from "react";
import TopIcon from "../../../components/layouts/TopIcon";
import { IProduct } from "../../../types/product.type";

const classes = {
  header: {
    height: `calc(104px - ${LAYOUT_CONTENT_PADDING * 2}px)`,
    padding: LAYOUT_CONTENT_PADDING
  },
  pageTitle: {
    fontWeight: 500,
    fontSize: 32,
    lineHeight: 1,
    color: "#000"
  },
  tabsContainer: (theme: Theme) => ({
    height: "calc(72px - 9px)",
    backgroundColor: "#fff",
    borderBottom: "1px solid " + theme.palette.grey[100]
  }),
  tabsContent: (theme: Theme) => ({
    marginLeft: LAYOUT_CONTENT_PADDING,
    marginRight: LAYOUT_CONTENT_PADDING,
    [theme.breakpoints.down("sm")]: {
      maxWidth: `calc(100vw - ${LAYOUT_CONTENT_PADDING * 2}px)`
    }
  }),
  tabs: {
    backgroundColor: "transparent !important"
  },
  label: (theme: Theme) => ({
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1,
    color: theme.palette.grey[600],
    textTransform: "initial"
  }),
  activeTab: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
    padding: 0,
    borderRadius: 100,
    color: "#fff !important"
  }),
  tab: (theme: Theme) => ({
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1,
    textTransform: "initial",
    color: theme.palette.grey[600]
  }),
  content: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: LAYOUT_CONTENT_PADDING,
    paddingRight: LAYOUT_CONTENT_PADDING
  }
};

interface IOption {
  label: any;
  value: ISettingsTab;
}

const options: IOption[] = [
  {
    label: "General",
    value: "general"
  },
  {
    label: "Produits",
    value: "products"
  },
  {
    label: "Drivers",
    value: "drivers"
  },
  {
    label: "Workflow",
    value: "workflow"
  },
  {
    label: "OKR",
    value: "okr"
  },
  {
    label: "Équipes",
    value: "teams"
  },
  {
    label: "Profils",
    value: "profiles"
  },
  {
    label: "Utilisateurs",
    value: "users"
  }
];

type Props = {
  goToTeamCreation: () => void;
  goToDriverCreation: () => void;
  onTabChange: (tab: ISettingsTab) => void;
  teams: ITeam[];
  drivers: IDriver[];
  okrs: IOkr[];
  tab: ISettingsTab;
  onSelectDriver: (driver: IDriver) => void;
  alert?: IAlert;
  goToOkrCreation: () => void;
  onSelectOkr: (driver: IOkr) => void;
  goToMyAccount?: () => void;
  onBack?: () => void;
  goToProductCreation: () => void;
  products: IProduct[];
  onSelectProduct: (product: IProduct) => void;
};
const SettingsLayout = ({
  goToDriverCreation,
  goToTeamCreation,
  teams,
  drivers,
  tab,
  onTabChange,
  onSelectDriver,
  alert,
  goToOkrCreation,
  okrs,
  onSelectOkr,
  goToMyAccount,
  onBack,
  goToProductCreation,
  products,
  onSelectProduct
}: Props) => {
  const handleTabChange = (_: SyntheticEvent, value: ISettingsTab) => {
    onTabChange(value);
  };

  return (
    <Box className="flexColumn spaceBetween flex1 stretchSelf">
      {/* --------- header ------- */}
      <Box css={classes.header} className="flexColumn stretchSelf">
        <Box className="stretchSelf" sx={{ mb: 1 }}>
          <IconButton onClick={onBack} sx={{ p: 0 }}>
            <TopIcon alignment="left" image="/icons/prev-arrow.svg" />
          </IconButton>
        </Box>
        <div className="flexRow spaceBetween flexEnd stretchSelf">
          <Typography variant="h3" css={classes.pageTitle}>
            Paramètres
          </Typography>
          <IconButton>
            <img alt="setting" src="/icons/app-setting.svg" />
          </IconButton>
        </div>
      </Box>

      {/* ------ tabs ------ */}
      {/* ------ tabs ------ */}
      <div css={classes.tabsContainer} className="stretchSelf">
        <div css={classes.tabsContent}>
          <Tabs
            value={false}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable-setting-tabs"
            css={classes.tabs}
            TabIndicatorProps={{ sx: { display: "none" } }}
          >
            {options.map((option: IOption, index: number) => (
              <Tab
                key={index}
                css={[
                  tab === option.value ? classes.activeTab : null,
                  classes.tab as any
                ]} // error when using textTransform
                label={option.label}
                value={option.value}
              />
            ))}
          </Tabs>
        </div>
      </div>
      <div className="flexColumn flex1 stretchSelf" css={classes.content}>
        {tab === SETTING_TABS.GENERAL && (
          <General goToMyAccount={goToMyAccount} />
        )}
        {tab === SETTING_TABS.TEAMS && (
          <TeamsTab teams={teams} goToTeamCreation={goToTeamCreation} />
        )}
        {tab === SETTING_TABS.DRIVERS && (
          <Drivers
            drivers={drivers}
            goToDriverCreation={goToDriverCreation}
            onSelectDriver={onSelectDriver}
            alert={alert}
          />
        )}
        {tab === SETTING_TABS.PRODUCTS && (
          <Products
            goToProductCreation={goToProductCreation}
            products={products}
            onSelect={onSelectProduct}
          />
        )}
        {tab === SETTING_TABS.OKR && (
          <Okrs
            okrs={okrs}
            goToOkrCreation={goToOkrCreation}
            onSelectOkr={onSelectOkr}
            alert={alert}
          />
        )}
        {tab === SETTING_TABS.USERS && <Users />}
      </div>
    </Box>
  );
};

export default SettingsLayout;
