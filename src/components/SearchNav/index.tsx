import {
  cleanUpProduct,
  getAllProducts,
  selectAllProducts,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useCategoriesData from "@/hooks/useCategoriesData";
import Categorysearch from "@/components/Categories/Categorysearch";
type Props = {};

const SearchNav = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const allProducts = useSelector(selectAllProducts);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [visibleProducts, setVisibleProducts] = useState(7);
  const [searching, setSearching] = useState(false);
  const categories = useCategoriesData();
  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const filteredProducts = allProducts.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) && product.code !== router.query.code
);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const noResults = filteredProducts.length === 0 && searchQuery !== "";

  const searchRef = useRef<HTMLDivElement | null>(null); //  tipo q ni sabia q existia

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowSearch(false);
    }
  };
  const handleProductClick = (productCode: string) => {
    // Limpia el estado del producto antes de la redirección
    dispatch(cleanUpProduct());

    // Establece "searching" en "true" cuando se realiza una búsqueda
    setSearching(true);

    // Realiza la redirección al detalle del producto
    router.push(`/products/${productCode}`);

    // Oculta el componente de búsqueda
    setShowSearch(false);

    // Limpia el campo de búsqueda
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      document.addEventListener("mousedown", handleClickOutside);
      if (allProducts.length === 0) {
        await dispatch(getAllProducts());
      }
    };

    fetchData();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, allProducts]);
  return (
    <div className="NAVEGACION w-[53%] sm:w-[38%] lg:w-[60%] flex justify-center items-center gap-2 relative">
      <input
        type="text"
        placeholder="¿Qué Buscas?"
        className="p-1 rounded-2xl w-[80%] sm:w-[50%] text-center text-black outline-none"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSearch(e.target.value.length > 0);
        }}
        onFocus={() => setShowSearch(searchQuery.length > 0)}
      />
      <button onClick={handleSearchClick}>
        <FaSearch className="text-[20px]" />
      </button>

      {showSearch && (
        <div
          ref={searchRef}
          className="search-dropdown absolute z-20 bg-white top-full w-full border border-orange-400"
        >
          {noResults ? (
            <p className="text-red-500">No se encontraron resultados</p>
          ) : (
            <div>
              <div className="product-list max-h-[300px] overflow-y-auto w-full">
                {filteredProducts
                  .slice(0, visibleProducts)
                  .map((product, index) => (
                    <div
                      key={index}
                      onClick={() => handleProductClick(product.code)}
                      className="product-item flex items-center p-2 text-gray-700 hover:bg-green-500"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="mr-2"
                      />
                      {product.name}
                    </div>
                  ))}
                <div className="category-list max-h-[300px] overflow-y-auto w-full bg-slate-200">
                  <span className="flex items-center justify-center text-sm font-medium text-black">
                    Categorias:
                  </span>
                  {filteredCategories.map((category, index) => (
                    <div
                      key={index}
                      className="category-item p-2 text-gray-700 hover:bg-green-500"
                    >
                      <Categorysearch key={index} name={category} />
                    </div>
                  ))}
                </div>
                {filteredProducts.length > visibleProducts && (
                  <button  onClick={handleSearchClick} className="w-full text-center py-2 bg-green-500	 text-white">
                    Ver más
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchNav;
