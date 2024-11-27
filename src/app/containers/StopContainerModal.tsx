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
import { DeleteImageById, StopContainerById } from "../api/images";
import { useState } from "react";
import { toast } from "sonner";

const StopContainerModal = ({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    const res = await StopContainerById(id).then((r) => {
      setIsOpen(false);
      toast.success("Container Closed");
      console.log(r);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stop Container</DialogTitle>
          <DialogDescription>
            Are you sure you want to Stop this Container?
          </DialogDescription>
        </DialogHeader>

        <Button onClick={() => handleDelete()}>Stop</Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};

export default StopContainerModal;
