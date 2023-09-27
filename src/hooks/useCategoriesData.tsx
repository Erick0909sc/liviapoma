import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/shared/types";

const useCategoriesData = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const storedCategoriesData = localStorage.getItem("categoriesData");
      if (storedCategoriesData) {
        const { data, timestamp } = JSON.parse(storedCategoriesData);
        // Define un tiempo de expiración, por ejemplo, 1 día en milisegundos
        const expirationTime = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < expirationTime) {
          setCategories(data);
          return;
        }
      }

      // Realiza la solicitud al backend si los datos han caducado o no existen en localStorage
      const response = await axios.get("/api/v1/dashboard/categories");
      if (response.status === 200) {
        const responseData = response.data;
        const categoryNames: string[] = responseData.map(
          (category: Category) => category.name
        );
        setCategories(categoryNames);
        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(
          "categoriesData",
          JSON.stringify({ data: categoryNames, timestamp: Date.now() })
        );
      }
    } catch (error) {
      console.error("Error al obtener las categorías", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategoriesData;
