import { Box, Container, Typography, Divider } from "@mui/material";
import { Poppins } from "next/font/google";
import { buildWispClient } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const wisp = buildWispClient({
  blogId: "8cb2cc60-02fe-429c-88d1-d692c3434c77",
});

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;

  try {
    const result = await wisp.getPost(slug);
    post = result.post;
  } catch (error) {
    console.error("Error fetching post data. Might not exist", error);
  }

  if (!post) {
    return (
      <Box sx={{ pt: 35, pb: 15, textAlign: "center", minHeight: "80vh" }}>
        <Typography variant="h3" sx={{ fontFamily: poppins.style.fontFamily, mb: 3 }}>
          Article Not Found
        </Typography>
        <Link href="/blog" style={{ color: "#629474", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <ArrowBackIcon /> Back to Blog
        </Link>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ backgroundColor: "#ffffff" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 16, md: 45 }, pb: { xs: 8, md: 12 } }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: poppins.style.fontFamily,
            color: "#000000",
            fontSize: { xs: "32px", sm: "40px", md: "52px" },
            fontWeight: 500,
            lineHeight: 1.2,
            mb: 3,
            maxWidth: "900px",
          }}
        >
          {post.title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              color: "#333333",
              fontSize: { xs: "12px", md: "14px" },
              fontWeight: 500,
            }}
          >
             By {post.authorId || "-"} &nbsp;&nbsp;&nbsp;
            <Typography component="span" sx={{ fontStyle: "italic", fontWeight: 700, fontSize: { xs: "12px", md: "14px" } }}>
              {post.publishedAt 
                ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) 
                : "-"}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, borderColor: "#e0e0e0" }} />

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "300px", md: "500px", lg: "600px" },
            borderRadius: "24px",
            overflow: "hidden",
            mb: 6,
          }}
        >
          <Image
            src={post.image || "/Assets/HomeBackground.webp"}
            alt={post.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "14px", md: "16px" },
            lineHeight: 1.8,
            color: "#1a1a1a",
            "& h1, & h2, & h3, & h4": {
              fontWeight: 500,
              color: "#000000",
              marginTop: "2em",
              marginBottom: "1em",
            },
            "& h2": { fontSize: "32px" },
            "& h3": { fontSize: "24px" },
            "& p": {
              marginBottom: "1.5em",
            },
            "& a": {
              color: "#629474",
              textDecoration: "underline",
            },
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "16px",
              my: 4,
            },
            "& blockquote": {
              borderLeft: "4px solid #629474",
              margin: "2em 0",
              padding: "0.5em 0 0.5em 1.5em",
              color: "#666666",
              fontStyle: "italic",
              backgroundColor: "#f9f9f9",
            },
            "& ul, & ol": {
              paddingLeft: "24px",
              marginBottom: "1.5em",
            },
            "& li": {
              marginBottom: "0.5em",
            },
            "& code": {
              backgroundColor: "#f0f0f0",
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: "monospace",
            },
            "& pre": {
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              overflowX: "auto",
              mb: "1.5em",
            }
          }}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </Container>
    </Box>
  );
}
