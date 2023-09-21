
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllProducts, selectAllDashboardProducts, selectAllDashboardProductsStatus } from '@/states/dashboard/products/productsSlice';
import { EStateGeneric } from '@/shared/types';
import LayaoutAdmin from '@/components/Layout/LayoutAdmin/LayaoutAdmin';
import { itemsPerPage } from '@/shared/ultis';
import { selectCurrentPage, setCurrentPage } from '@/states/globalSlice';
import { useAppDispatch } from '@/states/store';
import Paginate from '@/components/pagination';
import ProductsAdmin from '@/components/Dashboard/Products';

const Index = () => {
    const productDashboard = useSelector(selectAllDashboardProducts);
    console.log(productDashboard);
    const productsStatus = useSelector(selectAllDashboardProductsStatus);

    const dispatch = useAppDispatch();

    
    const currentPage = useSelector(selectCurrentPage);
    const minItems = (currentPage - 1) * itemsPerPage;
    const maxItems = currentPage * itemsPerPage;
    const items = productDashboard.slice(minItems, maxItems);
    const setCurrentPageRedux = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (productsStatus === EStateGeneric.IDLE) {
                await dispatch(getAllProducts());
            }
        };

        fetchData();
    }, [dispatch, productsStatus]);
    

    return (
        <LayaoutAdmin>
            <div className="flex flex-col h-full justify-between   ">
                {productsStatus === EStateGeneric.PENDING && <p>Loading...</p>}
                {productsStatus === EStateGeneric.FAILED && <p>Failed to load products</p>}

                {productsStatus === EStateGeneric.SUCCEEDED && (
                    <div className="overflow-x-auto ">
                        <table className="min-w-full table-auto ">
                            <thead>
                                <tr>
                                    <th className="p-2">Codigo</th>
                                    <th className="p-2">Nombre</th>
                                    <th className="p-2">Descripcion</th>
                                    <th className="p-2">Precio</th>
                                    <th className="p-2">Marca</th>
                                    <th className="p-2">Categoria</th>
                                    <th className="p-2">Descuento</th>
                                    <th className="p-2">Imagen</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((product, index) => (
                                    <ProductsAdmin
                                        key={index}
                                        code={product.code}
                                        
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        marca={product.marca}
                                        category={product.category.name}
                                        discount={product.discount}
                                        image={product.image}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Paginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPageRedux}
                    items={productDashboard.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </LayaoutAdmin>
    );
};

export default Index;
