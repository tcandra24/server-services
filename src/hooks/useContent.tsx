import { useQuery } from "react-query";
import api from "@/src/services/api";

export interface CPU {
  percent: number;
  cores: number;
}

export interface RAM {
  total: string;
  used: string;
  free: string;
  percent: number;
}

export interface OS {
  platform: string;
  release: string;
  type: string;
}

export interface Content {
  cpu: CPU;
  ram: RAM;
  uptime: string;
  os: OS;
}

export const useContent = () => {
  return useQuery<Content, Error>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await api.get("/system-info");
      return response.data;
    },
  });
};
