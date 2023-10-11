import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { sidebarItems, translate } from "@/shared/utils";
import { Role } from "@prisma/client";
import { AiFillCaretRight } from "react-icons/ai";

type Props = {
  session: Session;
};

const Sidebar = ({ session }: Props) => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    const parts = pathname.split("/");
    setActive(parts[parts.length - 1]);
  }, [pathname]);
  return (
    <div className="absolute bg-emerald-900 text-white w-full xs:min-w-[18rem] xs:max-w-[18rem] h-[calc(100vh-56px)] sm:h-full z-10  lg:static top-14 bottom-0 flex ">
      <div className="w-full  flex flex-col flex-shrink-0">
        <div className="flex items-center text-center h-[10%] font-bold border-b-4 gap-1">
          <Link href={"#"}>
            <h2 className="text-[25px] cursor-pointer">Ferreteria Liviapoma</h2>
          </Link>
        </div>
        <div className="flex flex-col flex-grow">
          {session.user.role === Role.Admin &&
            sidebarItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <div className="px-2 my-4" key={text}>
                    <span className="text-lg">{text}</span>
                  </div>
                );
              }
              const lcText = text.toLowerCase();
              return (
                <div key={text}>
                  <button
                    type="button"
                    onClick={() => {
                      lcText === "dashboard"
                        ? router.push(`/dashboard`)
                        : router.push(`/dashboard/${lcText}`);
                      setActive(lcText);
                    }}
                    className={`${
                      active === lcText ? "bg-crema-400 text-white" : ""
                    } w-full flex items-center px-2 py-3 gap-2 hover:bg-green-500 cursor-pointer`}
                  >
                    {icon}
                    <span className="text-lg">{translate[text]}</span>
                    {active === lcText && (
                      <AiFillCaretRight className="text-lg" />
                    )}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
