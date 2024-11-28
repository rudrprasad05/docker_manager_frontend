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
import { DeleteContainerById } from "../api/images";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteContainerModal = ({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    const res = await DeleteContainerById(id)
      .then((r) => {
        if (r.status == 200) {
          toast.success("Container deleted");
        }
        setIsOpen(false);
        router.refresh();
      })
      .catch((e) => {
        if (e.response.status == 500) {
          toast.error("Error occured on server");
        } else {
          toast.error("An error occured");
          console.log(e);
        }
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Container</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Container?
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => handleDelete()}>Delete</Button>
        <Button variant={"secondary"}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};
