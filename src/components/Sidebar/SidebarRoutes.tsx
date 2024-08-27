import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface SidebarRoutesProps {
  icon: any;
  pageName: string;
  routeName: string;
}

export const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ icon: RouteIcon, pageName, routeName }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={routeName}
      className={`flex justify-start items-center w-4/5 h-8 px-2 py-4 gap-2
        text-[#8E8D8D] text-[10pt] font-bold hover:bg-[#4D4D4D] hover:rounded hover:text-[#E4E2E2]
        ${router.pathname === routeName ? 'bg-[#4D4D4D] rounded text-[#E4E2E2]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RouteIcon color={isHovered ? "#3E623A" : "#8E8D8D"} size={24} />
      {pageName}
    </Link>
  );
};
