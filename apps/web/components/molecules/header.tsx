import { ClassNameProps } from "@/types";
import { cn } from "@repo/ui/utils";

export type HeaderProps = ClassNameProps & {
  classNameTitle?: string;
  classNameDescription?: string;
  title: string;
  description?: string;
};

export function Header({
  className,
  classNameDescription,
  classNameTitle,
  title,
  description,
}: HeaderProps) {
  return (
    <div className={className}>
      <h1
        className={cn("text-2xl font-semibold tracking-tight", classNameTitle)}
      >
        {title}
      </h1>
      <p className={cn("text-sm text-muted-foreground", classNameDescription)}>
        {description}
      </p>
    </div>
  );
}
