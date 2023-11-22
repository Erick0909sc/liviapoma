import Link from "next/link";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { ImMenu } from "react-icons/im";
import MenuModal from "@/components/Modals/menu";
import { AiFillHome } from "react-icons/ai";
import { MdContactPhone, MdInventory } from "react-icons/md";
import SearchNav from "@/components/SearchNav";
import ProfileModal from "@/components/Modals/ProfileModal";

type Props = {};

const Nadvar = (props: Props) => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenuModal = () => {
    setUserModalOpen(false);
    setMenuModalOpen(!menuModalOpen);
  };

  const toggleUserModal = () => {
    setMenuModalOpen(false);
    setUserModalOpen(!userModalOpen);
  };
  return (
    <nav className="relative">
      <div className="bg-green-700 flex text-white h-16 w-ful ">
        <div className="title flex items-center font-serif w-[32%] sm:w-[20%] lg:w-[32%] text-[15px] pl-1 justify-start md:pl-4 lg:pl-4  sm:text-[20px] font-bold">
          <Link href={"/"}>
            <h2 className="cursor-pointer">Ferreteria Liviapoma</h2>
          </Link>
        </div>
        {/* AQUI VA EL RENDERIZADO OJALA SIRVA XD */}
        <SearchNav />

        <div className=" flex sm:hidden w-[38%]  justify-end items-center gap-5 pr-2 text-[25px] lg:text-[35px]">
          <button onClick={toggleMenuModal}>
            <ImMenu />
          </button>
          <MenuModal isOpen={menuModalOpen} onClose={toggleMenuModal} />

          {session?.user?.image ? (
            <button onClick={toggleUserModal}>
              <img
                src={session.user.image}
                alt="User"
                className="w-[35px] h-[35px] rounded-full"
              />
            </button>
          ) : (
            <button onClick={toggleUserModal}>
              <FaUserCircle />
            </button>
          )}
          <ProfileModal isOpen={userModalOpen} onClose={toggleUserModal} />
        </div>

        <div className="hidden sm:flex w-[40%]  sm:w-[75%]  justify-end items-center sm:gap-3 sm:pr-1  lg:gap-7 lg:pr-6 text-[25px] sm:text-[18px] lg:text-[18px]">
          <Link href={"/"}>
            <div className="flex gap-2 items-center cursor-pointer hover:text-crema-300">
              <AiFillHome />
              <h2>Inicio</h2>
            </div>
          </Link>

          <Link href={"/products"}>
            <div className="flex gap-2 items-center cursor-pointer hover:text-crema-300">
              <MdInventory />
              <h2>Productos</h2>
            </div>
          </Link>

          <Link href={"/cart"}>
            <div className="flex gap-2 items-center cursor-pointer hover:text-crema-300">
              <FaShoppingCart />
              <h2>Carrito</h2>
            </div>
          </Link>

          <Link href={"/contactanos"}>
            <div className="flex gap-2 items-center cursor-pointer hover:text-crema-300">
              <MdContactPhone />
              <h2>Contacto</h2>
            </div>
          </Link>

          {session?.user?.image ? (
            <button onClick={toggleUserModal}>
              <img
                src={session.user.image}
                alt="User"
                className="w-[40px] h-[40px] rounded-full"
              />
            </button>
          ) : (
            <button onClick={toggleUserModal} className="lg:text-[40px]">
              <FaUserCircle />
            </button>
          )}
          <ProfileModal isOpen={userModalOpen} onClose={toggleUserModal} />
        </div>
      </div>
    </nav>
  );
};

export default Nadvar;
