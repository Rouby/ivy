import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { Themed, ThemeProvider } from "theme-ui";
import { theme } from "./Theme";

const client = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Themed.root
          sx={{ maxWidth: [380, 720], marginX: "auto", paddingX: 3 }}
        >
          <Outlet />
        </Themed.root>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
