import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pagesWithoutSidebar = ['/'];

  const shouldRenderSidebar = !pagesWithoutSidebar.includes(router.pathname);

  return (
    <div className="flex w-screen bg-white">
    {shouldRenderSidebar && <Sidebar />}
      <div className="w-full h-screen">
          <Component {...pageProps} />
      </div>
    </div>
  )
}