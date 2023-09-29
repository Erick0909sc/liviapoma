
import useBrandsData from '@/hooks/useBrandsData';
import useCategoriesData from '@/hooks/useCategoriesData';
import { editproduct, selectAllDashboardProducts } from '@/states/dashboard/products/productsSlice';
import { RootState, useAppDispatch } from '@/states/store';
import React, { useState, useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';


type Props = {
    productData: {
        code: string;
        name: string;
        description: string;
        price: number;
        brandId: number;
        image: string;
        discount: number;
        categoryId: number;
    };
    isModalOpen: boolean, 
    closeModal: () => void,
};


const EditProduct = ({
    productData, isModalOpen, closeModal

}: Props) => {

   console.log(productData)

    const dispatch = useAppDispatch();

    const categories = useCategoriesData()
    const brands = useBrandsData()
    const [editedData, setEditedData] = useState({ ...productData });



    

    const handleFieldChange = (field: string, value: string | number) => {
        setEditedData({
            ...editedData,
            [field]: value,
        });
    };

    const handleSave = () => {
        dispatch(editproduct(editedData));
        closeModal();
    };

    return (
        <div className="relative">
 
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-20"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 modal bg-white p-4 rounded-lg z-10 w-[70%] h-[80%]">
                        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
                        <form className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                    Código:
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={editedData.code}
                                    onChange={(e) => handleFieldChange('code', e.target.value)}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editedData.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={editedData.description}
                                    onChange={(e) => handleFieldChange('description', e.target.value)}
                                    className="mt-1 p-2 w-full h-20 border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Precio:
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={editedData.price}
                                    onChange={(e) => handleFieldChange('price', parseFloat(e.target.value))}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="brandSelect" className="block text-sm font-medium text-gray-700">
                                    Marca:
                                </label>
                                <select
                                    id="brandSelect"
                                    value={editedData.brandId}
                                    onChange={(e) => handleFieldChange('brandId', parseInt(e.target.value))}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                >
                                    <option value="">Seleccione Marca</option>
                                    {brands.map((brand, brandId) => (
                                        <option key={brand} value={brandId + 1}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                                    Descuento:
                                </label>
                                <input
                                    type="text"
                                    id="discount"
                                    name="discount"
                                    value={editedData.discount}
                                    onChange={(e) => handleFieldChange('discount', parseInt(e.target.value))}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700">
                                    Categoría:
                                </label>
                                <select
                                    id="categorySelect"
                                    value={editedData.categoryId}
                                    onChange={(e) => handleFieldChange('categoryId', parseInt(e.target.value))}
                                    className="mt-1 p-2 w-full border-gray-300 border-2 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none"
                                >
                                    <option value="">Seleccione categoría</option>
                                    {categories.map((category, categoryId) => (
                                        <option key={category} value={categoryId + 1}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2 text-center mt-4">
                                <button
                                    className="bg-blue-800 text-white p-2 rounded-md mr-4"
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                                <button
                                    className="bg-red-600 text-white p-2 rounded-md"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            )
            }
        </div >

    );
};

export default EditProduct;

