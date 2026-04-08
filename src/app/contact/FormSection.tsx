"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Poppins } from "next/font/google";
import emailjs from "@emailjs/browser";
import OrderButton from "@/components/Button";

// ─── EmailJS Config ────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_96en3q5";
const EMAILJS_TEMPLATE_ID = "template_r5ojxl7";
const EMAILJS_PUBLIC_KEY  = "H_E1zqUt0b52Y-RI4";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// ─── Styles ────────────────────────────────────────────────────
const inputSx = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#e6e6e6ff",
    borderRadius: "100px",
    "& fieldset": { border: "none" },
    "& input": {
      padding: "16px 28px",
      fontFamily: poppins.style.fontFamily,
      fontSize: "15px",
      color: "#111",
    },
    "&:hover": { backgroundColor: "#eeeeee" },
    "&.Mui-focused": { backgroundColor: "#eeeeee" },
    "&.Mui-error": { outline: "2px solid #e74c3c" },
  },
};

const textareaSx = {
  mt: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#e6e6e6ff",
    borderRadius: "32px",
    padding: "16px 20px",
    "& fieldset": { border: "none" },
    "& textarea": {
      fontFamily: poppins.style.fontFamily,
      fontSize: "15px",
      color: "#111",
    },
    "&:hover": { backgroundColor: "#eeeeee" },
    "&.Mui-focused": { backgroundColor: "#eeeeee" },
  },
};

const labelSx = {
  fontFamily: poppins.style.fontFamily,
  fontSize: "15px",
  fontWeight: 500,
  color: "#111",
  ml: 1,
};

// ─── Types ──────────────────────────────────────────────────────
type ToastState = {
  open: boolean;
  severity: "success" | "error";
  message: string;
};

const INITIAL_FORM = {
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
};

// ─── Component ──────────────────────────────────────────────────
export default function FormSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false, severity: "success", message: "" });

  // ── Handlers ──────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullname.trim())
      newErrors.fullname = "Full name is required.";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required.";
    if (!formData.email.trim())
      newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.subject.trim())
      newErrors.subject = "Subject is required.";
    if (!formData.message.trim())
      newErrors.message = "Message is required.";
    return newErrors;
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ open: true, severity: "error", message: "Please fill in all required fields correctly." });
      return;
    }

    setLoading(true);

    // Build the template parameters — variable names must match the EmailJS template exactly
    const templateParams = {
      fullname:          formData.fullname,
      contactNumber:     formData.contactNumber,
      email:             formData.email,
      subject:           formData.subject,
      message:           formData.message,
      // Checkboxes: send "Yes" / "No" to match text-based template variables
      orderRequest:      formData.options.orderRequest      ? "Yes" : "No",
      problemSubmission: formData.options.problemSubmission ? "Yes" : "No",
      collaboration:     formData.options.collaboration     ? "Yes" : "No",
      other:             formData.options.other             ? "Yes" : "No",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setToast({
        open: true,
        severity: "success",
        message: "Your inquiry has been sent successfully! We'll get back to you shortly.",
      });

      // Reset form on success
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setToast({
        open: true,
        severity: "error",
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <Box sx={{ width: "100%", py: 4 }}>

      {/* ── Heading ── */}
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
            letterSpacing: "-0.5px",
          }}
        >
          We're Here to Support<br />You Anytime
        </Typography>
      </Box>

      {/* ── Form ── */}
      <Box
        ref={formRef}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ width: "100%", maxWidth: "1000px", mx: "auto", px: { xs: 2, sm: 0 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Row: Name / Contact / Email */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Fullname *</Typography>
              <TextField
                fullWidth
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Your Fullname"
                variant="outlined"
                error={!!errors.fullname}
                helperText={errors.fullname}
                FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, marginLeft: "12px" } }}
                sx={inputSx}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Contact Number *</Typography>
              <TextField
                fullWidth
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+94 70 123 4567"
                variant="outlined"
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, marginLeft: "12px" } }}
                sx={inputSx}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={labelSx}>Your Email Address *</Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@email.com"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, marginLeft: "12px" } }}
                sx={inputSx}
              />
            </Box>
          </Box>

          {/* Options checkboxes */}
          <Box>
            <Stack direction={{ xs: "column", sm: "row" }} flexWrap="wrap" spacing={{ xs: 1, sm: 4 }}>
              {[
                { label: "Order Request",       name: "orderRequest"      },
                { label: "Problem Submission",  name: "problemSubmission" },
                { label: "Collaboration",       name: "collaboration"     },
                { label: "Other",               name: "other"             },
              ].map((option) => (
                <FormControlLabel
                  key={option.name}
                  control={
                    <Checkbox
                      disableRipple
                      checked={formData.options[option.name as keyof typeof formData.options]}
                      onChange={() => handleCheckboxChange(option.name)}
                      sx={{ color: "#ccc", "&.Mui-checked": { color: "#629474" } }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "15px", color: "#111", fontWeight: 400 }}>
                      {option.label}
                    </Typography>
                  }
                />
              ))}
            </Stack>
          </Box>

          {/* Subject */}
          <Box>
            <Typography sx={labelSx}>Subject *</Typography>
            <TextField
              fullWidth
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter Your Subject"
              variant="outlined"
              error={!!errors.subject}
              helperText={errors.subject}
              FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, marginLeft: "12px" } }}
              sx={inputSx}
            />
          </Box>

          {/* Message */}
          <Box>
            <Typography sx={labelSx}>Message *</Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here…"
              variant="outlined"
              error={!!errors.message}
              helperText={errors.message}
              FormHelperTextProps={{ style: { fontFamily: poppins.style.fontFamily, marginLeft: "12px" } }}
              sx={textareaSx}
            />
          </Box>

          {/* Submit */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
            {loading && <CircularProgress size={24} sx={{ color: "#629474" }} />}
            <OrderButton type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send the Inquiry"}
            </OrderButton>
          </Box>

        </Box>
      </Box>

      {/* ── Toast Notifications ── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "14px",
            borderRadius: "12px",
            minWidth: "320px",
            "& .MuiAlert-icon": { fontSize: "22px" },
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
