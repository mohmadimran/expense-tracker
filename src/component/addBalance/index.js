import Grid from "@mui/material/Grid2";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function AddBalanceModal({ closeModal, setIsBalance }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isValue, setValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (Number(isValue) < 0) {
      enqueueSnackbar("please add more than 0", { variant: "warning" });
      closeModal(false);
      return;
    }
    setIsBalance((previous) => previous + Number(isValue));
    closeModal(false);
  };
  return (
    <Container>
      <Box
        sx={{
          width: { xs: "100%", md: "538px" },
          height: { xs: "100%", md: "164px" },
          borderRadius: "15px",
          backgroundColor: "#efefefd9",
          padding: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { md: "30px", sx: "20px" },
            fontWeight: 700,
            lineHeight: "34.47px",
            textAlign: { md: "left", xs: "center" },
            color: "#000000",
          }}
        >
          Add Balance
        </Typography>

        <form onSubmit={handleAdd}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              // flexWrap: "wrap",
              justifyContent: { md: "flex-start", xs: "center" },
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              type="number"
              required
              value={isValue}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Income Amount"
              sx={{
                height: "51px",
                borderRadius: "15px",
                backgroundColor: "#fbfbfb",
                color: "#919191",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21.79px",
                textAlign: "left",
                boxShadow: "0px 4px 4px 0px #00000040",
                border: "none",
                outline: "none",
                paddingLeft: "8px",
                "& input": { padding: "12px 8px" },
              }}
            />

            <Button
              type="submit"
              sx={{
                // width: "145px",
                padding: "15px 20px",
                height: "51px",
                borderRadius: "15px",
                backgroundColor: "#f4bb4a",
                color: "#ffffff",
                boxShadow: "0px 4px 4px 0px #00000040",
                border: "none",
                outline: "none",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e0a63d" }, 
              }}
            >
              Add Balance
            </Button>

            <Button
              type="button"
              onClick={() => closeModal(false)}
              sx={{
                // width: "112px",
                padding: "15px 20px",
                height: "51px",
                borderRadius: "15px",
                backgroundColor: "#e3e3e3",
                boxShadow: "0px 4px 4px 0px #00000040",
                color: "#000000",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21.79px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#d6d6d6" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
