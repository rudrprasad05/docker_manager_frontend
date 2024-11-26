"use server";

import React from "react";
import { ContainerProps, GetAllImages } from "../api/images";
import { DotSquare, EllipsisVertical, Play, Trash2 } from "lucide-react";
import Seperator from "../components/global/Seperator";
import ImageCard from "./ImageCard";
import { handleFormtTime } from "@/utils/libs";

const page = async () => {
  const res = await GetAllImages();
  return (
    <div className="">
      {res.data.map((r: ContainerProps, i: number) => {
        let size = (Math.round(r.Size) / 1_000_000).toFixed(2);
        let lowestTime = handleFormtTime(r.Created);
        return <ImageCard r={r} size={size} lowestTime={lowestTime} key={i} />;
      })}
    </div>
  );
};

export default page;
