
import LayaoutAdmin from '@/components/Layout/LayoutAdmin/LayaoutAdmin'
import { EStateGeneric } from '@/shared/types'
import { itemsPerPage } from '@/shared/ultis'
import {  getAllUsers, selectDashboardAllUsers, selectusersStatus } from '@/states/dashboard/users/usersSlice'
import { selectCurrentPage, setCurrentPage } from '@/states/globalSlice'
import { useAppDispatch } from '@/states/store'
import React, { useEffect } from 'react'
import Paginate from '@/components/pagination';
import { useSelector } from 'react-redux'
import Users from '@/components/Dashboard/Users'

type Props = {}

const Index = (props: Props) => {

    const Allusers = useSelector(selectDashboardAllUsers)
    const usersStatus = useSelector(selectusersStatus)

    const dispatch = useAppDispatch()


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
        <div>
            <LayaoutAdmin >
                <div className="flex flex-col h-full justify-between   ">
                    {usersStatus === EStateGeneric.PENDING && <p>Loading...</p>}
                    {usersStatus === EStateGeneric.FAILED && <p>Failed to load products</p>}

                    {usersStatus === EStateGeneric.SUCCEEDED && (
                        <div className="overflow-x-auto ">
                            <table className="min-w-full table-auto ">
                                <thead>
                                    <tr>
                                        <th className="p-2">id</th>
                                        <th className="p-2">Nombre</th>
                                        <th className="p-2">email</th>
                                        <th className="p-2">contraseña</th>
                                        <th className="p-2">rol</th>
                                        <th className="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((user, index) => (
                                        <Users
                                            key={index}
                                            id={user.id}
                                            name={user.name}
                                            email={user.email}
                                            password={user.password}
                                            role={user.role}

                                        />
                                    ))}
                                </tbody>
                            </table>
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
        </div>
    )
}

export default Index