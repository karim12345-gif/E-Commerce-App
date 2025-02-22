import { Loader2 } from "lucide-react";
import { Button } from "~/src/components/ui/buttons/button";

interface ButtonLoadingProps {
  text?: string;
  className?: string;
}

export function ButtonLoading({ text = "Please wait", className }: ButtonLoadingProps) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <Button disabled className={className}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </Button>
    </div>
  );
}