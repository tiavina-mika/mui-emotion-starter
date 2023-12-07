/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { Fragment } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { css } from "@emotion/css";

import EditableSection from "../../../../components/sections/EditableSection";
import Card from "../../../../components/Card";
import Emoji from "../../../../components/Emoji";
import { IProduct } from "../../../../types/product.type";
import { IComponent } from "../../../../types/component.type";
import {
  EntityDriver,
  IComponentsEntityFormInput,
  IEntityType,
  IEntityTypeEnum,
  IProblematicDriverInput,
  IProductsEntityFormInput
} from "../../../../types/entity.type";
import SectionTitle from "../../../../components/sections/SectionTitle";
import {
  entityDialogDetails,
  getEntityDriverOption
} from "../../../../utils/entity.utils";
import { useToggle } from "../../../../hooks/useToggle";
import EntityEditionDialog from "../EntityEditionDialog";
import EntityProductsForm from "../forms/EntityProductsForm";
import ProblematicDriversForm from "../../../myFocus/forms/problematic/ProblematicDriversForm";
import EntityComponentsForm from "../forms/EntityComponentsForm";

const classes = {
  cardContainer: (theme: Theme) => ({
    width: 150,
    [theme.breakpoints.down("sm")]: {
      width: "48%"
    }
  }),
  circle: (color: string, size = 25) => ({
    borderRadius: "100%",
    border: "1px solid " + color,
    width: size,
    height: size
  })
};
type Props = {
  products: IProduct[];
  components: IComponent[];
  drivers: EntityDriver[];
  type: IEntityType;
};
const EntityDetailsTab = ({ products, components, drivers, type }: Props) => {
  const theme = useTheme();

  // ---------- toggle dialogs ---------- //
  const {
    open: openProductsEditionDialog,
    toggle: toggleProductsEditionDialog
  } = useToggle();

  const {
    open: openDriversEditionDialog,
    toggle: toggleDriversEditionDialog
  } = useToggle();

  const {
    open: openComponentsEditionDialog,
    toggle: toggleComponentsEditionDialog
  } = useToggle();

  // ---------- form initial values ---------- //
  const productsInitialValues = {
    products: products.map((product: IProduct) => product.objectId)
  };

  const driversInititalValues = {
    drivers
  };

  const componentsInititalValues = {
    components: components.map((component: IComponent) => component.objectId)
  };

  const handleEditProducts = () => toggleProductsEditionDialog();
  const handleEditDrivers = () => toggleDriversEditionDialog();
  const handleEditComponents = () => toggleComponentsEditionDialog();

  const handleSaveProducts = (values: IProductsEntityFormInput) => {
    console.log("products", values);
  };

  const handleSaveDrivers = (values: IProblematicDriverInput) => {
    console.log("drivers", values);
  };

  const handleSaveComponents = (values: IComponentsEntityFormInput) => {
    console.log("components", values);
  };

  return (
    <Fragment>
      <Stack spacing={2.1}>
        {/* products */}
        <EditableSection
          onEdit={handleEditProducts}
          title="Products"
          className="gapEight flexRow stretchSelf"
        >
          {products.map((product: IProduct, index: number) => (
            <div key={product.objectId + index} css={classes.cardContainer}>
              <Card
                rootClassName={css({ minHeight: 42 })}
                contentClassName="gapEight flexRow justifyCenter center"
              >
                <Emoji emoji={product.icon} />
                <Typography className="grey800 fs14 lh1">
                  {product.name}
                </Typography>
              </Card>
            </div>
          ))}
        </EditableSection>

        {/* drivers */}
        <EditableSection
          onEdit={handleEditDrivers}
          title="Drivers"
          className="gapEight flexColumn stretchSelf"
        >
          {drivers?.length ? (
            drivers.map((driver: EntityDriver, index: number) => {
              const entityDriverOption = getEntityDriverOption(
                driver.impact,
                theme
              );

              return (
                <Card
                  key={driver.driver.objectId + index}
                  contentClassName="gapFour flexRow spaceBetween center"
                  rootClassName={css({ minHeight: 55 })}
                >
                  {/* left */}
                  <div className="gapFour flexRow center">
                    <Emoji emoji={driver.driver.icon} />
                    <Typography className="grey800 fs14 lh1">
                      {driver.driver.name}
                    </Typography>
                  </div>
                  {/* right */}
                  <Stack direction="row" spacing={3} alignItems="center">
                    {/* driver okrs */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SectionTitle title="Okr's" />
                      <div>
                        <div
                          className="flexCenter"
                          css={classes.circle(entityDriverOption.color, 29)}
                        >
                          <Typography
                            css={{
                              color: "#000",
                              letterSpacing: 0.12,
                              fontWeight: 400
                            }}
                          >
                            x5
                          </Typography>
                        </div>
                      </div>
                    </Stack>
                    {/* driver impact */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SectionTitle title="Impact" />
                      <div>
                        <div
                          className="flexCenter"
                          css={classes.circle(entityDriverOption.color)}
                        >
                          <img
                            alt="impact"
                            src={
                              "/icons/driver/" +
                              entityDriverOption.icon +
                              ".svg"
                            }
                          />
                        </div>
                      </div>
                    </Stack>
                  </Stack>
                </Card>
              );
            })
          ) : (
            <Typography>No drivers for this entity</Typography>
          )}
        </EditableSection>

        {/* components */}
        {type === IEntityTypeEnum.userStory && (
          <EditableSection
            onEdit={handleEditComponents}
            title="Components"
            className="gapEight flexRow stretchSelf"
          >
            {components?.length ? (
              components.map((component: IComponent, index: number) => (
                <Card
                  key={component.objectId + index}
                  contentClassName="gapFour flexRow justifyCenter center"
                  rootClassName={css({ minHeight: 28 })}
                >
                  <Emoji emoji={component.icon} />
                  <Typography className="grey800 fs14 lh1">
                    {component.name}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography>No components for this entity</Typography>
            )}
          </EditableSection>
        )}
      </Stack>

      {/* ----------------------------------------- */}
      {/* ------------ Edition dialogs ------------ */}
      {/* ----------------------------------------- */}
      {/* products */}
      <EntityEditionDialog
        onClose={toggleProductsEditionDialog}
        open={openProductsEditionDialog}
        title={entityDialogDetails[type].title}
        description={entityDialogDetails[type].description}
      >
        <EntityProductsForm
          initialValues={productsInitialValues}
          onSave={handleSaveProducts}
        />
      </EntityEditionDialog>

      {/* drivers */}
      <EntityEditionDialog
        onClose={toggleDriversEditionDialog}
        open={openDriversEditionDialog}
        title={entityDialogDetails[type].title}
        description={entityDialogDetails[type].description}
      >
        <ProblematicDriversForm
          initialValues={driversInititalValues}
          onSave={handleSaveDrivers}
        />
      </EntityEditionDialog>

      {/* components */}
      <EntityEditionDialog
        onClose={toggleComponentsEditionDialog}
        open={openComponentsEditionDialog}
        title="Which components involved ?"
        description="Filling in the components makes it easier to track the history of your changes and improves planning
        accuracy."
      >
        <EntityComponentsForm
          initialValues={componentsInititalValues}
          onSave={handleSaveComponents}
        />
      </EntityEditionDialog>
    </Fragment>
  );
};

export default EntityDetailsTab;
