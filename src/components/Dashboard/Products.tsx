import Image from 'next/image';
import React from 'react'

type Props = {
    code: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    image: string;
    category: string;
}

function ProductsAdmin({ code, title, description, price, image, brand, category }: Props) {
    return (
        <div className="w-full">
            <table className="w-full" cellSpacing={10}>
                <thead>
                    <tr>
                        <th>codigo</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td>{code}</td>
                        <td className="w-[25%]">
                            <div>
                                <h2>{title}</h2>
                            </div>
                            <div>
                                <p>{description}</p>
                            </div>
                        </td>
                        <td>{price}</td>
                        <td>{brand}</td>
                        <td>{category}</td>
                        <td className="flex justify-center">
                            <div className="w-16 h-16 relative">
                                <Image src={image} layout="fill" className="w-full h-auto" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductsAdmin