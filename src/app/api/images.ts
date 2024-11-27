import axios from "axios";
import { RunContProps } from "../images/StartContainerModal";

const API = "http://localhost:8081/docker";

export type ContainerProps = {
  Containers: number; // `json:"Containers"`
  Created: number; // `json:"Created"`
  Id: string; // `json:"Id"`
  Labels: string[]; // `json:"Labels"`
  ParentId: string; // `json:"ParentId"`
  RepoDigests: string[]; //`json:"RepoDigests"`
  RepoTags: string[]; // `json:"RepoTags"`
  SharedSize: number; // `json:"SharedSize"`
  Size: number; // `json:"Size"`
  VirtualSize: number; //`json:"VirtualSize,omitempty"`
};

interface CmdPort {
  cmd: string[];
  port: string[];
}

export const GetAllImages = async () => {
  const res = await axios
    .get(API + "/images/list")
    .then((r) => {
      return r;
    })
    .catch((e) => {
      throw new Error(e);
    });
  return res;
};

export const GetAllContainers = async () => {
  const res = await axios
    .get(API + "/container/list")
    .then((r) => {
      return r;
    })
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });
  return res;
};

export const DeleteImageById = async (id: string) => {
  const res = await axios
    .delete(API + "/images/delete", { params: { id } })
    .then((r) => {
      console.log(r);
    });

  return res;
};

export const StopContainerById = async (id: string) => {
  const res = await axios
    .post(API + "/container/stop", { id: id })
    .then((r) => {
      console.log(r);
    });

  return res;
};

export const PostStartExistingContainer = async (id: string) => {
  const res = await axios.post(API + "/container/run-existing", { id: id });
  console.log(res);
  return res;
};

export const CheckIfCMDIsAvailable = async (image: string) => {
  const res = await axios.get<CmdPort>(API + "/images/cmd/status", {
    params: { image },
  });
  return res;
};

export const PostStartContainer = async (image: RunContProps) => {
  const res = await axios.post(API + "/container/run", image);
  return res;
};
