import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "theme-ui";
import { theme } from "./Theme";

const client = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
