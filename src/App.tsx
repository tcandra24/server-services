import { ArrowRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { capitalize } from "@titocandradev/neatcore";

import { useContent, Content } from "./hooks/useContent";

type ServiceColor = "cyan" | "magenta" | "purple";

interface ServiceItem {
  name: string;
  port: string;
  color: ServiceColor;
  link: string;
}

const services: ServiceItem[] = [
  { name: "n8n Automation", port: "8765", color: "cyan", link: "http://103.56.149.18:8765" },
  { name: "Coolify", port: "8000", color: "magenta", link: "http://103.56.149.18:8000" },
  { name: "Uptime Kuma", port: "3001", color: "purple", link: "http://103.56.149.18:3001" },
  { name: "9Router", port: "20128", color: "cyan", link: "http://103.56.149.18:20128" },
];

const getColorStyles = (color: ServiceColor, isDark: boolean) => {
  if (color === "cyan") {
    return {
      border: isDark ? "border-[#00f3ff]/60 hover:border-[#00f3ff]" : "border-sky-200 hover:border-sky-400",
      shadow: isDark ? "shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]" : "shadow-sm hover:shadow-md hover:shadow-sky-100",
      titleHover: isDark ? "group-hover:text-[#00f3ff]" : "group-hover:text-sky-600",
      portHover: isDark ? "group-hover:text-[#00f3ff]/80" : "group-hover:text-sky-600/80",
      openWrapper: isDark ? "text-[#00f3ff]/70 group-hover:text-[#00f3ff] group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" : "text-sky-500 group-hover:text-sky-600",
    };
  }
  if (color === "magenta") {
    return {
      border: isDark ? "border-[#ff00ff]/60 hover:border-[#ff00ff]" : "border-pink-200 hover:border-pink-400",
      shadow: isDark ? "shadow-[0_0_10px_rgba(255,0,255,0.1)] hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]" : "shadow-sm hover:shadow-md hover:shadow-pink-100",
      titleHover: isDark ? "group-hover:text-[#ff00ff]" : "group-hover:text-pink-600",
      portHover: isDark ? "group-hover:text-[#ff00ff]/80" : "group-hover:text-pink-600/80",
      openWrapper: isDark ? "text-[#ff00ff]/70 group-hover:text-[#ff00ff] group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]" : "text-pink-500 group-hover:text-pink-600",
    };
  }
  if (color === "purple") {
    return {
      border: isDark ? "border-[#b200ff]/60 hover:border-[#b200ff]" : "border-purple-200 hover:border-purple-400",
      shadow: isDark ? "shadow-[0_0_10px_rgba(178,0,255,0.1)] hover:shadow-[0_0_20px_rgba(178,0,255,0.4)]" : "shadow-sm hover:shadow-md hover:shadow-purple-100",
      titleHover: isDark ? "group-hover:text-[#b200ff]" : "group-hover:text-purple-600",
      portHover: isDark ? "group-hover:text-[#b200ff]/80" : "group-hover:text-purple-600/80",
      openWrapper: isDark ? "text-[#b200ff]/70 group-hover:text-[#b200ff] group-hover:drop-shadow-[0_0_8px_rgba(178,0,255,0.8)]" : "text-purple-500 group-hover:text-purple-600",
    };
  }

  return { border: "", shadow: "", titleHover: "", portHover: "", openWrapper: "" };
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const { data, isLoading, isFetching } = useContent();

  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="A dashboard to access server services." />
        <title>Niflheim Server</title>
      </Helmet>
      <div className={`min-h-screen w-full transition-colors duration-300 ${isDark ? "bg-[#05050a] text-white selection:bg-[#00f3ff] selection:text-black" : "bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-black"}`}>
        <div className="flex w-full justify-center py-10">
          <main className="w-full max-w-200 px-6">
            {/* Header */}
            <div className={`mb-10 rounded-xl flex items-center justify-between border-b p-3 transition-colors ${isDark ? "border-[#00f3ff]/30 shadow-[0_1px_15px_-3px_rgba(0,243,255,0.2)]" : "border-slate-200"}`}>
              <div className="flex items-baseline gap-4">
                <h1 className={`text-xl font-semibold leading-10 tracking-[-0.02em] ${isDark ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-slate-900"}`}>Services</h1>
                <span className={`font-mono text-[13px] ${isDark ? "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" : "font-semibold text-sky-600"}`}>
                  {isLoading && isFetching ? "-" : `${capitalize(data.os.platform)} ${data.os.release}`}
                </span>
              </div>
              <button onClick={() => setIsDark(!isDark)} aria-label="Toggle Dark Mode" className={`rounded-md p-2 transition-colors ${isDark ? " text-white hover:bg-white/20" : " text-gray-700 hover:bg-gray-300"}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Stats Row */}
            <div
              className={`mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4 backdrop-blur-sm transition-colors ${isDark ? "border-[#00f3ff]/50 bg-black/60 shadow-[0_0_15px_rgba(0,243,255,0.15)]" : "border-slate-200 bg-white shadow-sm"}`}
            >
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" : "text-slate-500"}`}>IP Address</span>
                <span className={`font-mono text-[14px] ${isDark ? "text-white" : "font-medium text-slate-900"}`}>103.56.149.18</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" : "text-slate-500"}`}>Uptime</span>
                <span className={`font-mono text-[14px] ${isDark ? "text-white" : "font-medium text-slate-900"}`}>{data?.uptime ?? "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" : "text-slate-500"}`}>CPU Usage</span>
                <span className={`font-mono text-[14px] ${isDark ? "text-white" : "font-medium text-slate-900"}`}>{data?.cpu.percent ?? "-"}</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-bold uppercase tracking-wider ${isDark ? "text-[#00f3ff] drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" : "text-slate-500"}`}>RAM Usage</span>
                <span className={`font-mono text-[14px] ${isDark ? "text-white" : "font-medium text-slate-900"}`}>
                  {data?.ram.used ?? "-"} / {data?.ram.total ?? "-"} ({data?.ram.percent ?? "-"} %)
                </span>
              </div>
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-2">
              {services.map((service) => {
                const style = getColorStyles(service.color, isDark);
                return (
                  <a
                    key={service.name}
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-lg border p-4 backdrop-blur-sm transition-all duration-300 ${style.border} ${style.shadow} ${isDark ? "bg-black/40" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(16,185,129,1)]" style={{ backgroundColor: "#10B981" }} title="Running" />
                      <h2 className={`text-[18px] font-semibold transition-colors ${style.titleHover} ${isDark ? "text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" : "text-slate-900"}`}>{service.name}</h2>
                      <span className={`ml-2 font-mono text-[13px] transition-colors ${style.portHover} ${isDark ? "text-gray-400" : "text-slate-500"}`}>port: {service.port}</span>
                    </div>
                    <div className={`flex items-center gap-1 transition-all ${style.openWrapper}`}>
                      <span className="text-[14px] font-bold">Open</span>
                      <ArrowRight size={18} />
                    </div>
                  </a>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
