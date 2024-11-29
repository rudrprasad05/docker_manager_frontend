import axios from "axios";

const API = "http://localhost:8081/docker";

export const GetSearchImages = async (search: string) => {
  const res = await axios.get(API + "/images/search", {
    params: { search: search },
  });

  return res;
};
