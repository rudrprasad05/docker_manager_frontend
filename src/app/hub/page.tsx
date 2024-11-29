import { handleFormtTime } from "@/lib/utils";
import React from "react";

import { GetAllContainers } from "../api/images";
import Error500 from "../images/Error500";
import SearchBar from "./SearchBar";
import axios from "axios";

interface Port {
  IP?: string; // Optional field (omitempty in Go)
  PrivatePort: number; // Required field
  PublicPort?: number; // Optional field (omitempty in Go)
  Type: string; // Required field
}

export interface ContainerProps {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Port[]; // Define the Port interface if needed
  SizeRw?: number;
  SizeRootFs?: number;
  Labels: Record<string, string>;
  State: string;
  Status: string;
  HostConfig: {
    NetworkMode?: string;
    Annotations?: Record<string, string>;
  };
  NetworkSettings?: any; // Replace `any` with the appropriate type if available
}

interface SearchResult {
  name: string;
  description: string;
  starCount: string;
  isOfficial: string;
}

const page = async () => {
  const response = await axios.get<SearchResult[]>(
    "http://localhost:8081/docker/images/search"
  );
  return (
    <div className="">
      <SearchBar defaultImages={response.data} />
    </div>
  );
};

export default page;
