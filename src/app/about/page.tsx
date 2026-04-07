import { Box } from "@mui/material";
import HeroSection from "./AboutHero";
import AboutStatement from "./AboutStatement";
import AboutEcoSection from "./AboutEcoSection";
import MissionVisionSection from "./MissionVisionSection";
import AboutExpertSection from "./AboutExpertSection";
import SenasumaMehewara from "../SenasumaMehewara";
import BuildSolutionsSection from "../BuildSolutionsSection";

export const metadata = {
  title: "About Us - Senasuma Polythene",
  description: "Learn more about Senasuma's green polythene revolution and our commitment to a sustainable Sri Lanka.",
};

export default function AboutPage() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <HeroSection />
      <AboutStatement />
      <AboutEcoSection />
      <MissionVisionSection />
      <AboutExpertSection />
      <SenasumaMehewara />
      <BuildSolutionsSection />
    </Box>
  );
}

