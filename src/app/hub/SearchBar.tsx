"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    router.push("/hub/?search=" + search);
  };
  return (
    <div className="w-full flex items-center gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="enter image name"
        className="grow"
      />
      <Button onClick={() => handleSearch()}>Search</Button>
    </div>
  );
};

export default SearchBar;
