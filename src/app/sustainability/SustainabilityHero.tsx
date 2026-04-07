import { Box, Typography } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SustainabilityHero = () => {
  return (
    <Box
      id="sustainability-hero"
      sx={{
        position: "relative",
        width: "100%",
        height: "110vh",
        backgroundImage: 'url("/Assets/SustainabilityHeroImage.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderRadius: "0px 0px 50px 50px",
        px: { xs: 3, md: 8, lg: 12 },
        overflow: "hidden",
      }}
    >
      <Box 
        sx={{ 
          maxWidth: { xs: "100%", md: "80%" }, 
          textAlign: "right",
          pr: { md: 4, lg: 8 }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem", lg: "6rem" },
            fontWeight: 500,
            color: "#1a1a1a",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            textTransform: "none",
          }}
        >
          Committed to a<br /> Cleaner Tomorrow
        </Typography>
      </Box>
    </Box>
  );
};

export default SustainabilityHero;
