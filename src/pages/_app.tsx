import { Toaster } from "@/components/shared/components/sonner";
import Sidebar from "@/components/Sidebar/Sidebar";
import "@/styles/globals.css";
import { CircleCheck, CircleX, Info, Loader2, TriangleAlert } from "lucide-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pagesWithoutSidebar = ['/', '/login', '/register', '/sales'];
  const errorPage = '/_error';

  // Check if the current route should not display the sidebar
  const shouldRenderSidebar = !pagesWithoutSidebar.includes(router.pathname) && router.pathname !== errorPage;

  return (
    <>
      <Toaster
        visibleToasts={3}
        duration={2000}
        theme='dark'
        position='top-center'
        closeButton
        richColors
        icons={{
          success: <CircleCheck />,
          info: <Info />,
          error: <CircleX />,
          warning: <TriangleAlert />,
          loading: <Loader2 className='animate-spin' />,
        }}
      />
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
    </>
  );
}
