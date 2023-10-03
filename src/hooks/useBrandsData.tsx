import { useEffect, useState } from "react";
import axios from "axios";
import { Brand } from "@/shared/types";

const useBrandsData = () => {
  const [brands, setBrands] = useState<string[]>([]);

  const getBrands = async () => {
    try {
      const storedBrandsData = localStorage.getItem("brandsData");
      if (storedBrandsData) {
        const { data, timestamp } = JSON.parse(storedBrandsData);
        // Define un tiempo de expiración, por ejemplo, 1 día en milisegundos
        const expirationTime = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < expirationTime) {
          setBrands(data);
          return;
        }
      }

      // Realiza la solicitud al backend si los datos han caducado o no existen en localStorage
      const response = await axios.get("/api/v1/dashboard/brands");
      if (response.status === 200) {
        const responseData = response.data;
        const categoryNames: string[] = responseData.map(
          (category: Brand) => category.name
        );
        setBrands(categoryNames);
        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(
          "brandsData",
          JSON.stringify({ data: categoryNames, timestamp: Date.now() })
        );
      }
    } catch (error) {
      console.error("Error al obtener las marcas", error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return brands;
};

export default useBrandsData;
