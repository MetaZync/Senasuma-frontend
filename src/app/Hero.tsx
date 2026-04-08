import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import HomeBox from "@/components/HomeBox";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function Home() {
  return (
    <div className={styles.page}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "115vh",
          background: "linear-gradient(to right, #8DC38B, #527F65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 8, md: 0 },
          mb: { xs: 3, md: 0 },
          borderRadius: "0 0 50px 50px"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/Assets/HomeBackground.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/Assets/HomeCenterImage.webp')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            display: { xs: "none", md: "flex" },
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "35dvh",
            top: "42%",
            transform: "translateY(-50%)",
            backgroundImage: "url('/Assets/HomeCenterImageMobile.webp')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            display: { xs: "flex", md: "none" },
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "100%",
            height: "100dvh",
            maxWidth: "1820px",
            px: { xs: 3, sm: 6, lg: 8 },
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-start", lg: "flex-end" },
              alignItems: { xs: "center", lg: "flex-start" },
              textAlign: { xs: "center", lg: "left" },
              width: { xs: "100%", lg: "60%" },
              pb: { xs: 2, lg: 10 },
              pt: { xs: 14, lg: 0 },
              pointerEvents: "auto",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                borderRadius: "50px",
                px: { xs: 2.5, md: 3 },
                py: { xs: 0.8, md: 1 },
                mb: { xs: 2, md: 3 },
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { xs: "10px", md: "14px" },
                  fontFamily: poppins.style.fontFamily,
                  letterSpacing: "1.5px",
                  fontWeight: 300,
                  textTransform: "uppercase",
                  m: 0,
                }}
              >
                Senasuma Polythene
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 500,
                fontSize: { xs: "1.7rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
                lineHeight: { xs: 1.1, md: 1.05 },
                fontFamily: poppins.style.fontFamily,
                letterSpacing: "-1.5px",
                textShadow: "0px 8px 32px rgba(0,0,0,0.2)",
                m: 0,
              }}
            >
              Sustainable Packaging<br />
              Solutions for a<br />
              Greener Tomorrow
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: { xs: "flex-end", lg: "center" },
              height: { xs: "auto", lg: "110%" },
              gap: { xs: 4, lg: 2 },
              alignItems: { xs: "center", lg: "flex-end" },
              pointerEvents: "auto",
              flex: { xs: 1, lg: "none" },
              pb: { xs: 8, lg: 0 },
              pt: { xs: 10, lg: 30 },
              zIndex: 222222
            }}
          >
            <Box sx={{
              height: { xs: "auto", lg: "160px" },
              transform: { lg: "translateX(30px)" },
              transition: 'transform 0.4s ease',
              display: "flex",
              alignItems: "flex-start"
            }}>
              <HomeBox
                title="100% Recycled Content"
                description="Ensuring maximum environmental responsibility without compromising quality."
                image="/Assets/HomeBoxOne.webp"
              />
            </Box>

            <Box sx={{
              height: { xs: "auto", lg: "160px" },
              transform: { lg: "translateX(80px)" },
              transition: 'transform 0.4s ease',
              display: "flex",
              alignItems: "flex-start"
            }}>
              <HomeBox
                title="Carbon-Neutral Production"
                description="Significantly reduce our impact on the environment."
                image="/Assets/HomeBoxTwo.webp"
              />
            </Box>

            <Box sx={{
              height: { xs: "auto", lg: "160px" },
              transform: { lg: "translateX(80px)" },
              transition: 'transform 0.4s ease',
              display: "flex",
              alignItems: "flex-start"
            }}>
              <HomeBox
                title="Closed-Loop Partner Program"
                description="Return used materials for responsible processing and reuse."
                image="/Assets/HomeBoxThree.webp"
              />
            </Box>

            <Box sx={{
              height: { xs: "auto", lg: "160px" },
              transform: { lg: "translateX(20px)" },
              transition: 'transform 0.4s ease',
              display: "flex",
              alignItems: "flex-start"
            }}>
              <HomeBox
                title="18 Years of Trusted Supply"
                description="Consistent supply partner for leading businesses across Sri Lanka."
                image="/Assets/HomeBoxFour.webp"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
