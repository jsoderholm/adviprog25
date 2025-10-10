import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { model } from "./model";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    model,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
