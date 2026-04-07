import BuildSolutionsSection from "../BuildSolutionsSection";
import SenasumaMehewara from "../SenasumaMehewara";
import SustainabilityHero from "./SustainabilityHero";
import SustainabilityMission from "./SustainabilityMission";
import SustainabilityPractices from "./SustainabilityPractices";
import { Box } from "@mui/material";

export const metadata = {
  title: "Sustainability | Senasuma",
  description: "Our commitment to a cleaner and greener tomorrow through sustainable polythene solutions.",
};

export default function SustainabilityPage() {
  return (
    <Box component="main">
      <SustainabilityHero />
      <SustainabilityMission />
      <SustainabilityPractices />
      <SenasumaMehewara />
      <BuildSolutionsSection />
    </Box>
  );
}


