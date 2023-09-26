import { useEffect, useState } from "react";
import axios from "axios";
import { Brand } from "@/shared/types";

const useBrandsData = () => {
  const [brands, setBrands] = useState<string[]>([]);

  const getBrands = async () => {
    try {
      const storedCategorias = localStorage.getItem("brands");
      if (storedCategorias) {
        setBrands(JSON.parse(storedCategorias));
      } else {
        const response = await axios.get("/api/v1/dashboard/brands");

        if (response.status === 200) {
          const responseData = response.data;
          const categoryNames: string[] = responseData.map(
            (category: Brand) => category.name
          );

          setBrands(categoryNames);
          localStorage.setItem("brands", JSON.stringify(categoryNames));
        }
      }
    } catch (error) {
      console.error("Error al obtener las categorías", error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return brands;
};

export default useBrandsData;
