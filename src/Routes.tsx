import { useState } from "react";
import HomeLayout from "./containers/home/HomeLayout";
import CreateTeamPage from "./containers/team/CreateTeamPage";
import CreateDriver from "./containers/driver/CreateDriver";
import CreateOkr from "./containers/okr/CreateOkr";
import CreateProduct from "./containers/product/CreateProduct";
import EditProduct from "./containers/product/EditProduct";

import EditDriver from "./containers/driver/EditDriver";
import MyAccount from "./containers/general/MyAccount";
import EditOkr from "./containers/okr/EditOkr";
import Product from "./containers/product/Product";

import { IAlert, IHomeTab, ISettingsTab } from "./types/app.type";
import { ITeam } from "./types/team.type";
import { IDriver } from "./types/driver.type";
import { IOkr } from "./types/okr.type";

import { HOME_TABS, PATH_NAMES, SETTING_TABS } from "./utils/constants";
import { products as dataProducts } from "./utils/data/product";
import { IProduct } from "./types/product.type";

const Route = () => {
  // tabs
  const [homeTab, setHomeTab] = useState<IHomeTab>(HOME_TABS.MY_FOCUS);
  const [homeSettingTab, setHomeSettingTab] = useState<ISettingsTab>(
    SETTING_TABS.PRODUCTS
    // SETTING_TABS.GENERAL
  );

  const [alert, setAlert] = useState<IAlert>(null);
  const [route, setRoute] = useState<string>(PATH_NAMES.home);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [products, setProducts] = useState<IProduct[]>(dataProducts);
  const [okrs, setOkrs] = useState<IOkr[]>([]);
  const [driver, setDriver] = useState<IDriver | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [okr, setOkr] = useState<IOkr | null>(null);

  const goToTeamCreation = () => setRoute(PATH_NAMES.team.create);
  const goToDriverCreation = () => setRoute(PATH_NAMES.driver.create);
  const goToOkrCreation = () => setRoute(PATH_NAMES.okr.create);
  const goToProductCreation = () => setRoute(PATH_NAMES.product.create);
  //
  const goToHome = () => setRoute(PATH_NAMES.home);
  const goToMyAccount = () => {
    setRoute(PATH_NAMES.general.myAccount);
    // setHomeSettingTab(SETTING_TABS.GENERAL);
  };
  const goToBackFromMyAccount = () => {
    setRoute(PATH_NAMES.home);
    // setHomeSettingTab(SETTING_TABS.GENERAL);
  };

  const goToProductEdition = (product: IProduct) => {
    setProduct(product);
    setRoute(PATH_NAMES.product.edit);
  };

  // tabs actions
  const onHomeTabChange = (tab: IHomeTab) => setHomeTab(tab);
  const onSettingTabChange = (tab: ISettingsTab) => {
    setHomeSettingTab(tab);
    setAlert(null);
  };

  const onAddTeams = (team: ITeam) => {
    setTeams((prev: ITeam[]) => [team, ...prev]);
    onHomeTabChange(HOME_TABS.SETTINGS);
  };

  const onAddDrivers = (driver: IDriver) => {
    setDrivers((prev: IDriver[]) => [driver, ...prev]);
    onHomeTabChange(HOME_TABS.SETTINGS);
    setRoute(PATH_NAMES.home);
    setAlert({ color: "success", type: "driver" });
  };

  const onAddOkrs = (driver: IOkr) => {
    setDrivers((prev: IOkr[]) => [driver, ...prev]);
    onHomeTabChange(HOME_TABS.SETTINGS);
    setRoute(PATH_NAMES.home);
    setAlert({ color: "success", type: "okr" });
  };

  const onAddProduct = (product: IProduct) => {
    setProducts((prev: IProduct[]) => [product, ...prev]);
    onSettingTabChange(SETTING_TABS.PRODUCTS);
    setRoute("");
    setAlert({ color: "success", type: "product" });
  };

  const onEditProduct = (product: IProduct) => {
    setProducts((prev: IProduct[]) => {
      const filteredProducts = prev.filter(
        (prevProduct) => prevProduct.objectId !== product.objectId
      );
      return [product, ...filteredProducts];
    });
    onSettingTabChange(SETTING_TABS.PRODUCTS);
    setRoute("");
    setAlert({ color: "success", type: "product" });
  };

  const handleEditDriver = (values: IDriver) => {
    setDrivers((prev: IDriver[]) => {
      return prev.map((driver: IDriver) => {
        if (driver.objectId === values.objectId) {
          return {
            ...driver,
            ...values
          };
        }
        return driver;
      });
    });
    setRoute(PATH_NAMES.home);
    setAlert({ color: "success", type: "driver" });
  };

  const handleEditOkr = (values: IOkr) => {
    setOkrs((prev: IOkr[]) => {
      return prev.map((okr: IOkr) => {
        if (okr.objectId === values.objectId) {
          return {
            ...okr,
            ...values
          };
        }
        return okr;
      });
    });
    setRoute(PATH_NAMES.home);
    setAlert({ color: "success", type: "driver" });
  };

  const handleSelectDriver = (driver: IDriver) => {
    setDriver(driver);
    setRoute(PATH_NAMES.driver.preview);
  };

  const handleSelectOkr = (okr: IOkr) => {
    setOkr(okr);
    setRoute(PATH_NAMES.okr.edit);
  };

  const handleSelectProduct = (product: IProduct) => {
    setProduct(product);
    setRoute(PATH_NAMES.product.preview);
  };

  const handleGoToDrivers = () => {
    setDriver(null);
    setRoute(PATH_NAMES.settingsTabs.drivers);
  };

  const handleGoToOkrs = () => {
    setOkr(null);
    setRoute(PATH_NAMES.settingsTabs.okr);
  };

  const handleGoToProducts = () => {
    setProduct(null);
    setRoute(PATH_NAMES.settingsTabs.product);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev: IProduct[]) => [
      ...prev.filter((product: IProduct) => product.objectId !== id)
    ]);
    handleGoToProducts();
  };

  if (route === PATH_NAMES.general.myAccount) {
    return <MyAccount onBack={goToBackFromMyAccount} />;
  }

  if (route === PATH_NAMES.team.create) {
    return <CreateTeamPage goToHome={goToHome} onSave={onAddTeams} />;
  }

  if (route === PATH_NAMES.driver.create) {
    return <CreateDriver onSave={onAddDrivers} onBack={goToHome} />;
  }

  if (route === PATH_NAMES.okr.create) {
    return <CreateOkr onSave={onAddOkrs} onBack={goToHome} />;
  }

  if (route === PATH_NAMES.product.create) {
    return <CreateProduct onSave={onAddProduct} onBack={goToHome} />;
  }

  if (route === PATH_NAMES.product.edit) {
    return (
      <EditProduct
        onDelete={handleDeleteProduct}
        product={product}
        onSave={onEditProduct}
        onBack={goToHome}
      />
    );
  }

  if (route === PATH_NAMES.driver.preview) {
    return (
      <EditDriver
        driver={driver}
        onSave={handleEditDriver}
        onGoToDrivers={handleGoToDrivers}
      />
    );
  }

  if (route === PATH_NAMES.okr.edit) {
    return (
      <EditOkr okr={okr} onSave={handleEditOkr} onGoToOkrs={handleGoToOkrs} />
    );
  }

  if (route === PATH_NAMES.product.preview) {
    return (
      <Product
        product={product}
        onBack={handleGoToProducts}
        goToEdition={goToProductEdition}
      />
    );
  }

  return (
    <HomeLayout
      tab={homeTab}
      settingTab={homeSettingTab}
      onTabChange={onHomeTabChange}
      onSettingTabChange={onSettingTabChange}
      goToTeamCreation={goToTeamCreation}
      goToDriverCreation={goToDriverCreation}
      goToOkrCreation={goToOkrCreation}
      teams={teams}
      drivers={drivers}
      okrs={okrs}
      onSelectDriver={handleSelectDriver}
      onSelectOkr={handleSelectOkr}
      alert={alert}
      goToMyAccount={goToMyAccount}
      goToProductCreation={goToProductCreation}
      products={products}
      onSelectProduct={handleSelectProduct}
    />
  );
};

export default Route;
