import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Paragraph } from "@/types/common";

interface AboutMeProps {
  className?: string;
  aboutMeParagraphs: Paragraph[];
}
export const AboutMe = ({ className,aboutMeParagraphs }: AboutMeProps) => {
  return (
    <div className={cn(className, "my-2 p-5 rounded-xl mx-0 lg:mx-20")}>
      <h1 className="text-[1.3rem] sm:text-[1.6rem] md:text-[1.8rem] lg:text-[2em] font-extrabold">
        About Me
      </h1>
      <div className="flex flex-col gap-4 text-justify mt-4  ">
        {aboutMeParagraphs.map((p) => {
          return <Label className="leading-5 text-lg">{p.text}</Label>;
        })}
      </div>
    </div>
  );
};
