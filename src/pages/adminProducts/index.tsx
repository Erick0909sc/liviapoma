import ProductsAdmin from '@/components/Dashboard/Products';
import LayaoutAdmin from '@/components/Layout/LayoutAdmin/LayaoutAdmin'
import { EStateGeneric } from '@/shared/types';
import { itemsPerPage } from '@/shared/ultis';
import { selectCurrentPage, setCurrentPage } from '@/states/globalSlice';
import { getAllProducts, selectAllProducts, selectAllProductsStatus } from '@/states/products/productsSlice';
import { useAppDispatch } from '@/states/store';
import Paginate from "@/components/pagination";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {}

const Index = (props: Props) => {

    const products = useSelector(selectAllProducts);
    const productsStatus = useSelector(selectAllProductsStatus);
    const dispatch = useAppDispatch()
    const currentPage = useSelector(selectCurrentPage);
    const minItems = (currentPage - 1) * itemsPerPage;
    const maxItems = currentPage * itemsPerPage;
    const items = products.slice(minItems, maxItems);
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

        // La función de retorno se ejecuta al desmontar el componente
    }, [dispatch, productsStatus]);

    return (
        <LayaoutAdmin>
            <div className="flex flex-col justify-center ">
                {productsStatus === EStateGeneric.PENDING && <p>Loading...</p>}
                {productsStatus === EStateGeneric.FAILED && (
                    <p>Failed to load products</p>
                )}
                {productsStatus === EStateGeneric.SUCCEEDED && (
                    <div>
                        {items.map((product, index) => (
                            <ProductsAdmin
                                key={index}
                                code={product.code}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                brand={product.marca}
                                image={product.image}
                                category={product.category.name}
                                
                            />
                        ))}
                    </div>
                )}

                <Paginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPageRedux}
                    items={products.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </LayaoutAdmin>
    )
}

export default Index