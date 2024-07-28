import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

export const Spinner = ({
  color = "primary",
  size = 100,
}: Readonly<{
  color?:
    | "error"
    | "inherit"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
  size?: number;
}>) => {
  const isLoading = useSelector((state: RootState) => state.stats.isLoading);

  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      setShowSpinner(true);
    } else {
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);
    }
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <Backdrop open={showSpinner} sx={{ zIndex: 99 }}>
      <CircularProgress color={color} size={size} />
    </Backdrop>
  );
};
