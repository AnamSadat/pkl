import { ClassNameProps } from "@/types";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/utils";
import { Search } from "lucide-react";

export type InputSearcProps = ClassNameProps & {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
};

export function InputSearch({
  search,
  onSearchChange,
  placeholder,
  className,
}: InputSearcProps) {
  return (
    <div className="relative flex w-full items-center gap-2 md:w-1/3">
      <Search className="h-4 w-4 text-muted-foreground absolute left-3" />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn("h-9 pl-10", className)}
      />
    </div>
  );
}
