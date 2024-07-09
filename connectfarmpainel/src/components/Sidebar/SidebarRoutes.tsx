import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface SidebarRoutes {
  mainIcon: any
  altIcon: any
  pageName: string
  routeName: string
}

export default function SidebarRoutes(props: SidebarRoutes) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  console.log(router.pathname === props.routeName.toLowerCase() ? 'active' : '')

  return (
    <Link href={props.routeName}
      className={`flex justify-start items-center w-4/5 h-8 px-2 py-4
        text-[#8E8D8D] text-[10pt] font-bold hover:bg-[#4D4D4D] hover:rounded hover:text-[#E4E2E2]
        ${router.pathname === props.routeName ? 'bg-[#4D4D4D] rounded text-[#E4E2E2]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
        <img
          className="w-6 h-6 mr-1"
          src={isHovered ? props.mainIcon.src : props.altIcon.src}
          alt={props.pageName+"-icon"}
        />
        {props.pageName}
    </Link>
  )
}