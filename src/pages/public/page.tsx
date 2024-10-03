import { api } from "@/api";
import { ThreeDSphere } from "@/components/other/3d-sphere/3d-sphere";
import { TypingAnimation } from "@/components/ui/typing-animation";
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
      <ThreeDSphere className="my-10" />
      <h1 className="text-[1.4rem] sm:text-[1.7rem] md:text-[1.9rem] lg:text-[2em] font-extrabold text-center">
      Hi, I'm {portfolio_owner?.value} 👋
      </h1>
        <TypingAnimation
          className="text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4em] py-2 font-normal text-black dark:text-white"
          text={owner_description?.value || ""}
          duration={40}
        />
    </div>
  );
}
