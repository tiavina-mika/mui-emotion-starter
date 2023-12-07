import Box from "@mui/material/Box";
import CircularProgress, {
  CircularProgressProps
} from "@mui/material/CircularProgress";

type Props = {
  fullPage?: boolean;
} & CircularProgressProps;

const Loading = ({ fullPage = false, ...circularProgressProps }: Props) => {
  return (
    <Box
      className="flexCenter flex1 stretchSelf"
      sx={{ height: fullPage ? "100vh" : "100%" }}
    >
      <CircularProgress {...circularProgressProps} />
    </Box>
  );
};

export default Loading;
