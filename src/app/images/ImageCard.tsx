import React from "react";
import { ContainerProps } from "../api/images";
import { EllipsisVertical, Play, Trash2 } from "lucide-react";
import Seperator from "../components/global/Seperator";
import { DeleteImageButton } from "./DeleteImageModal";

const ImageCard = ({
  size,
  lowestTime,
  r,
}: {
  r: ContainerProps;
  size: string;
  lowestTime: string;
}) => {
  return (
    <div className="grid grid-cols-6 my-2 border border-slate-800/80 rounded-lg px-4 py-3">
      <div className="col-span-2">{r.RepoTags[0].split(":")[0]}</div>
      <div>{r.RepoTags[0].split(":")[1]}</div>
      <div className="">{size} MB</div>
      <div className="">{lowestTime}</div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-4">
          <Play className="w-4 h-4" />
          <EllipsisVertical className="w-4 h-4" />
        </div>
        <div className="flex items-center">
          <Seperator />
          <DeleteImageButton id={r.Id}>
            <Trash2 className="w-4 h-4" />
          </DeleteImageButton>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
