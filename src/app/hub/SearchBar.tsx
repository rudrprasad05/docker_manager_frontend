"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { boolean } from "zod";

interface SearchResult {
  name: string;
  description: string;
  starCount: string;
  isOfficial: string;
}

const SearchBar = ({ defaultImages }: { defaultImages: SearchResult[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [images, setImages] = useState<SearchResult[]>(defaultImages);
  const [isLoading, setIsLoading] = useState<{ imageName: string; b: boolean }>(
    { imageName: "0", b: false }
  );

  const handleSearch = async () => {
    router.push("/hub/?search=" + search);
    try {
      const response = await axios.get<SearchResult[]>(
        "http://localhost:8081/docker/images/search",
        {
          params: { search: search },
        }
      );
      console.log(response);
      setImages(response.data);
    } catch (error) {
      console.error("Error searching for images:", error);
    }
  };
  const PullImage = async (imageName: string) => {
    setIsLoading({ imageName, b: true });
    try {
      const response = await axios.get(
        `http://localhost:8081/docker/images/pull?image=${imageName}`
      );
      if (response.status == 200) {
        toast.success("image downloaded");
        setIsLoading({ imageName, b: false });
      }
      console.log(response);
    } catch (error) {
      console.error("Error pulling images:", error);
    }
  };
  return (
    <>
      <div className="w-full flex items-center gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="enter image name"
          className="grow"
        />
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>
      {images?.map((i, index) => (
        <div key={index}>
          {i.name}
          <Button onClick={() => PullImage(i.name)}>
            Pull{" "}
            {isLoading.imageName == i.name && isLoading.b && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </div>
      ))}
    </>
  );
};

export default SearchBar;
