"use client";

import { Cuboid, LucideDock, ShoppingCart } from "lucide-react";
import React from "react";
import { DockerSvg } from "./svg";
import Link from "next/link";
import { Image } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const paths = [
  {
    slug: "/images",
    name: "Images",
    icon: <Image />,
  },
  {
    slug: "/containers",
    name: "Containers",
    icon: <Cuboid />,
  },
  {
    slug: "/hub",
    name: "Hub",
    icon: <ShoppingCart />,
  },
];

const SideNav = () => {
  const pathname = usePathname();

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
          {paths.map((l) => (
            <Link
              href={l.slug}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary transition",
                l.slug == pathname ? "bg-secondary" : "bg-transparent"
              )}
            >
              {l.icon}
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
