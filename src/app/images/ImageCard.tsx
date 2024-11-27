import React from "react";
import { ContainerProps } from "../api/images";
import { EllipsisVertical, Play, Trash2 } from "lucide-react";
import Seperator from "../components/global/Seperator";
import { DeleteImageButton } from "./DeleteImageModal";
import { StartContainerModal } from "./StartContainerModal";
import { handleFormtTime } from "@/lib/utils";

const ImageCard = ({ r }: { r: ContainerProps }) => {
  let size = (Math.round(r.Size) / 1_000_000).toFixed(2);
  let lowestTime = handleFormtTime(r.Created);
  return (
    <div className="grid grid-cols-6 my-2 border border-slate-800/80 rounded-lg px-4 py-3">
      <div className="col-span-2">{r.RepoTags[0].split(":")[0]}</div>
      <div>{r.RepoTags[0].split(":")[1]}</div>
      <div className="">{size} MB</div>
      <div className="">{lowestTime}</div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-4">
          <StartContainerModal cont={{ imageName: r.RepoTags[0] }}>
            <Play className="w-4 h-4" />
          </StartContainerModal>
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
