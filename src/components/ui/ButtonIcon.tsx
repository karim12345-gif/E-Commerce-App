import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface ButtonIconLeftProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export function ButtonIconLeft({ 
  onClick, 
  className ="mb-6",
  variant = "outline",
  ...props 
}: ButtonIconLeftProps) {
  return (
    <Button 
      variant={variant}
      size="icon" 
      onClick={onClick}
      className={className}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}