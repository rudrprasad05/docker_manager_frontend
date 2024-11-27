import { Info } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Help = ({ text }: { text: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-4 h-4">
          <Info className="w-4 h-4 text-muted-foreground/70" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Help;
