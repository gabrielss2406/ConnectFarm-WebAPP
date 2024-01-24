import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex w-screen bg-white">
      <Sidebar />
      <div className="w-full h-screen">
          <Component {...pageProps} />
      </div>
    </div>
  )
}