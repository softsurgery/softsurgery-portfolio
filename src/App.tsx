import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { PublicRoute } from "./pages/public/page";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <PublicRoute />,
      },
      {
        path: "/login",
        element: <div>login!</div>,
      },
      {
        path: "/double",
        element: (
          <div>
            <div>DOUBLED!</div>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "login",
            element: <div>login double!</div>,
          },
        ],
      },
      {
        path: "*",
        element: <div>{window.location.href}</div>,
      },
    ],
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen justify-center items-center">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
