import { api } from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";
import { Header } from "@/components/layout/public/Header";
import avatar from "/avatar.jpg";
import { Paragraph } from "@/types/common";
import { AboutMe } from "@/components/layout/public/AboutMe";

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
    queryFn: () =>
      api.appConfig.get(["portfolio_owner", "owner_description", "about"]),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const portfolioOwner = JSON.parse(
    configData?.find((config) => config.key === "portfolio_owner")?.value || ""
  )?.portfolio_owner as string;

  const avatarFallback = portfolioOwner
    ?.split(" ")
    .map((word) => word[0])
    .join("");

  const ownerDescription = JSON.parse(
    configData?.find((config) => config.key === "owner_description")?.value ||
      ""
  )?.owner_description as string;

  const aboutMeParagraphs = JSON.parse(
    configData?.find((config) => config.key === "about")?.value || ""
  ) as Paragraph[];


  return (
    <div className={cn(className, "container")}>
      {/* Header Section */}

      <Header
        avatar={avatar}
        avatarFallback={avatarFallback}
        portfolioOwner={portfolioOwner}
        ownerDescription={ownerDescription}
      />

      <AboutMe aboutMeParagraphs={aboutMeParagraphs} />
      {/* Carousel Section */}
      <div className="my-20 mx-14">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
