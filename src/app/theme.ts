"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Geist Mono",
      "Geist Mono Fallback",
      "Yu Gothic",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
