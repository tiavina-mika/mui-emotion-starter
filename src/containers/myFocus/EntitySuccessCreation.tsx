import { Button, Typography } from "@mui/material";

import TopIcon from "../../components/layouts/TopIcon";

const EntitySuccessCreation = ({ onCloseSelectionDialog, onClose }: any) => {
  const handlePreview = () => {
    console.log("handlePreview");
  };

  const handleCreate = () => {
    onClose();
    onCloseSelectionDialog();
  };

  return (
    <div className="flexCenter gapFortyEight">
      <div className="flexCenter gapTwentyFour">
        <TopIcon image="/icons/party-popper.svg" />
        <Typography variant="h2">Tout est prêt !</Typography>
        <Typography variant="h5" align="center" sx={{ lineHeight: 1.4 }}>
          Vous pourrez la modifier à tout moment directement
          <br />
          dans votre espace Mon Focus.
        </Typography>
      </div>
      <div className="flexCenter stretchSelf gapEight">
        <Button variant="contained" fullWidth onClick={handlePreview}>
          Voir ma problématique
        </Button>
        <Button variant="outlined" fullWidth onClick={handleCreate}>
          Créer une nouvelle entité
        </Button>
      </div>
    </div>
  );
};

export default EntitySuccessCreation;
