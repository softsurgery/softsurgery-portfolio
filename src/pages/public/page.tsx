import { api } from "@/api";
import { ThreeDSphere } from "@/components/other/3d-sphere/3d-sphere";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";

interface HomePageProps {
  className?: string;
}

export function HomePage({ className }: HomePageProps) {
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
    <div className={cn(className)}>
      <div>
        <ThreeDSphere className="my-10"/>
        <h1 className="text-[0.8rem] sm:text-[1rem] md:text-[1.7rem] lg:text-[2.5em] font-black text-center">
          Hi, I'm {portfolio_owner?.value} 👋
        </h1>

        <h1 className="text-[0.4rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1em] font-bold py-2 text-center">{owner_description?.value}.</h1>
      </div>
      Houssem
    </div>
  );
}
