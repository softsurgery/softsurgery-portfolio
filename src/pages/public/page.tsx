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
  // Fetch both portfolio_owner and owner_description in one API call
  const {
    data: configData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["app_config"],
    queryFn: () => api.appConfig.get(["portfolio_owner", "owner_description"]),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const portfolio_owner = configData?.find(
    (config) => config.key === "portfolio_owner"
  );
  const owner_description = configData?.find(
    (config) => config.key === "owner_description"
  );

  return (
    <div
      className={cn(
        "min-h-screen max-h-screen bg-background mx-auto py-12 mb-10",
        "px-10 sm:px-72 md:px-64 lg:px-52 xl:px-40 2xl:px-8",
        className
      )}
    >
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider delayDuration={0}>
          <h1 className="text-[3rem] font-black">
            Hi, I'm {portfolio_owner?.value} 👋
          </h1>

          {owner_description?.value.split(".").map((phrase) => {
           return  phrase && <h1 className="text-[1.2rem] font-bold text-justify py-2">{phrase}.</h1>;
          })}

          <Navbar />
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}
