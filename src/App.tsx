import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicRoute } from "./pages/public/page";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
    },
    {
      path: "*",
      element: <div>{window.location.href}</div>,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
