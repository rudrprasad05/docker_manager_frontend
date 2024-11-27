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
import {
  DeleteImageById,
  PostStartExistingContainer,
  StopContainerById,
} from "../api/images";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type RunContProps = {
  imageName: string;
  containerName: string;
  cmd: string[];
  hostPort: string;
  containerPort: string;
};

const StartContainerModal = ({
  children,
  id,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const res = await PostStartExistingContainer(id).then((r) => {
      setIsOpen(false);
      toast.success("Container Started");
      router.refresh();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Container</DialogTitle>
          <DialogDescription>
            Are you sure you want to start this Container?
          </DialogDescription>
        </DialogHeader>

        <Button variant={"default"} onClick={() => handleDelete()}>
          Start
        </Button>
        <Button variant={"secondary"} onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default StartContainerModal;
