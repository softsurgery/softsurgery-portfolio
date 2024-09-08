import { api } from "@/api";
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
        <h1 className="text-[3rem] font-black">
          Hi, I'm {portfolio_owner?.value} 👋
        </h1>

        {owner_description?.value.split(".").map((phrase) => {
          return (
            phrase && (
              <h1 className="text-[1.2rem] font-bold py-2">{phrase}.</h1>
            )
          );
        })}
      </div>
      <div className="mt-10">
        <h1 className="text-[2rem] font-black">About :</h1>
        {`My fascination with computers began early, drawn to both the hardware
        and software that power our world. That connection between systems has
        always inspired me, and building web applications and software now
        brings me an enduring sense of fulfillment. In 2020, I proudly earned my
        baccalaureate in math, a subject that continues to captivate me, and
        soon after, I began my journey in software engineering. In college, my
        focus shifted toward crafting efficient, reusable code, ensuring the
        systems I build can scale seamlessly. My love for math remains a
        constant, fueling my approach to problem-solving and innovation.
        Alongside my studies, I began tutoring students in IT and math, sharing
        my knowledge and helping others conquer the same challenges. Now, as an
        active developer, I’m driven to push boundaries, create impactful
        solutions, and leave my mark on the digital world`
          .split(".")
          .map((phrase) => {
            return (
              phrase && (
                <h1 className="text-[1.2rem] font-bold py-2">{phrase}.</h1>
              )
            );
          })}
      </div>
    </div>
  );
}
