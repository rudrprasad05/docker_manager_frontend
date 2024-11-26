"use client";

import Image from "next/image";
import { permanentRedirect, useRouter } from "next/navigation";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  permanentRedirect("/images");
}
