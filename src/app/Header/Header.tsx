"use client";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/PhoneEnabled";
import { useState } from "react";
import OrderButton from "../../components/Button";
import Link from "next/link";
import Logo from "../../../public/Assets/LogoName.webp";
import GreenLogo from "../../../public/Assets/GreenLogoName.webp";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => pathname === href;

  const isProductsPage = pathname === "/products";
  const isProductDetailsPage = /^\/products\/\d+$/.test(pathname || "");
  const isPlaceOrderPage = /^\/products\/\d+\/place-order$/.test(pathname || "");
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const showNav = !(isProductDetailsPage || isPlaceOrderPage);

  const useDarkNav = isAboutPage || isContactPage;

  const buttonText = (isProductsPage || isProductDetailsPage || isPlaceOrderPage) ? "Contact Now" : "Place Your Order";
  const buttonIcon = (isProductsPage || isProductDetailsPage || isPlaceOrderPage) ? (
    <PhoneIcon sx={{ fontSize: 20 }} />
  ) : undefined;
  const buttonHref = (isProductsPage || isProductDetailsPage || isPlaceOrderPage) ? "tel:+94777796955" : "/products/1/place-order";

  const navColor = useDarkNav ? "#111111" : "#fff";
  const activeIndicatorColor = useDarkNav ? "#000000ff" : "#fff";

  return (
    <>
      <AppBar
        elevation={0}
        position="absolute"
        sx={{
          backgroundColor: "transparent",
          mt: 5,
        }}
      >
        <Box sx={{ maxWidth: "1820px", width: "100%", mx: "auto", px: { xs: 2, sm: 3, lg: 8 } }}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: { xs: "center", md: "start" },
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {showNav ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: navColor,
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <MenuIcon sx={{ fontSize: "32px" }} />
              </IconButton>
            ) : (
              <Box sx={{ display: { xs: "none", md: "block" }, flex: 1 }} />
            )}

            {showNav && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: { xs: "row", md: "column", lg: "column" },
                  gap: "0.7rem",
                  alignItems: "start",
                  flex: 1,
                }}
              >
                {navLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{
                        color: navColor,
                        textDecoration: "none",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "1.3rem",
                        fontWeight: 300,
                        letterSpacing: "1px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {active && (
                          <span style={{ fontSize: "16px", color: activeIndicatorColor }}>▶</span>
                        )}
                        <span
                          style={{
                            borderBottom: active ? `3px solid ${activeIndicatorColor}` : "none",
                            paddingBottom: active ? "4px" : "0",
                          }}
                        >
                          {item.label}
                        </span>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            )}

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: { xs: "36px", sm: "40px", md: "52px" },
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <Image
                src={(showNav && !useDarkNav) ? Logo : GreenLogo}
                alt="Senasuma"
                width={0}
                height={0}
                sizes="100vw"
                priority
                style={{
                  width: "auto",
                  height: "100%",
                  filter: "none",
                }}
              />
            </Box>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ display: { xs: showNav ? "none" : "block", md: "block" } }}>
                <OrderButton href={buttonHref} icon={buttonIcon}>
                  {buttonText}
                </OrderButton>
              </Box>
            </Box>
          </Toolbar>

          {!showNav && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mt: 1,
                color: "#000",
              }}
            >
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: 500,
                    color: "#000000",
                    fontFamily: poppins.style.fontFamily,
                    "&:hover": { color: "#629474" },
                  }}
                >
                  Products
                </Typography>
              </Link>
              <Typography sx={{ color: "#7a7a7a", fontWeight: {xs: 400, md: 700}, fontSize: {xs: "12px", md: "18px"} }}>{">"}</Typography>
              
              {isPlaceOrderPage ? (
                <>
                  <Link href={`/products/${pathname?.split('/')[2]}`} style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", md: "18px" },
                        fontWeight: 500,
                        color: "#000000",
                        fontFamily: poppins.style.fontFamily,
                        "&:hover": { color: "#629474" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Product Details
                    </Typography>
                  </Link>
                  <Typography sx={{ color: "#7a7a7a", fontWeight: {xs: 400, md: 700}, fontSize: {xs: "12px", md: "18px"} }}>{">"}</Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "18px" },
                      fontWeight: 500,
                      color: "#629474",
                      fontFamily: poppins.style.fontFamily,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Place order
                  </Typography>
                </>
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "18px" },
                    fontWeight: 500,
                    color: "#629474",
                    fontFamily: poppins.style.fontFamily,
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Details
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "300px",
            backgroundColor: "#ffffffff",
            color: "#000000ff",
            pl: 2,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#000000ff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {showNav ? (
            navLinks.map((item) => (
              <Link key={item.label} href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem
                  onClick={handleDrawerToggle}
                  sx={{ py: 2, cursor: 'pointer' }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              </Link>
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ opacity: 0.6 }}>Navigation unavailable on this page</Typography>
            </Box>
          )}
        </List>

        <Box sx={{ p: 3, mt: "auto" }}>
          <OrderButton
            fullWidth
            onClick={handleDrawerToggle}
            href={buttonHref}
            icon={buttonIcon}
          >
            {buttonText}
          </OrderButton>
        </Box>
      </Drawer>
    </>
  );
}