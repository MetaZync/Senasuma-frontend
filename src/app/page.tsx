import HeroSection from "./Hero";
import LogoCarousel from "@/components/LogoCarousel";
import SustainabilitySection from "@/app/SustainabilitySection";
import StatsSection from "@/app/StatsSection";
import RecognizedSection from "@/app/RecognizedSection";
import PopularProducts from "@/app/PopularProducts";
import SenasumaMehewara from "@/app/SenasumaMehewara";
import BuildSolutionsSection from "@/app/BuildSolutionsSection";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Box>
        <HeroSection />
        <LogoCarousel />
        <SustainabilitySection />
        <StatsSection />
        <RecognizedSection />
        <PopularProducts />
        <SenasumaMehewara />
        <BuildSolutionsSection />
      </Box>
    </>
  );
}
