import { Cuboid, LucideDock } from "lucide-react";
import React from "react";
import { DockerSvg } from "./svg";
import Link from "next/link";
import { Image } from "lucide-react";

const SideNav = () => {
  return (
    <div className="w-[300px] h-screen border-r border-solid border-gray-800 sticky top-0">
      <div className="px-8 py-6">
        <div className="flex gap-4 items-center">
          <div>
            <DockerSvg className="w-8 h-8" />
          </div>
          <div className="text-xl uppercase font-bold">Docker Demon</div>
        </div>
        <div className="my-6 flex flex-col gap-4">
          <Link href={"/images"} className="flex items-center gap-4">
            <Image />
            Images
          </Link>
          <Link href={"/containers"} className="flex items-center gap-4">
            <Cuboid />
            Container
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
