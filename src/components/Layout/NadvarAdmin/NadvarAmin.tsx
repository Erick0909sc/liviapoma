import React, { useState } from "react";
import { ImMenu } from "react-icons/im";
import { GoBellFill } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { Session } from "next-auth";
import AdminModal from "@/components/Modals/Admin";

interface NadvarProps {
  toggleSidebar: () => void;
  session: Session;
}

const NadvarAmin: React.FC<NadvarProps> = ({ toggleSidebar, session }) => {
  const [visibleSidebar, setVisibleSidebar] = React.useState(true);

  const toggleSidebarVisibility = () => {
    setVisibleSidebar(!visibleSidebar);
    toggleSidebar();
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex">
      <nav
        className={`w-full h-14 bg-teal-600  flex text-white items-center transition-all duration-300 `}
      >
        <div className="text-white text-[25px] pl-2 flex items-center h-full w-[15%]">
          <button onClick={toggleSidebarVisibility}>
            <ImMenu />
          </button>
        </div>

        <div className=" w-56  lg:w-[25%] flex justify-center">
          <form className="bg-transparent  border-white border rounded-[10px] w-full  lg:w-[70%]">
            <input
              type="text "
              className="bg-transparent rounded-[10px] p-2 focus:outline-none w-[75%] placeholder-white"
              placeholder="Ingrese su busqedad"
            />
            <button className="pl-1 w-[25%] border-l text-center" type="button">
              Buscar
            </button>
          </form>
        </div>

        <div className="w-36 flex justify-end pr-3 text-[35px]">
          {session && (
            <>
              <FaUserCircle
                onClick={toggleModal}
                className="lg:hidden sm:hidden"
              />
              {showModal && (
                <AdminModal isOpen={showModal} onClose={toggleModal} />
              )}
            </>
          )}
        </div>

        <div className="w-[60%]  justify-end p-4 gap-3 hidden sm:flex   lg:flex">
          <button className="text-[25px] ">
            <GoBellFill />
          </button>
          <div className="flex items-center ">
            <button className="flex gap-2 items-center">
              <FaUserCircle className="text-[28px]" />
              <div className="flex items-center">
                <h2>{session.user.name}</h2>
                <GoTriangleDown />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NadvarAmin;
