import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface HeaderProps {
  className?: string;
  avatar?: string;
  avatarFallback?: string;
  portfolioOwner?: string;
  ownerDescription?: string;
}
export const Header = ({
  className,
  avatar,
  avatarFallback,
  portfolioOwner,
  ownerDescription,
}: HeaderProps) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10 mx-0 lg:mx-20"
      )}
    >
      {/* Avatar */}
      <Avatar className="h-auto w-[75px] sm:w-[100px] md:w-[125px] lg:w-[150px]">
        <AvatarImage src={avatar} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      {/* Text Section */}
      <div className="w-full lg:w-5/6 text-center lg:text-left">
        <h1 className="text-[1.3rem] sm:text-[1.6rem] md:text-[1.8rem] lg:text-[2em] font-extrabold">
          Hi, I'm {portfolioOwner} 👋
        </h1>
        <TypingAnimation
          className="text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] py-2 font-normal text-black dark:text-white"
          text={ownerDescription || ""}
          duration={20}
        />
      </div>
    </div>
  );
};
