"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Error500 = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <div>
      <p>
        Error 500. The Server is offline. Make sure you have the correct API
        endpoint, docker is running on your server and the correct image is
        working
      </p>

      <Button variant={"secondary"} onClick={handleRefresh}>
        <RefreshCw />
        Refresh
      </Button>
    </div>
  );
};

export default Error500;
