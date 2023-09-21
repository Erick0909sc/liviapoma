import { deleteProducts, disableProducts, restoreProducts, selecthiddenproducts } from '@/states/dashboard/products/productsSlice';
import { useAppDispatch } from '@/states/store';
import Image from 'next/image';
import React, { useState,useEffect } from 'react'
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';


type Props = {
    code: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    image: string;
    discount: number;
    category: string;
}

function ProductsHidden({ code,
    name,
    description,
    price,
    brand,
    image,

    discount,
    category }: Props) {

    const [view, setView] = useState(false);
    const dispatch = useAppDispatch();
    const hiddenProducts = useSelector(selecthiddenproducts);

    

    useEffect(() => {

        const isProductHidden = hiddenProducts.some((product) => product.code === code);
        setView(!isProductHidden); 
    }, [hiddenProducts, code]);


    const handleToggleProductVisibility = () => {
        if (view) {
            dispatch(disableProducts(code));
        } else {
            dispatch(restoreProducts(code)); 
        }
        setView(!view); 
    };

    // const handleDeleteProduct = () => {
    //     dispatch(deleteProducts(code));
    // }

    const handleDeleteProduct = () => {
        const confirmation = window.confirm('¿Desea usted eliminar este producto?');
    
        if (confirmation) {
          // El usuario eligió "Sí"
          dispatch(deleteProducts(code));
        } else {
          // El usuario eligió "No" o canceló la alerta
          // Puedes realizar alguna acción o simplemente no hacer nada
        }
      };

    return (
        <tr className="mb-2 text-center">
            <td className="px-2 py-1">{code}</td>
            <td className="px-2 py-1">{name}</td>
            <td className="px-2 py-1">{description}</td>
            <td className="px-2 py-1">{price}</td>
            <td className="px-2 py-1">{brand}</td>
            <td className="px-2 py-1">{category}</td>
            <td className="px-2 py-1">{discount}</td>
            <td className="relative w-16 h-20">
                <Image src={image} layout='fill' className='object-cover' />
            </td>
            <td className='text-[25px] p-4 flex'>  {view ? (
                <button onClick={handleToggleProductVisibility}><AiFillEye /></button>
            ) : (
                <button onClick={handleToggleProductVisibility}><AiFillEyeInvisible /></button>
            )}
                 <button onClick={handleDeleteProduct}><AiFillDelete /></button>
            </td>
        </tr>

    )
}

export default ProductsHidden