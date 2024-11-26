import axios from "axios";

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

export const GetAllImages = async () => {
  const res = await axios.get(API + "/images/list").then((r) => {
    return r;
  });
  return res;
};
