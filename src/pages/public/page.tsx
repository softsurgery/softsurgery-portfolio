import { api } from "@/api";
import Navbar from "@/components/layout/public/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";

interface PublicRouteProps {
  className?: string;
}

export function PublicRoute({ className }: PublicRouteProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["appConfig"],
    queryFn: () => api.appConfig.get("portfolio_owner"),
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
        className
      )}
    >
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider delayDuration={0}>
          <h1 className="text-md">Hi I'm {data?.value} 👋</h1>
          <Navbar />
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}
