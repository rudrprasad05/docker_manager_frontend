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

export const DeleteImageButton = ({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const handleDelete = async () => {
    const res = await DeleteImageById(id).then((r) => console.log(r));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Image</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this image?
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => handleDelete()}>Delete</Button>
        <Button>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};
