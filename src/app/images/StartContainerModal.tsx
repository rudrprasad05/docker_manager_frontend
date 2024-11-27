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
import {
  CheckIfCMDIsAvailable,
  DeleteImageById,
  PostStartContainer,
} from "../api/images";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useEffect, useLayoutEffect, useState } from "react";
import { Loader2, Lock, Unlock } from "lucide-react";
import Help from "@/components/Help";
import { toast } from "sonner";
import { AxiosError } from "axios";

export type RunContProps = {
  imageName: string;
  containerName: string;
  cmd: string[];
  hostPort: string;
  containerPort: string;
};

export const NewContForm = z.object({
  imageName: z.string(),
  cmd: z.array(z.string()),
  hostPort: z.array(z.string()),
  containerName: z.string(),
  containerPort: z.array(z.string()),
});
export type NewContFormType = z.infer<typeof NewContForm>;

export const StartContainerModal = ({
  children,
  cont,
}: {
  cont: Partial<RunContProps>;
  children: React.ReactNode;
}) => {
  const [cmd, setCMD] = useState<string[]>([]);
  const [port, setPort] = useState<string[]>();
  const [lockCmd, setLockCmd] = useState(false);
  const [lockPort, setLockPort] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewContFormType>({
    resolver: zodResolver(NewContForm),
    defaultValues: {
      imageName: cont.imageName || "",
      cmd: [""],
      hostPort: [""],
      containerName: "",
      containerPort: [""],
    },
  });
  const formData = form.watch();

  const get = async () => {
    if (!cont.imageName) return;
    const res = await CheckIfCMDIsAvailable(cont.imageName);
    setCMD(res.data.cmd);
    setPort(res.data.port);
    setIsInfoLoaded(true);

    form.reset({
      ...cont, // retain current values
      cmd: res.data.cmd || cont.cmd,
      containerPort: res.data.port || cont.containerPort,
      hostPort: res.data.port || cont.containerPort,
    });

    if (res.data.cmd) {
      setLockCmd(true);
    }
    if (res.data.port) {
      setLockPort(true);
    }
  };

  const handleUnlock = (type: "CMD" | "PORT") => {
    switch (type) {
      case "PORT":
        setLockPort((prev) => !prev);
        break;
      case "CMD":
        setLockCmd((prev) => !prev);
        break;
      default:
        break;
    }
  };

  async function onSubmit(data: NewContFormType) {
    setIsLoading(true);
    let dN: RunContProps = {
      imageName: data.imageName,
      cmd: data.cmd,
      hostPort: data.hostPort[0],
      containerName: data.containerName,
      containerPort: data.containerPort[0],
    };

    const res = await PostStartContainer(dN)
      .then((r) => {
        if (r.status == 200) {
          setIsOpen(false);
          setIsLoading(false);

          toast.success("Container started");
        }
      })
      .catch((e) => {
        if (e.response.status == 403) {
          toast.error("Port in use");
          form.reset({
            ...form.watch(),
            hostPort: [""],
          });
        } else {
          toast.error("An error occured");
          console.log(e);
        }
        setIsLoading(false);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => get()}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Container</DialogTitle>
          <DialogDescription>A new container will be created</DialogDescription>
        </DialogHeader>

        {!isInfoLoaded && <>Loading</>}

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
                      <Input autoComplete="off" disabled {...field} />
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
                      <Input
                        autoComplete="off"
                        placeholder="enter name of container"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex items-center">
              <FormField
                control={form.control}
                name="hostPort"
                render={({ field }) => {
                  return (
                    <FormItem className="grow">
                      <div className="flex items-center gap-2">
                        <FormLabel>Host port</FormLabel>
                        <Help text="Port exposed on server" />
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="w-4 text-center h-min mt-auto mb-2">:</div>

              <FormField
                control={form.control}
                name="containerPort"
                render={({ field }) => {
                  return (
                    <FormItem className="grow">
                      <div className="flex items-center gap-2">
                        <FormLabel>Container port</FormLabel>
                        <Help text="Port exposed on docker container" />
                      </div>

                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={lockPort}
                            placeholder="8080"
                            {...field}
                          />
                          <div
                            onClick={() => handleUnlock("PORT")}
                            style={{ transform: "translate(0, -50%)" }}
                            className="w-6 h-6 flex items-center justify-center absolute top-1/2 right-3"
                          >
                            {lockPort && (
                              <Lock className="w-4 h-4 text-muted-foreground/80" />
                            )}
                            {!lockPort && (
                              <Unlock className="w-4 h-4 text-muted-foreground/80" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="cmd"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel>Run Command</FormLabel>
                      <Help text="Command used to run docker contaier" />
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={lockCmd}
                          placeholder="8080"
                          {...field}
                        />
                        <div
                          onClick={() => handleUnlock("CMD")}
                          style={{ transform: "translate(0, -50%)" }}
                          className="w-6 h-6 flex items-center justify-center absolute top-1/2 right-3"
                        >
                          {lockCmd && (
                            <Lock className="w-4 h-4 text-muted-foreground/80" />
                          )}
                          {!lockCmd && (
                            <Unlock className="w-4 h-4 text-muted-foreground/80" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">
              {isLoading && <Loader2 className="animate-spin" />}Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
