import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="w-24 h-24 animate-spin" />
    </div>
  );
};

export default loading;
