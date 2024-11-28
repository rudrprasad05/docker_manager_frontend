import React from "react";

import { EllipsisVertical, Play, Square, Trash2 } from "lucide-react";
import Seperator from "../components/global/Seperator";
import { ContainerProps } from "./page";
import { handleFormtTime } from "@/lib/utils";
import clsx from "clsx";
import StopContainerModal from "./StopContainerModal";
import StartContainerModal from "./StartContainerModal";
import { DeleteContainerModal } from "./DeleteContainerModal";

const ContainerCard = ({ r }: { r: ContainerProps }) => {
  let size = (Math.round(r.SizeRw || 1_000_000) / 1_000_000).toFixed(2);
  let lowestTime = handleFormtTime(r.Created);
  let status = r.Status;
  let isRunning = false;

  if (status.toLowerCase().includes("up")) {
    isRunning = true;
  }
  console.log(r.Ports);
  return (
    <div className="grid grid-cols-7 my-2 border border-slate-800/80 rounded-lg px-4 py-3">
      <div className="col-span-2">{r.Image}</div>
      <div>
        {r.Names.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </div>
      <div>
        {r.Ports.map((p) => (
          <div>
            {p.PrivatePort}:{p.PublicPort}
          </div>
        ))}
      </div>

      <div className="">{lowestTime}</div>

      <div className={clsx(isRunning ? "text-green-500" : "text-rose-400")}>
        {r.Status}
      </div>

      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-4">
          {isRunning && (
            <StopContainerModal id={r.Id}>
              <Square className="w-4 h-4" />
            </StopContainerModal>
          )}
          {!isRunning && (
            <StartContainerModal id={r.Id}>
              <Play className="w-4 h-4" />
            </StartContainerModal>
          )}
          <DeleteContainerModal id={r.Id}>
            <Trash2 className="w-4 h-4" />
          </DeleteContainerModal>
        </div>
      </div>
    </div>
  );
};

export default ContainerCard;
