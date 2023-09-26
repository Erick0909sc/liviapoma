import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/shared/types";

const useCategoriesData = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const storedCategorias = localStorage.getItem("categories");
      if (storedCategorias) {
        setCategories(JSON.parse(storedCategorias));
      } else {
        const response = await axios.get("/api/v1/dashboard/categories");

        if (response.status === 200) {
          const responseData = response.data;
          const categoryNames: string[] = responseData.map(
            (category: Category) => category.name
          );

          setCategories(categoryNames);
          localStorage.setItem("categories", JSON.stringify(categoryNames));
        }
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
