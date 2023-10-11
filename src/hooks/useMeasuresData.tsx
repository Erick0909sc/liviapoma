import { useEffect, useState } from "react";
import axios from "axios";
import { Brand } from "@/shared/types";

const useMeasuresData = () => {
  const [measures, setMeasures] = useState<string[]>([]);

  const getMeasures = async () => {
    try {
      const storedBrandsData = localStorage.getItem("measuresData");
      if (storedBrandsData) {
        const { data, timestamp } = JSON.parse(storedBrandsData);
        // Define un tiempo de expiración, por ejemplo, 1 día en milisegundos
        const expirationTime = 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < expirationTime) {
          setMeasures(data);
          return;
        }
      }

      // Realiza la solicitud al backend si los datos han caducado o no existen en localStorage
      const response = await axios.get("/api/v1/dashboard/measures");
      if (response.status === 200) {
        const responseData = response.data;
        const categoryNames: string[] = responseData.map(
          (category: Brand) => category.name
        );
        setMeasures(categoryNames);
        // Guarda los datos y la marca de tiempo en localStorage
        localStorage.setItem(
          "measuresData",
          JSON.stringify({ data: categoryNames, timestamp: Date.now() })
        );
      }
    } catch (error) {
      console.error("Error al obtener las marcas", error);
    }
  };

  useEffect(() => {
    getMeasures();
  }, []);

  return measures;
};

export default useMeasuresData;
