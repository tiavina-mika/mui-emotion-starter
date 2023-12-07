/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { Stack, Typography } from "@mui/material";
import Card from "../../components/Card";
import Section from "../../components/Section";
import ButtonAddDesktop from "../../components/ButtonAddDesktop";
import AddIcon from "../../components/AddIcon";
import { IProduct } from "../../types/product.type";
import { useResponsive } from "../../hooks/useResponsive";

const classes = {
  container: {
    marginTop: 6
  }
};

type Props = {
  goToProductCreation: () => void;
  products: IProduct[];
  onSelect: (product: IProduct) => void;
};

const Products = ({ goToProductCreation, products, onSelect }: Props) => {
  const { isMobile } = useResponsive();

  const handleAddClick = () => goToProductCreation();

  const handleCardClick = (product: IProduct) => onSelect(product);

  return (
    <div className="stretchSelf" css={classes.container}>
      {/* {alert?.type === 'products' && (
        <Box className="stretchSelf" sx={{ mb: 2.05 }}>
          <Alert severity="success" />
        </Box>
      )} */}
      <Section title="My Products">
        <Stack spacing={2} alignSelf="stretch">
          {products?.length ? (
            products.map((product: IProduct, index: number) => (
              <Card
                key={product.name + index}
                left={product.icon}
                onClick={() => handleCardClick(product)}
              >
                <Stack direction="row" spacing={0.6} className="stretchSelf">
                  <Typography variant="h4">{product.name}</Typography>
                </Stack>
              </Card>
            ))
          ) : (
            <Typography>No product</Typography>
          )}
          {!isMobile && (
            <ButtonAddDesktop title="product" handleClick={handleAddClick} />
          )}
        </Stack>
      </Section>
      {isMobile && <AddIcon onClick={handleAddClick} />}
    </div>
  );
};

export default Products;
