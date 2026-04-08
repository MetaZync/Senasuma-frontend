"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Divider,
  Chip,
} from "@mui/material";
import { Poppins } from "next/font/google";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DownloadIcon from "@mui/icons-material/Download";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface Product {
  id: number;
  title: string;
  regularPrice: number;
  wholeSalePrice: number;
  options?: string[];
}

interface OrderItem {
  id: string;
  productId: number | "";
  option: string;
  quantity: number | "";
}

interface ValidationErrors {
  fullName?: string;
  contactNumber?: string;
  emailAddress?: string;
  fromDate?: string;
  toDate?: string;
  items?: { [key: number]: { productId?: string; option?: string; quantity?: string } };
}

const BUSINESS_WHATSAPP = "94768058080";
const TODAY = new Date().toISOString().split("T")[0];

export default function PlaceOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const orderCardRef = useRef<HTMLDivElement>(null);

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: Date.now().toString(), productId: "", option: "", quantity: "" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/products.json");
        const data: Product[] = await response.json();
        setProductsData(data);
        if (id) {
          const productId = Number(id);
          const found = data.find((p) => p.id === productId);
          if (found) {
            setOrderItems([{ id: Date.now().toString(), productId, option: found.options?.[0] || "", quantity: "" }]);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) =>
    /^(\+94|0)[0-9]{9,10}$/.test(phone.replace(/\s/g, ""));

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (fullName.trim().length < 3) newErrors.fullName = "Name must be at least 3 characters.";

    if (!contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";
    else if (!validatePhone(contactNumber)) newErrors.contactNumber = "Enter a valid Sri Lankan number (e.g. +94 71 234 5678).";

    if (!emailAddress.trim()) newErrors.emailAddress = "Email address is required.";
    else if (!validateEmail(emailAddress)) newErrors.emailAddress = "Enter a valid email address.";

    const itemErrors: ValidationErrors["items"] = {};
    orderItems.forEach((item, index) => {
      const itemErr: { productId?: string; option?: string; quantity?: string } = {};
      if (!item.productId) itemErr.productId = "Please select a product.";
      if (!item.option) itemErr.option = "Please select an option.";
      if (!item.quantity || (item.quantity as number) <= 0) itemErr.quantity = "Quantity must be greater than 0.";
      if (Object.keys(itemErr).length > 0) itemErrors[index] = itemErr;
    });
    if (Object.keys(itemErrors).length > 0) newErrors.items = itemErrors;

    if (!fromDate) newErrors.fromDate = "Please select a pickup start date.";
    if (!toDate) newErrors.toDate = "Please select a pickup end date.";
    if (fromDate && toDate && fromDate > toDate) {
      newErrors.toDate = "End date must be after start date.";
    }

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateForm());
  };

  const isFormValid = () => {
    const errs = validateForm();
    return Object.keys(errs).length === 0 && agreed;
  };

  const handleAddItem = () => {
    setOrderItems([...orderItems, { id: Date.now().toString() + Math.random(), productId: "", option: "", quantity: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: unknown) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === "productId") {
      const prod = productsData.find((p) => p.id === value);
      if (prod && prod.options && prod.options.length > 0) {
        newItems[index].option = prod.options[0];
      } else {
        newItems[index].option = "";
      }
    }
    setOrderItems(newItems);
    if (Object.keys(touched).length > 0) setErrors(validateForm());
  };

  const totalPrice = orderItems.reduce((sum, item) => {
    if (!item.productId || !item.quantity || typeof item.quantity !== "number") return sum;
    const prod = productsData.find((p) => p.id === item.productId);
    if (!prod) return sum;
    const pricePer1000 = item.quantity >= 500 ? prod.wholeSalePrice : prod.regularPrice;
    return sum + pricePer1000 * item.quantity;
  }, 0);

  const buildWhatsAppMessage = () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const orderRef = `SNS-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const orderDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const orderTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const itemLines = orderItems
      .map((item, i) => {
        const prod = productsData.find((p) => p.id === item.productId);
        const qty = item.quantity as number;
        const price = qty >= 500 ? prod?.wholeSalePrice : prod?.regularPrice;
        const subtotal = (price || 0) * qty;
        return (
          `  ${i + 1}. ${prod?.title || "Unknown Product"}\n` +
          `     ├ Option  : ${item.option}\n` +
          `     ├ Quantity: ${qty} Packs (${qty * 1000} pieces)\n` +
          `     ├ Pricing : ${qty >= 500 ? "Wholesale" : "Regular"} Rate – LKR ${price?.toFixed(2)} / pack\n` +
          `     └ Subtotal: LKR ${subtotal.toFixed(2)}`
        );
      })
      .join("\n\n");

    const pickupFrom = new Date(fromDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const pickupTo = new Date(toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

    const message = [
      `SENASUMA POLYTHENE`,
      `Official Order Request`,

      ``,
      `  ORDER REFERENCE: #${orderRef}`,
      `  Submitted: ${orderDate} at ${orderTime}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  CUSTOMER DETAILS`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  Name    : ${fullName}`,
      `  Mobile  : ${contactNumber}`,
      `  Email   : ${emailAddress}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  ORDER ITEMS`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      itemLines,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  ORDER SUMMARY`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  Items    : ${orderItems.length} product${orderItems.length > 1 ? "s" : ""}`,
      `  Total    : LKR ${totalPrice.toFixed(2)}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  PICKUP SCHEDULE`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  From   : ${pickupFrom}`,
      `  To     : ${pickupTo}`,
      `  Hours  : 8:00 AM – 5:00 PM (Weekdays)`,
      `  Note   : Factory pickup only`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  CUSTOMER CONFIRMATION`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `I confirm this is a factory pickup order and I`,
      `agree to be contacted regarding this request.`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `  www.senasuma.lk`,
      `  +94 76 805 8080`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `_This message was generated via the Senasuma_`,
      `_online ordering system. Ref: #${orderRef}_`,
    ].join("\n");

    return message;
  };

  const handleDownloadCard = async () => {
    if (!orderCardRef.current) return;
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(orderCardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `Senasuma-Order-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleConfirmOrder = () => {
    const allTouched: { [key: string]: boolean } = {};
    ["fullName", "contactNumber", "emailAddress", "fromDate", "toDate"].forEach(
      (k) => (allTouched[k] = true)
    );
    setTouched(allTouched);
    const errs = validateForm();
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !agreed) return;
    setShowConfirmModal(true);
  };

  const handleSendToWhatsApp = () => {
    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encoded}`;
    window.open(url, "_blank");
  };

  const handleCancel = () => router.push(`/products/${id || ""}`);

  const generateOrderRef = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `SNS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };
  const orderRef = useRef(generateOrderRef());
  const now = new Date();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff", pt: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>

        <Typography
          component={FadeIn}
          delay={0.1}
          variant="h3"
          align="center"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            mb: { xs: 2, md: 3 },
            color: "#000000",
            fontSize: { xs: "32px", md: "40px" },
          }}
        >
          Place Your Order
        </Typography>
        <Typography
          align="center"
          sx={{ fontFamily: poppins.style.fontFamily, color: "#888", fontSize: "14px", mb: { xs: 6, md: 8 } }}
        >
          Fill in your details below. Your order will be sent directly to our team via WhatsApp.
        </Typography>

        <Box component={FadeIn} delay={0.2} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4, mb: 4 }}>
          <Box>
            <Typography sx={labelStyle}>Your Full Name *</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Kamal Perera"
              variant="outlined"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); if (touched.fullName) setErrors(validateForm()); }}
              onBlur={() => handleBlur("fullName")}
              error={touched.fullName && !!errors.fullName}
              helperText={touched.fullName && errors.fullName}
              sx={inputStyles}
              FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Contact Number *</Typography>
            <TextField
              fullWidth
              placeholder="+94 71 684 3344"
              variant="outlined"
              value={contactNumber}
              onChange={(e) => { setContactNumber(e.target.value); if (touched.contactNumber) setErrors(validateForm()); }}
              onBlur={() => handleBlur("contactNumber")}
              error={touched.contactNumber && !!errors.contactNumber}
              helperText={touched.contactNumber && errors.contactNumber}
              sx={inputStyles}
              FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
            />
          </Box>
          <Box>
            <Typography sx={labelStyle}>Email Address *</Typography>
            <TextField
              fullWidth
              placeholder="kamal@email.com"
              variant="outlined"
              value={emailAddress}
              onChange={(e) => { setEmailAddress(e.target.value); if (touched.emailAddress) setErrors(validateForm()); }}
              onBlur={() => handleBlur("emailAddress")}
              error={touched.emailAddress && !!errors.emailAddress}
              helperText={touched.emailAddress && errors.emailAddress}
              sx={inputStyles}
              FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
            />
          </Box>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />

        {orderItems.map((item, index) => {
          const selectedProd = productsData.find((p) => p.id === item.productId);
          const optionsList = selectedProd?.options?.length ? selectedProd.options : [];
          const itemErr = errors.items?.[index] || {};

          return (
            <Box component={FadeIn} delay={0.3} key={item.id} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: "16px" }}>
                    Product #{index + 1}
                  </Typography>
                </Box>
                {index > 0 && (
                  <IconButton onClick={() => handleRemoveItem(index)} sx={{ color: "#e74c3c", "&:hover": { backgroundColor: "#fef2f2" } }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
                <Box>
                  <Typography sx={labelStyle}>Select Product *</Typography>
                  <TextField
                    select
                    fullWidth
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, "productId", Number(e.target.value))}
                    error={!!itemErr.productId}
                    helperText={itemErr.productId}
                    sx={inputStyles}
                    FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
                  >
                    {productsData.map((prod) => (
                      <MenuItem key={prod.id} value={prod.id} sx={{ fontFamily: poppins.style.fontFamily }}>
                        {prod.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Option *</Typography>
                  <TextField
                    select
                    fullWidth
                    value={item.option}
                    onChange={(e) => handleItemChange(index, "option", e.target.value)}
                    error={!!itemErr.option}
                    helperText={itemErr.option || (!selectedProd ? "Select a product first" : "")}
                    sx={inputStyles}
                    FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
                    disabled={optionsList.length === 0}
                  >
                    {optionsList.map((opt) => (
                      <MenuItem key={opt} value={opt} sx={{ fontFamily: poppins.style.fontFamily }}>{opt}</MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box>
                  <Typography sx={labelStyle}>Quantity (Packs) *</Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="e.g. 20"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value) || "")}
                    error={!!itemErr.quantity}
                    helperText={itemErr.quantity}
                    InputProps={{
                      endAdornment: <InputAdornment position="end"><span style={{ fontSize: "13px", fontWeight: 600, color: "#629474" }}>packs</span></InputAdornment>,
                      inputProps: { min: 1 },
                    }}
                    sx={inputStyles}
                    FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
                  />
                  {item.quantity && (item.quantity as number) > 0 && (
                    <Box sx={{ mt: 1, p: 1.5, borderRadius: "10px", backgroundColor: (item.quantity as number) >= 500 ? "#f0faf3" : "#fafafa", border: "1px solid", borderColor: (item.quantity as number) >= 500 ? "#629474" : "#e0e0e0" }}>
                      <Typography sx={{ fontSize: "11px", fontFamily: poppins.style.fontFamily, color: (item.quantity as number) >= 500 ? "#629474" : "#888", fontWeight: 500 }}>
                        {(item.quantity as number) >= 500 ? "🎉 Wholesale rate applied!" : `Order ${500 - (item.quantity as number)} more packs for wholesale pricing`}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {item.productId && item.quantity && (item.quantity as number) > 0 && (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    label={`Subtotal: LKR ${((((item.quantity as number) >= 500 ? selectedProd?.wholeSalePrice : selectedProd?.regularPrice) || 0) * (item.quantity as number)).toFixed(2)}`}
                    sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, backgroundColor: "#f0faf3", color: "#629474", fontSize: "13px" }}
                  />
                </Box>
              )}

              {index === orderItems.length - 1 && (
                <Box sx={{ mt: 4, width: "100%" }}>
                  <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", mb: 3 }}>
                    <Divider sx={{ flex: 1, borderColor: "#eaeaea" }} />
                    <Typography sx={{ px: 2, color: "#ccc", fontSize: "12px", fontFamily: poppins.style.fontFamily }}>
                      Add More Items
                    </Typography>
                    <Divider sx={{ flex: 1, borderColor: "#eaeaea" }} />
                  </Box>
                  <Button
                    onClick={handleAddItem}
                    startIcon={<AddIcon />}
                    sx={{
                      border: "1px dashed #6c6c6c",
                      borderRadius: "30px",
                      color: "#000",
                      textTransform: "none",
                      fontFamily: poppins.style.fontFamily,
                      px: 3,
                      py: 1,
                      fontSize: "13px",
                      width: { xs: "100%", md: "auto" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    Add more products
                  </Button>
                </Box>
              )}

              {index < orderItems.length - 1 && <Box sx={{ borderBottom: "1px dashed #e0e0e0", mt: 4 }} />}
            </Box>
          );
        })}

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />

        <Box component={FadeIn} delay={0.4} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mb: 4 }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500, color: "#888", mb: 0.5 }}>
            Estimated Total
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: { xs: "32px", md: "48px" }, fontWeight: 700, color: "#629474", lineHeight: 1 }}>
            LKR {totalPrice.toFixed(2)}
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#aaa", mt: 0.5 }}>
            Final price confirmed upon order processing
          </Typography>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 6 }} />

        <Typography align="center" sx={{ fontFamily: poppins.style.fontFamily, fontSize: { xs: "28px", md: "36px" }, fontWeight: 500, mb: 5 }}>
          Pickup Date Range
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 8 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, md: 8 }} alignItems="flex-start" sx={{ mb: 2, width: "100%", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Typography sx={labelStyle}>From *</Typography>
              <TextField
                type="date"
                fullWidth
                value={fromDate}
                onChange={(e) => { setFromDate(e.target.value); if (touched.fromDate) setErrors(validateForm()); }}
                onBlur={() => handleBlur("fromDate")}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => (e.target as HTMLInputElement).showPicker?.()}
                error={touched.fromDate && !!errors.fromDate}
                helperText={touched.fromDate && errors.fromDate}
                inputProps={{ min: TODAY }}
                sx={inputStyles}
                FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
              />
            </Box>

            <Box sx={{ display: { xs: "none", sm: "flex" }, pt: 4, alignItems: "center" }}>
              <Typography sx={{ color: "#ccc", letterSpacing: "4px", fontSize: "20px" }}>───</Typography>
            </Box>

            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Typography sx={labelStyle}>To *</Typography>
              <TextField
                type="date"
                fullWidth
                value={toDate}
                onChange={(e) => { setToDate(e.target.value); if (touched.toDate) setErrors(validateForm()); }}
                onBlur={() => handleBlur("toDate")}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => (e.target as HTMLInputElement).showPicker?.()}
                error={touched.toDate && !!errors.toDate}
                helperText={touched.toDate && errors.toDate}
                inputProps={{ min: fromDate || TODAY }}
                sx={inputStyles}
                FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, fontSize: "11px" } }}
              />
            </Box>
          </Stack>

          <Box sx={{ mt: 2, p: 2, borderRadius: "12px", backgroundColor: "#f9fafb", border: "1px solid #eaeaea", maxWidth: "500px", textAlign: "center" }}>
            <Typography sx={{ color: "#6c6c6c", fontSize: "12px", fontFamily: poppins.style.fontFamily, lineHeight: 1.6 }}>
              Factory pickup only • At least 1 business day notice required<br />
              <strong style={{ color: "#000" }}>Pickup hours: 8:00 AM – 5:00 PM (Weekdays)</strong>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 6 }} />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{ color: "#d0d0d0", "&.Mui-checked": { color: "#629474" } }}
              />
            }
            label={
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#333" }}>
                I understand this order must be <strong>picked up at the factory</strong> and I will be contacted if there are any issues.
              </Typography>
            }
          />
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{
              backgroundColor: "#f5f5f5", color: "#000000", fontFamily: poppins.style.fontFamily,
              borderRadius: "30px", textTransform: "none", px: { xs: 4, md: 5 }, py: 1.5,
              fontWeight: 500, boxShadow: "none", transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "#e74c3c", color: "#ffffff", boxShadow: "none" },
            }}
            endIcon={
              <Box sx={{ backgroundColor: "#000", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CloseIcon sx={{ fontSize: "16px" }} />
              </Box>
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmOrder}
            disabled={!agreed}
            sx={{
              background: agreed ? "linear-gradient(135deg, #629474, #527F65)" : undefined,
              backgroundColor: !agreed ? "#d0d0d0" : undefined,
              color: "#ffffff", fontFamily: poppins.style.fontFamily, borderRadius: "30px",
              textTransform: "none", px: { xs: 4, md: 6 }, py: 1.5, fontWeight: 600,
              boxShadow: agreed ? "0 4px 20px rgba(98,148,116,0.4)" : "none",
              "&:hover": { background: "linear-gradient(135deg, #527F65, #3d6650)", boxShadow: "0 6px 24px rgba(98,148,116,0.5)" },
              "&.Mui-disabled": { backgroundColor: "#d0d0d0", color: "#fff" },
            }}
            startIcon={<WhatsAppIcon />}
            endIcon={
              <Box sx={{ backgroundColor: "rgba(255,255,255,0.25)", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckIcon sx={{ fontSize: "16px" }} />
              </Box>
            }
          >
            Confirm & Send via WhatsApp
          </Button>
        </Stack>

        {!agreed && (
          <Typography align="center" sx={{ fontSize: "12px", color: "#e74c3c", fontFamily: poppins.style.fontFamily, mb: 2 }}>
            Please accept the terms above before confirming your order.
          </Typography>
        )}

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#629474", fontSize: "14px", fontFamily: poppins.style.fontFamily, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            Your order will be sent directly to our WhatsApp for fast processing.
          </Typography>
        </Box>
      </Container>

      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 300, sx: { backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" } } }}
      >
        <Fade in={showConfirmModal}>
          <Box sx={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95vw", sm: "90vw", md: "700px" },
            maxHeight: "90vh",
            overflowY: "auto",
            outline: "none",
            borderRadius: "24px",
            backgroundColor: "#fff",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 4, pt: 3, pb: 2, borderBottom: "1px solid #f0f0f0" }}>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 700, fontSize: "20px" }}>
                Order Summary
              </Typography>
              <IconButton onClick={() => setShowConfirmModal(false)} sx={{ color: "#666" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box ref={orderCardRef} sx={{ p: { xs: 3, md: 4 }, backgroundColor: "#fff" }}>

              <Box sx={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d4a3a 60%, #629474 100%)",
                borderRadius: "16px",
                p: 3,
                mb: 3,
                position: "relative",
                overflow: "hidden",
              }}>
                <Box sx={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }} />
                <Box sx={{ position: "absolute", bottom: -30, right: 80, width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(98,148,116,0.3)" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                  <Box>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "#a8d5b8", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", mb: 0.5 }}>
                      Senasuma Polythene
                    </Typography>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "#fff", fontSize: "22px", fontWeight: 700, lineHeight: 1.2 }}>
                      Order Confirmation
                    </Typography>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "rgba(255,255,255,0.6)", fontSize: "12px", mt: 0.5 }}>
                      {now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "rgba(255,255,255,0.5)", fontSize: "11px", mb: 0.5 }}>Ref No.</Typography>
                    <Box sx={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "8px", px: 1.5, py: 0.5 }}>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "#a8d5b8", fontWeight: 700, fontSize: "14px" }}>
                        #{orderRef.current}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 3, p: 2.5, borderRadius: "12px", backgroundColor: "#f9fafb", border: "1px solid #f0f0f0" }}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", fontWeight: 700, color: "#629474", textTransform: "uppercase", letterSpacing: "1.5px", mb: 1.5 }}>
                  Customer Details
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                  {[
                    { label: "Name", value: fullName },
                    { label: "Mobile", value: contactNumber },
                    { label: "Email", value: emailAddress },
                  ].map((row) => (
                    <Box key={row.label}>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#aaa", fontWeight: 500 }}>{row.label}</Typography>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#111", fontWeight: 600 }}>{row.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", fontWeight: 700, color: "#629474", textTransform: "uppercase", letterSpacing: "1.5px", mb: 1.5 }}>
                  Order Items
                </Typography>
                {orderItems.map((item, index) => {
                  const prod = productsData.find((p) => p.id === item.productId);
                  const qty = item.quantity as number;
                  const price = qty >= 500 ? prod?.wholeSalePrice : prod?.regularPrice;
                  const subtotal = (price || 0) * qty;
                  return (
                    <Box key={item.id} sx={{ mb: 1.5, p: 2, borderRadius: "10px", border: "1px solid #f0f0f0", backgroundColor: "#fff" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#629474", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Typography sx={{ color: "#fff", fontSize: "10px", fontWeight: 700, fontFamily: poppins.style.fontFamily }}>{index + 1}</Typography>
                            </Box>
                            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 700, fontSize: "14px", color: "#111" }}>
                              {prod?.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 2, pl: 4 }}>
                            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "12px", color: "#666" }}>Option: <strong>{item.option}</strong></Typography>
                            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "12px", color: "#666" }}>Qty: <strong>{qty} packs</strong></Typography>
                            <Chip size="small" label={qty >= 500 ? "Wholesale" : "Regular"} sx={{ height: 18, fontSize: "10px", backgroundColor: qty >= 500 ? "#f0faf3" : "#f5f5f5", color: qty >= 500 ? "#629474" : "#666", fontFamily: poppins.style.fontFamily }} />
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "right", ml: 2 }}>
                          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#aaa" }}>LKR {price?.toFixed(2)}/pack</Typography>
                          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 700, fontSize: "15px", color: "#629474" }}>LKR {subtotal.toFixed(2)}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ p: 2.5, borderRadius: "12px", background: "linear-gradient(135deg, #f0faf3, #e8f5ec)", border: "1px solid #c8e6ca", mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#629474", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Total Amount</Typography>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#888" }}>Includes all applicable rates</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 800, fontSize: "24px", color: "#629474" }}>
                    LKR {totalPrice.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                {[
                  { label: "  Pickup From", value: new Date(fromDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
                  { label: "  Pickup To", value: new Date(toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
                ].map((row) => (
                  <Box key={row.label} sx={{ p: 2, borderRadius: "10px", backgroundColor: "#f9fafb", border: "1px solid #f0f0f0" }}>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#aaa" }}>{row.label}</Typography>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 700, color: "#111" }}>{row.value}</Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 700, color: "#629474" }}>
                     Senasuma Polythene
                  </Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#aaa" }}>
                    www.senasuma.lk · +94 71 684 3344
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#ccc" }}>Eco-certified · Sri Lanka</Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#ccc" }}>Ref: #{orderRef.current}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ px: 4, pb: 4, pt: 2, borderTop: "1px solid #f0f0f0" }}>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#666", textAlign: "center", mb: 3, lineHeight: 1.6 }}>
                <strong>Tip:</strong> Download the order card below and attach it in WhatsApp for a complete official record.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderColor: "#629474", color: "#629474", fontFamily: poppins.style.fontFamily,
                    borderRadius: "30px", textTransform: "none", px: 4, py: 1.5, fontWeight: 500,
                    "&:hover": { backgroundColor: "#f0faf3", borderColor: "#527F65" },
                  }}
                >
                  {isDownloading ? "Downloading..." : "Download Order Card"}
                </Button>

                <Button
                  onClick={handleSendToWhatsApp}
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #25D366, #1ebe5d)",
                    color: "#fff", fontFamily: poppins.style.fontFamily,
                    borderRadius: "30px", textTransform: "none", px: 5, py: 1.5, fontWeight: 700,
                    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                    "&:hover": { background: "linear-gradient(135deg, #1ebe5d, #17a84f)", boxShadow: "0 6px 24px rgba(37,211,102,0.5)" },
                  }}
                >
                  Send via WhatsApp
                </Button>
              </Stack>

              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#bbb", textAlign: "center", mt: 2 }}>
                You will be redirected to WhatsApp with a pre-filled order message. Tap Send to confirm.
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

const labelStyle = {
  mb: 1,
  fontFamily: "'Poppins', sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  color: "#333",
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f7f8f9",
    fontFamily: "'Poppins', sans-serif",
    "& fieldset": { border: "1px solid #eaeaea" },
    "&:hover fieldset": { border: "1px solid #bbb" },
    "&.Mui-focused fieldset": { border: "2px solid #629474" },
    "&.Mui-error fieldset": { border: "1px solid #e74c3c" },
  },
  "& input": {
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
  },
};
