"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteImageById } from "../api/images";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeleteImageButton = ({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await DeleteImageById(id);
      if (res.status == 200) {
        toast.success("Image deleted");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Image</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this image?
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => handleDelete()}>Delete</Button>
        <Button variant={"secondary"}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};
