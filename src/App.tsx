import { ThemeProvider } from "theme-ui";
import { theme } from "./Theme";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1
        sx={{
          color: "primary",
          fontFamily: "heading",
        }}
      >
        Hello
      </h1>
    </ThemeProvider>
  );
}
