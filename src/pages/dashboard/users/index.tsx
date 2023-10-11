import LayaoutAdmin from "@/components/Layout/LayoutAdmin/LayaoutAdmin";
import { EStateGeneric } from "@/shared/types";
import { itemsPerPage } from "@/shared/ultis";
import {
  getAllUsers,
  selectDashboardAllUsers,
  selectusersStatus,
} from "@/states/dashboard/users/usersSlice";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import React, { useEffect } from "react";
import Paginate from "@/components/pagination";
import { useSelector } from "react-redux";
import Users from "@/components/Dashboard/Users";

type Props = {};

const UsersPage = (props: Props) => {
  const Allusers = useSelector(selectDashboardAllUsers);
  const usersStatus = useSelector(selectusersStatus);

  const dispatch = useAppDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const minItems = (currentPage - 1) * itemsPerPage;
  const maxItems = currentPage * itemsPerPage;
  const items = Allusers.slice(minItems, maxItems);
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (usersStatus === EStateGeneric.IDLE) {
        await dispatch(getAllUsers());
      }
    };

    fetchData();
  }, [dispatch, usersStatus]);

  return (
    <LayaoutAdmin title="Usuarios">
      <div className="grid  flex-col h-full   ">
        {usersStatus === EStateGeneric.PENDING && <p>Loading...</p>}
        {usersStatus === EStateGeneric.FAILED && <p>Failed to load products</p>}

        {usersStatus === EStateGeneric.SUCCEEDED && (
          <div className="overflow-x-auto ">
            {items.map((user, index) => (
              <Users
                key={index}
                id={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
              />
            ))}
          </div>
        )}

        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
          items={Allusers.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </LayaoutAdmin>
  );
};

export default UsersPage;
