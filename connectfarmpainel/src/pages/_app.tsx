import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pagesWithoutSidebar = ['/', '/login'];

  const shouldRenderSidebar = !pagesWithoutSidebar.includes(router.pathname);

  return (
    <div className="flex bg-white">
      {shouldRenderSidebar && <Sidebar />}
      <div className="w-full h-screen"
      style={{
        scrollbarWidth: 'thin',  // For Firefox
        scrollbarColor: '#A2CE9B #2a2a2a',  // For Firefox
      }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
