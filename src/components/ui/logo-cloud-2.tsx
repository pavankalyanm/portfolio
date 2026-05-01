import type { ReactNode } from "react";
import {
  PlusIcon,
  Database,
  Sparkles,
  Brain,
  Wand,
  ClipboardList,
  Network,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  src?: string;
  icon?: ReactNode;
};

const skills: Skill[] = [
  { name: "React", src: "https://svgl.app/library/react_dark.svg" },
  { name: "JavaScript", src: "https://svgl.app/library/javascript.svg" },
  { name: "Node.js", src: "https://svgl.app/library/nodejs.svg" },
  { name: "Java", src: "https://svgl.app/library/java.svg" },
  { name: "SQL", icon: <Database className="h-full w-full" strokeWidth={1.6} /> },
  { name: "AWS", src: "https://svgl.app/library/aws_light.svg" },
  { name: "GCP", src: "https://svgl.app/library/google-cloud.svg" },
  { name: "Azure", src: "https://svgl.app/library/azure.svg" },
  { name: "LLM", icon: <Sparkles className="h-full w-full" strokeWidth={1.6} /> },
  { name: "Gen AI", icon: <Brain className="h-full w-full" strokeWidth={1.6} /> },
  { name: "Claude", src: "https://svgl.app/library/claude-ai-icon.svg" },
  {
    name: "Prompt Eng.",
    icon: <Wand className="h-full w-full" strokeWidth={1.6} />,
  },
  { name: "Apache", icon: <Server className="h-full w-full" strokeWidth={1.6} /> },
  { name: "Kafka", src: "https://svgl.app/library/apache-kafka-light.svg" },
  { name: "MongoDB", src: "https://svgl.app/library/mongodb-icon-dark.svg" },
  { name: "Docker", src: "https://svgl.app/library/docker.svg" },
  { name: "Kubernetes", src: "https://svgl.app/library/kubernetes.svg" },
  { name: "GitHub", src: "https://svgl.app/library/github_light.svg" },
  { name: "HTML5", src: "https://svgl.app/library/html5.svg" },
  { name: "Notion", src: "https://svgl.app/library/notion.svg" },
  {
    name: "Product Mgmt.",
    icon: <ClipboardList className="h-full w-full" strokeWidth={1.6} />,
  },
  {
    name: "System Design",
    icon: <Network className="h-full w-full" strokeWidth={1.6} />,
  },
];

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-rows-2 grid-flow-col auto-cols-[140px] h-full",
        className
      )}
      {...props}
    >
      {skills.map((s, i) => {
        const col = Math.floor(i / 2);
        const row = i % 2;
        // Checkerboard-ish tint like the original LogoCard design
        const alt = (col + row) % 2 === 1;
        // PlusIcon decorator drops at intersection corners every 2 columns
        const showPlus = col > 0 && col % 2 === 0 && row === 0;
        return (
          <div
            key={`${s.name}-${i}`}
            className={cn(
              "relative flex items-center justify-center gap-2 px-3 border-r select-none whitespace-nowrap",
              col === 0 && "border-l",
              row === 0 && "border-b",
              alt
                ? "bg-secondary dark:bg-secondary/30"
                : "bg-background"
            )}
          >
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[#1d1d1f]">
              {s.icon ? (
                s.icon
              ) : (
                <img
                  alt={s.name}
                  src={s.src}
                  className="pointer-events-none h-full w-full object-contain select-none"
                />
              )}
            </span>
            <span className="text-[11.5px] font-medium text-[#1d1d1f] tracking-[-0.005em]">
              {s.name}
            </span>
            {showPlus && (
              <PlusIcon
                className="-left-[8px] -top-[8px] absolute z-10 size-4 text-[#c7c7cc]"
                strokeWidth={1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
