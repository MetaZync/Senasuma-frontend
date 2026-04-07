"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { Poppins } from "next/font/google";
import OrderButton from "@/components/Button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inputSx = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#e6e6e6ff",
    borderRadius: "100px",
    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "16px 28px",
      fontFamily: poppins.style.fontFamily,
      fontSize: "15px",
      color: "#111",
    },
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
    "&.Mui-focused": {
      backgroundColor: "#eeeeee",
    }
  },
};

const textareaSx = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#e6e6e6ff",
    borderRadius: "32px",
    padding: "16px 20px",
    "& fieldset": {
      border: "none",
    },
    "& textarea": {
      fontFamily: poppins.style.fontFamily,
      fontSize: "15px",
      color: "#111",
    },
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
    "&.Mui-focused": {
      backgroundColor: "#eeeeee",
    }
  },
};

const labelSx = {
  fontFamily: poppins.style.fontFamily,
  fontSize: "15px",
  fontWeight: 500,
  color: "#111",
  ml: 1,
};

export default function FormSection() {
  const [formData, setFormData] = useState({
    fullname: "",
    contactNumber: "",
    email: "",
    subject: "",
    message: "",
    options: {
      orderRequest: false,
      problemSubmission: false,
      collaboration: false,
      other: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [name as keyof typeof prev.options]: !prev.options[name as keyof typeof prev.options],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Inquiry Sent Successfully!");
  };

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 5 } }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "32px", sm: "44px", md: "50px" },
            fontWeight: 600,
            color: "#000",
            lineHeight: 1.2,
            maxWidth: "900px",
            mx: "auto",
            letterSpacing: "-0.5px"
          }}
        >
          We're Here to Support<br />You Anytime
        </Typography>
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          width: "100%", 
          maxWidth: "1000px", 
          mx: "auto",
          px: { xs: 2, sm: 0 }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Fullname</Typography>
              <TextField
                fullWidth
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Your Fullname"
                variant="outlined"
                sx={inputSx}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Contact Number</Typography>
              <TextField
                fullWidth
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+94 70 123 4567"
                variant="outlined"
                sx={inputSx}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Email Address</Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@email.com"
                variant="outlined"
                sx={inputSx}
              />
            </Box>
          </Box>

          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              flexWrap="wrap"
              spacing={{ xs: 1, sm: 4 }}
            >
              {[
                { label: "Order Request", name: "orderRequest" },
                { label: "Problem submission", name: "problemSubmission" },
                { label: "Collaboration", name: "collaboration" },
                { label: "Other", name: "other" },
              ].map((option) => (
                <FormControlLabel
                  key={option.name}
                  control={
                    <Checkbox
                      disableRipple
                      checked={formData.options[option.name as keyof typeof formData.options]}
                      onChange={() => handleCheckboxChange(option.name)}
                      sx={{
                        color: "#ccc",
                        "&.Mui-checked": {
                          color: "#629474",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "15px",
                        color: "#111",
                        fontWeight: 400
                      }}
                    >
                      {option.label}
                    </Typography>
                  }
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography sx={labelSx}>Subject</Typography>
            <TextField
              fullWidth
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Your Subject"
              variant="outlined"
              sx={inputSx}
            />
          </Box>

          <Box>
            <Typography sx={labelSx}>Message</Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=""
              variant="outlined"
              sx={textareaSx}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <OrderButton type="submit">
              Send the Inquiry
            </OrderButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
