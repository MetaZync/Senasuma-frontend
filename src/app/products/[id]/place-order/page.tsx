"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Poppins } from "next/font/google";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function PlaceOrderPage() {
  const { id } = useParams();
  const router = useRouter();

  const [productsData, setProductsData] = useState<Product[]>([]);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [agreed, setAgreed] = useState(false);

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

  const handleAddItem = () => {
    setOrderItems([...orderItems, { id: Date.now().toString() + Math.random(), productId: "", option: "", quantity: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === "productId") {
      const prod = productsData.find((p) => p.id === value);
      if (prod && prod.options && prod.options.length > 0) {
        newItems[index].option = prod.options[0];
      }
    }
    
    setOrderItems(newItems);
  };

  const totalPrice = orderItems.reduce((sum, item) => {
    if (!item.productId || !item.quantity || typeof item.quantity !== "number") return sum;
    const prod = productsData.find((p) => p.id === item.productId);
    if (!prod) return sum;
    
    const pricePer1000 = item.quantity >= 500 ? prod.wholeSalePrice : prod.regularPrice;
    return sum + (pricePer1000 * item.quantity);
  }, 0);

  const handleCancel = () => {
    router.push(`/products/${id || ""}`);
  };

  const isFormValid = 
    fullName.trim() !== "" &&
    contactNumber.trim() !== "" &&
    emailAddress.trim() !== "" &&
    orderItems.every(i => i.productId !== "" && i.option !== "" && i.quantity !== "" && (i.quantity as number) > 0) &&
    fromDate !== "" &&
    toDate !== "" &&
    agreed;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff", pt: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            mb: { xs: 6, md: 8 },
            color: "#000000",
            fontSize: { xs: "32px", md: "40px" },
          }}
        >
          Place Your Order
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 4 }}>
          <Box>
            <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
              Your Fullname
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Your Full name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={inputStyles}
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
              Your Contact Number
            </Typography>
            <TextField
              fullWidth
              placeholder="+94 70 123 4567"
              variant="outlined"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              sx={inputStyles}
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
              Your Email Address
            </Typography>
            <TextField
              fullWidth
              placeholder="abc@email.com"
              variant="outlined"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              sx={inputStyles}
            />
          </Box>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />

        {orderItems.map((item, index) => {
          const selectedProd = productsData.find((p) => p.id === item.productId);
          const optionsList = selectedProd?.options?.length ? selectedProd.options : [];
          
          return (
            <Box key={item.id} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
                  Product #{index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton 
                    onClick={() => handleRemoveItem(index)}
                    sx={{ color: "#e74c3c" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                <Box>
                  <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                    Select the Product
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, "productId", Number(e.target.value))}
                    sx={inputStyles}
                  >
                    {productsData.map((prod) => (
                      <MenuItem key={prod.id} value={prod.id} sx={{ fontFamily: poppins.style.fontFamily }}>
                        {prod.title}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                  {index === orderItems.length - 1 && (
                    <Button
                      onClick={handleAddItem}
                      startIcon={<AddIcon />}
                      sx={{
                        mt: 3,
                        border: "1px dashed #6c6c6c",
                        borderRadius: "30px",
                        color: "#000",
                        textTransform: "none",
                        fontFamily: poppins.style.fontFamily,
                        px: 3,
                        py: 1,
                        fontSize: "13px",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      Add more products
                    </Button>
                  )}
                </Box>
                <Box>
                  <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                    Options
                  </Typography>
                  <TextField 
                    select 
                    fullWidth 
                    value={item.option} 
                    onChange={(e) => handleItemChange(index, "option", e.target.value)}
                    sx={inputStyles}
                  >
                    {optionsList.map((opt) => (
                      <MenuItem key={opt} value={opt} sx={{ fontFamily: poppins.style.fontFamily }}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box>
                  <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                    Quantity
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Ex: 20"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value) || "")}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#000" }}>/Packs</span>
                      </InputAdornment>,
                    }}
                    sx={inputStyles}
                  />
                  <Typography sx={{ mt: 1, fontSize: "12px", color: "#6c6c6c", fontFamily: poppins.style.fontFamily, lineHeight: 1.4 }}>
                    Note: Each pack contains 1000 pieces & to get the whole sale price you should order atleast 500 packs
                  </Typography>
                </Box>
              </Box>
              
              {index < orderItems.length - 1 && <Box sx={{ borderBottom: "1px dashed #e0e0e0", mt: 4 }} />}
            </Box>
          );
        })}

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mb: 4 }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "18px", fontWeight: 500, mb: 1 }}>
            Total Order Price
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              color: "#629474",
            }}
          >
            LKR {totalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 6 }} />

        <Typography
          align="center"
          sx={{ fontFamily: poppins.style.fontFamily, fontSize: { xs: "28px", md: "36px" }, fontWeight: 500, mb: 5 }}
        >
          Pick up date
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 8 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 3, md: 8 }} alignItems="center" sx={{ mb: 2, width: "100%", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                From
              </Typography>
              <TextField 
                type="date" 
                fullWidth 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                onClick={(e: any) => e.target.showPicker?.()}
                sx={inputStyles} 
              />
            </Box>
            
            <Box sx={{ display: { xs: "none", sm: "flex" }, pt: 3 }}>
              <Typography sx={{ color: "#6c6c6c", letterSpacing: "4px" }}>- - - - - - - -</Typography>
            </Box>

            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <Typography sx={{ mb: 1, fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                To
              </Typography>
              <TextField 
                type="date" 
                fullWidth 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                onClick={(e: any) => e.target.showPicker?.()}
                sx={inputStyles} 
              />
            </Box>
          </Stack>
          
          <Typography
            align="center"
            sx={{
              color: "#6c6c6c",
              fontSize: "12px",
              fontFamily: poppins.style.fontFamily,
              maxWidth: "600px",
            }}
          >
            Note: Please select a pickup date between [From] and [To]. The pickup date must be at least one business day later than the order date.
            <br />
            <strong style={{ color: "#000" }}>Orders can be picked up between 8:00 AM and 5:00 PM.</strong>
          </Typography>
        </Box>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 6 }} />

        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{
                  color: "#d0d0d0",
                  "&.Mui-checked": {
                    color: "#629474",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#333" }}>
                I understand that this order must be picked up at the factory and that I will be contacted if there are any issues
              </Typography>
            }
          />
        </Box>

        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000000",
              fontFamily: poppins.style.fontFamily,
              borderRadius: "30px",
              textTransform: "none",
              px: { xs: 2, md: 3 },
              py: 1,
              fontWeight: 500,
              boxShadow: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#e74c3c",
                color: "#ffffff",
                boxShadow: "none",
                "& .cancel-icon": {
                  backgroundColor: "#ffffff",
                  color: "#e74c3c",
                }
              },
            }}
            endIcon={
              <Box
                className="cancel-icon"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <CloseIcon sx={{ fontSize: "16px" }} />
              </Box>
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!isFormValid}
            sx={{
              backgroundColor: "#629474",
              color: "#ffffff",
              fontFamily: poppins.style.fontFamily,
              borderRadius: "30px",
              textTransform: "none",
              px: { xs: 2, md: 3 },
              py: 1,
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#528464",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                backgroundColor: "#d0d0d0",
                color: "#ffffff",
              },
            }}
            endIcon={
              <Box
                sx={{
                  backgroundColor: "#fff",
                  color: isFormValid ? "#629474" : "#a0a0a0",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #d0d0d0",
                }}
              >
                <CheckIcon sx={{ fontSize: "16px" }} />
              </Box>
            }
          >
            Confirm and Place the Order
          </Button>
        </Stack>

        <Box sx={{ borderBottom: "1px solid #eaeaea", mb: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#629474", fontSize: "14px", fontFamily: poppins.style.fontFamily }}>
            You will receive a confirmation email after placing your order.
            <br />
            Please check your e-mails for order details and pickup information.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f5f5f5",
    fontFamily: poppins.style.fontFamily,
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "1px solid #629474" },
  },
  "& input": {
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: poppins.style.fontFamily,
    cursor: "pointer",
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: poppins.style.fontFamily,
  },
};
