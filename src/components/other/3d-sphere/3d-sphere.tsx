import { cn } from "@/lib/utils";
import "./style.css";

interface ThreeDSphereProps {
   className?: string
}

export const ThreeDSphere = ({className}:ThreeDSphereProps) => {
  const planes = Array.from({ length: 12 }, (_, i) => i);
  const spokes = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className={cn(className,"main-wrapper")}>
      <div className="sphere-wrapper">
        {planes.map((_, planeIndex) => (
          <div className={`plane plane-${planeIndex}`} key={planeIndex}>
            {spokes.map((_, spokeIndex) => (
              <div
                key={spokeIndex}
                className={cn(
                  "bg-red-700 dark:bg-white",
                  ` spoke spoke-${spokeIndex}`
                )}
              >
                <div className="dot bg-purple-700 dark:bg-white"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
