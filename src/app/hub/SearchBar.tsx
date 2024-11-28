"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <div className="w-full flex items-center gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="enter image name"
        className="grow"
      />
      <Button>Search</Button>
    </div>
  );
};

export default SearchBar;
