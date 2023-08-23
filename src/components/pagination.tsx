// import React from 'react'

// type Props = {}

// const pagination = (props: Props) => {
//   return (
//     <div>pagination</div>
//   )
// }

// export default pagination
import { EStateGeneric,IProduct } from '@/shared/types';
import React, { useState, useEffect } from 'react';
 // Asegúrate de tener la ruta correcta a tus tipos

interface PaginatedComponentProps {
  items: IProduct[];
  itemsPerPage: number;
}

const Paginate: React.FC<PaginatedComponentProps> = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar la página cuando cambien los ítems
  }, [items]);

  return (
    <div>
      <ul>
        {visibleItems.map((item) => (
          <li key={item.code}>{item.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Paginate;
