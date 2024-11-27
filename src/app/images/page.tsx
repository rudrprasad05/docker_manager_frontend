"use server";

import React from "react";
import { ContainerProps, GetAllImages } from "../api/images";
import { DotSquare, EllipsisVertical, Play, Trash2 } from "lucide-react";
import Seperator from "../components/global/Seperator";
import ImageCard from "./ImageCard";
import { handleFormtTime } from "@/lib/utils";
import Error500 from "./Error500";
import Head from "next/head";

const page = async () => {
  let res;
  try {
    res = await GetAllImages();
  } catch (error) {
    return <Error500 />;
  }

  return (
    <div className="">
      {res.data.map((r: ContainerProps, i: number) => {
        return <ImageCard r={r} />;
      })}
    </div>
  );
};

export default page;
