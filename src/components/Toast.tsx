import { Snackbar, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { resetToast } from "../redux/slices/statSlice";

export const Toast = () => {
  const toast = useSelector((state: RootState) => state.stats.toast);
  const dispatch = useDispatch();
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        dispatch(resetToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, toast.show]);

  const getBackgroundColor = (): string => {
    if (toast?.type === "success") return "green";
    if (toast?.type === null) return "bg-slate-300";
    return "red";
  };

  return (
    <Snackbar
      open={toast.show}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
      sx={{
        marginTop: "0.3rem",
        width: "100% !important",
        right: "0 !important",
        left: "0 !important",
        cursor: "pointer",
      }}
    >
      <Box
        display={"flex"}
        bgcolor={getBackgroundColor()}
        padding={"0.5rem"}
        borderRadius={"0.5rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography margin={"0 0.5rem"} variant="subtitle1" color={"white"}>
          {toast?.text}
        </Typography>
      </Box>
    </Snackbar>
  );
};
