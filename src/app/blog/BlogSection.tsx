"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Pagination, IconButton } from "@mui/material";
import { Poppins } from "next/font/google";
import { buildWispClient } from "@wisp-cms/client";
import BlogCard from "./BlogCard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const wisp = buildWispClient({
  blogId: "8cb2cc60-02fe-429c-88d1-d692c3434c77",
});

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await wisp.getPosts({ limit: 100 });
        setPosts(result.posts || []);
      } catch (error) {
        console.error("Error fetching Wisp posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const paginatedPosts = posts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  if (loading) {
    return (
      <Box sx={{ py: 16, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontFamily: poppins.style.fontFamily }}>Loading articles...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 0, md: 12 }, backgroundColor: "#ffffff" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 4, lg: 8 } }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 3, sm: 3, md: 5 },
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {paginatedPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.description || "No excerpt available."}
              imageUrl={post.image || "/Assets/HomeBoxOne.webp"}
              slug={post.slug}
            />
          ))}
        </Box>

        {totalPages > 0 && (
          <Box sx={{ mt: { xs: 8, md: 12 }, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              renderItem={({ color, page, selected, type, ...itemProps }) => (
                <IconButton
                  {...itemProps}
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: "50%",
                    mx: 0.5,
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 600,
                    fontFamily: poppins.style.fontFamily,
                    backgroundColor: selected ? "#629474" : "#e0e0e0",
                    color: selected ? "#ffffff" : "#000000",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: selected ? "#528464" : "#d0d0d0",
                    },
                    "&.Mui-disabled": {
                      opacity: 0.5,
                    },
                    visibility: type === 'page' || type === 'start-ellipsis' || type === 'end-ellipsis' ? 'visible' : 'hidden',
                    display: type === 'page' || type === 'start-ellipsis' || type === 'end-ellipsis' ? 'inline-flex' : 'none',
                  }}
                >
                  {type === 'page' ? page : '...'}
                </IconButton>
              )}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
