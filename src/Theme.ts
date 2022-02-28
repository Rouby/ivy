import type { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
    muted: "#ddd",
  },
  breakpoints: [
    "40em",
    "@media (min-width: 56em) and (orientation: landscape)",
  ],
  styles: {
    root: {
      fontFamily: "body",
      fontSize: 1,
      fontWeight: "body",
      lineHeight: "1.2",
    },
    a: {
      color: "primary",
    },
  },
};
