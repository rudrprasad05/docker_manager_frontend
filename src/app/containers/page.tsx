import React from "react";
import { GetAllContainers } from "../api/images";
import Error500 from "../images/Error500";
import { handleFormtTime } from "@/lib/utils";
import ContainerCard from "./ContainerCard";

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

const page = async () => {
  let res;
  try {
    res = await GetAllContainers();
  } catch (error) {
    return <Error500 />;
  }
  return (
    <div className="">
      {res.data.map((c: ContainerProps, i: number) => {
        return <ContainerCard r={c} key={i} />;
      })}
    </div>
  );
};

export default page;
