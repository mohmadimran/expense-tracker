import { Box, Typography, Button } from "@mui/material";
export default function Card({ isWallet, heading, btnText, value, openModal }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "181px",
        borderRadius: "15px",
        backgroundColor: "#9b9b9b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: { md: "20px", xs: "18px" },
            fontWeight: 400,
            color: "#ffffff",
          }}
        >
          {`${heading}: `}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: { md: "20px", xs: "18px" },
            fontWeight: 700,
            lineHeight: "34.47px",
            color: isWallet ? "#b5dc52" : "#ff9304",
          }}
        >
          {`₹${value}`}
        </Typography>
      </Box>

      <Button
        onClick={openModal}
        sx={{
          width: "167.65px",
          height: "38px",
          borderRadius: "15px",
          color: "#ffffff",
          border: "none",
          outline: "none",
          marginTop: "10px",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "18.38px",
          margin: "10px auto",
          cursor: "pointer",
          textTransform: "initial",
          background: isWallet
            ? "linear-gradient(90deg, #b5dc52 0%, #89e148 100%)"
            : "linear-gradient(90deg, #ff9595 0%, #ff4747 80%, #ff3838 100%)",
        }}
      >
        {btnText}
      </Button>
    </Box>
  );
}
