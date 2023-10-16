import LayaoutAdmin from "@/components/Layout/LayoutAdmin/LayaoutAdmin";
import { EStateGeneric } from "@/shared/types";
import { itemsPerPage } from "@/shared/ultis";
import {
  getAllUsers,
  selectDashboardAllUsers,
  selectusersStatus,
} from "@/states/dashboard/users/usersSlice";
import {
  selectCurrentPage,
  selectSearch,
  setCurrentPage,
} from "@/states/globalSlice";
import { useAppDispatch } from "@/states/store";
import React, { useEffect } from "react";
import Paginate from "@/components/pagination";
import { useSelector } from "react-redux";
import User from "@/components/Dashboard/User";
import useDebounce from "@/hooks/useDebounce";
import useSearchUsers from "@/hooks/useSearchUsers";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";

type Props = {};

const UsersPage = (props: Props) => {
  // const Allusers = useSelector(selectDashboardAllUsers);
  const search = useDebounce(useSelector(selectSearch));
  const Allusers = useSearchUsers(useSelector(selectDashboardAllUsers), search);
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
      <div className="flex flex-col h-full">
        {usersStatus === EStateGeneric.PENDING && <Pending />}
        {usersStatus === EStateGeneric.FAILED && (
          <Failed
            tittle="Usuarios no encontrados"
            text="Los usuarios no pudieron ser cargados correctamente"
          />
        )}
        {usersStatus === EStateGeneric.SUCCEEDED && (
          <>
            {search && !items.length && (
              <Failed
                tittle="Usuarios no encontrados"
                text="No encontramos usuarios relacionados con tu búsqueda"
              />
            )}
            <div className="overflow-x-auto ">
              {items.map((user, index) => (
                <User
                  key={index}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                />
              ))}
            </div>
          </>
        )}

        {items.length > 0 && (
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPageRedux}
            items={Allusers.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </LayaoutAdmin>
  );
};

export default UsersPage;
