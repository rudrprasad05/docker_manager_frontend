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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeleteImageById } from "../api/images";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

type RunContProps = {
  imageName: string;
  containerName: string;
  cmd: string[];
  hostPort: string;
  containerPort: string;
};

export const NewContForm = z.object({
  imageName: z.string(),
  cmd: z.string(),
  hostPort: z.string(),
  containerName: z.string(),
  containerPort: z.string(),
});
export type NewContFormType = z.infer<typeof NewContForm>;

export const StartContainerModal = ({
  children,
  cont,
}: {
  cont: Partial<RunContProps>;
  children: React.ReactNode;
}) => {
  const form = useForm<NewContFormType>({
    resolver: zodResolver(NewContForm),
    defaultValues: {
      imageName: cont.imageName || "",
      cmd: "",
      hostPort: "",
      containerPort: "",
    },
  });

  async function onSubmit(data: NewContFormType) {}

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="imageName"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Image Name</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="containerName"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Container Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter name of container" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="hostPort"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Host port</FormLabel>
                    <FormControl>
                      <Input placeholder="8080" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="containerPort"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Container port</FormLabel>
                    <FormControl>
                      <Input placeholder="8080" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="cmd"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Run Command</FormLabel>
                    <FormControl>
                      <Input placeholder="8080" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
