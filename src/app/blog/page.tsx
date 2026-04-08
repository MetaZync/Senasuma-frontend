import { Box, Typography, Container } from "@mui/material";
import BlogSection from "./BlogSection";

export const metadata = {
  title: "Blog | Senasuma",
  description: "Read our latest insights, news, and guides related to the polythene industry.",
};

export default function BlogPage() {
  return (
    <Box component="main" sx={{ backgroundColor: "#ffffff", pt: {xs: 20, md: 35}, pb: {xs: 10, md: 10} }}>
      <BlogSection />
    </Box>
  );
}
