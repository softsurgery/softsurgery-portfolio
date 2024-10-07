import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/public/page";
import { cn } from "./lib/utils";
import { TooltipProvider } from "./components/ui/tooltip";
import Navbar from "./components/layout/public/Navbar";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  
    {
      path: "*",
      element: <div>{window.location.href}</div>,
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div
          className={cn(
            "min-h-screen bg-background font-sans mx-auto py-5 md:px-10 lg:px-20"
          )}
        >
          <TooltipProvider delayDuration={0}>
            <RouterProvider router={router} />
            <Navbar />
          </TooltipProvider>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
