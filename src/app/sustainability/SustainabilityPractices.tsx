"use client";

import { Box, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ImageOneLand from "../../../public/Assets/WastingManagementLandscape.webp";
import ImageOnePort from "../../../public/Assets/WastingManagementPortrait.webp";
import ImageTwoPort from "../../../public/Assets/ResponsibleMaterialPortrait.webp";
import ImageTwoLand from "../../../public/Assets/ResponsibleMaterialLandscape.webp";
import ImageThreeLand from "../../../public/Assets/ReduceCarbonLandscape.webp";
import ImageThreePort from "../../../public/Assets/ReduceCarbonPortrait.webp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function SustainabilityPractices() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 16 },
        backgroundColor: "#ffffff",
        backgroundImage: "url('/Assets/OverlayAbout.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 8, md: 16 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 }, alignItems: "stretch", mb: 10 }}>
            <Box sx={{ width: { xs: "100%", md: "58.33%" }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 3 }, alignItems: {xs: "flex-start", sm: "center"}, flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: { xs: "80px", sm: "100px", md: "140px", lg: "220px" },
                    fontWeight: 500,
                    lineHeight: 0.8,
                    color: "#000000",
                    letterSpacing: "-4px",
                  }}
                >
                  01
                </Typography>
                <Box sx={{ pt: { sm: 2 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: { xs: "24px", md: "28px", lg: "30px" },
                      color: "#1a1a1a",
                      lineHeight: 1,
                      mb: { xs: 2, md: 1 },
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Waste Management &<br />Recycling Programs
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "#4a4a4a",
                      fontSize: { xs: "11px", md: "12px" },
                      lineHeight: 1.2,
                      mb: 0,
                    }}
                  >
                    Every scrap generated inside our facility is collected, sorted, and recycled responsibly.
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "#4a4a4a",
                      fontSize: { xs: "11px", md: "12px" },
                      lineHeight: 1.6,
                      mb: 1,
                    }}
                  >
                    We maintain a closed-loop recycling system that ensures:
                  </Typography>
                  <ul style={{ paddingLeft: "18px", margin: 0, color: "#4a4a4a", fontSize: "12px", fontFamily: poppins.style.fontFamily, lineHeight: 1.3 }}>
                    <li style={{ paddingBottom: "4px" }}>Zero scrap disposal into the environment</li>
                    <li>Reprocessing of materials into reusable forms</li>
                  </ul>
                </Box>
              </Box>

              <Box sx={{ position: "relative", width: { xs: "100%", md: "100%" }, height: { xs: "160px", md: "240px" }, borderRadius: "24px", overflow: "hidden", alignSelf: "flex-end" }}>
                <Image
                  src={ImageOneLand}
                  alt="Recycling bags"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "41.67%" } }}>
              <Box sx={{ position: "relative", width: "90%", height: { xs: "350px", md: "100%" }, minHeight: { md: "500px" }, borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src={ImageOnePort}
                  alt="Waste collection"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", md: "row" }, gap: { xs: 4, md: 0 }, alignItems: "stretch", mb: 10 }}>
            <Box sx={{ width: { xs: "100%", md: "41.67%" } }}>
              <Box sx={{ position: "relative", width: "90%", height: { xs: "350px", md: "100%" }, minHeight: { md: "500px" }, borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src={ImageTwoPort}
                  alt="Recycled materials"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "58.33%" }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 4 }, alignItems: "flex-start", flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: { xs: "80px", sm: "100px", md: "140px", lg: "220px" },
                    fontWeight: 500,
                    lineHeight: 0.8,
                    color: "#000000",
                    letterSpacing: "-4px",
                  }}
                >
                  02
                </Typography>
                <Box sx={{ pt: { sm: 2 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: { xs: "24px", md: "32px", lg: "30px" },
                      color: "#1a1a1a",
                      lineHeight: 1,
                      mb: { xs: 2, md: 1 },
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Responsible<br />Material Sourcing
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "#4a4a4a",
                      fontSize: { xs: "11px", md: "12px" },
                      lineHeight: 1.3,
                    }}
                  >
                    We use high-quality, recyclable LDPE and HDPE materials that are safe for consumers and friendly to the environment. Where possible, we also offer biodegradable and oxo-biodegradable options to help brands reduce their environmental footprint.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ position: "relative", width: { xs: "100%", md: "100%" }, height: { xs: "160px", md: "240px" }, borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src={ImageTwoLand}
                  alt="Rolls of materials"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 }, alignItems: "stretch" }}>
            <Box sx={{ width: { xs: "100%", md: "58.33%" }, display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 2, sm: 4 }, alignItems: "flex-start", flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: { xs: "80px", sm: "100px", md: "140px", lg: "220px" },
                    fontWeight: 500,
                    lineHeight: 0.8,
                    color: "#000000",
                    letterSpacing: "-4px",
                  }}
                >
                  03
                </Typography>
                <Box sx={{ pt: { sm: 2 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: { xs: "24px", md: "32px", lg: "30px" },
                      color: "#1a1a1a",
                      lineHeight: 1,
                      mb: { xs: 2, md: 1 },
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Reduced Carbon <br />Footprint
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "#4a4a4a",
                      fontSize: { xs: "11px", md: "12px" },
                      lineHeight: 1.1,
                      mb: 0,
                    }}
                  >
                    Through optimized logistics, eco-friendly production, and continuous efficiency improvements, we actively work to reduce our carbon footprint across the entire supply chain.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ position: "relative", width: { xs: "100%", md: "100%" }, height: { xs: "160px", md: "240px" }, borderRadius: "24px", overflow: "hidden", alignSelf: "flex-end" }}>
                <Image
                  src={ImageThreeLand}
                  alt="Recycling bags"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "41.67%" } }}>
              <Box sx={{ position: "relative", width: "90%", height: { xs: "350px", md: "100%" }, minHeight: { md: "500px" }, borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src={ImageThreePort}
                  alt="Waste collection"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
