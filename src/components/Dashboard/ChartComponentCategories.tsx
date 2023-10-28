import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  LineStyle,
} from "lightweight-charts";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";

type DataItem = {
  time: Prisma.JsonValue;
  value: number;
  category: {
    id: number;
    name: string;
  };
};

type Props = {
  category1: DataItem[];
  category2: DataItem[];
  category3: DataItem[];
  category4: DataItem[];
  category5: DataItem[];
};

const ChartComponentCategories = ({
  category1,
  category2,
  category3,
  category4,
  category5,
}: Props) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [categoriesToShow, setCategoriesToShow] = useState([
    category1[0].category.name,
    category2[0].category.name,
    category3[0].category.name,
    category4[0].category.name,
    category5[0].category.name,
  ]);

  const getSeriesColors = (index: string) => {
    const colors = {
      [category1[0].category.name]: {
        topColor: `rgba(255, 99, 71, 0.56)`,
        bottomColor: `rgba(255, 192, 203, 0.56)`,
        lineColor: `#FF0000`, // Rojo claro
      },
      [category2[0].category.name]: {
        topColor: `rgba(144, 238, 144, 0.56)`,
        bottomColor: `rgba(34, 139, 34, 0.56)`,
        lineColor: `#00FF00`, // Verde claro
      },
      [category3[0].category.name]: {
        topColor: `rgba(70, 130, 180, 0.56)`,
        bottomColor: `rgba(100, 149, 237, 0.56)`,
        lineColor: `#0000FF`, // Azul cielo
      },
      [category4[0].category.name]: {
        topColor: `rgba(218, 112, 214, 0.56)`,
        bottomColor: `rgba(199, 21, 133, 0.56)`,
        lineColor: `#FF00FF`, // Rosa
      },
      [category5[0].category.name]: {
        topColor: `rgba(255, 215, 0, 0.56)`,
        bottomColor: `rgba(255, 223, 186, 0.56)`,
        lineColor: `#FFB400`, // Amarillo
      },
    };

    return colors[index];
  };
  const handleCategories = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      categoriesToShow.length === 1 &&
      categoriesToShow.includes(e.target.value)
    ) {
      return toast.error("Debes mantener al menos una categoría activa.");
    }
    const items = categoriesToShow.filter(
      (producto) => producto !== e.target.value
    );
    if (items.length === categoriesToShow.length) {
      items.push(e.target.value);
    }
    setCategoriesToShow(items);
  };
  useEffect(() => {
    let chart: IChartApi | null = null;

    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth || 300,
        height: 400,
        layout: {
          background: { type: ColorType.Solid, color: "#ffffff" },
          textColor: "#000",
        },
        grid: {
          vertLines: {
            color: "#c2bfc9",
            style: LineStyle.LargeDashed,
          },
          horzLines: {
            color: "#c2bfc9",
            style: LineStyle.LargeDashed,
          },
        },
        crosshair: {
          mode: 1,
          horzLine: {
            color: "#000",
            width: 2,
          },
          vertLine: {
            color: "#000",
            width: 2,
          },
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 1)",
        },
        handleScroll: {
          vertTouchDrag: false,
        },
      });

      const seriesData = {
        [category1[0].category.name]: category1.map((item) => ({
          time: item.time as { year: number; month: number; day: number },
          value: item.value,
        })),
        [category2[0].category.name]: category2.map((item) => ({
          time: item.time as { year: number; month: number; day: number },
          value: item.value,
        })),
        [category3[0].category.name]: category3.map((item) => ({
          time: item.time as { year: number; month: number; day: number },
          value: item.value,
        })),
        [category4[0].category.name]: category4.map((item) => ({
          time: item.time as { year: number; month: number; day: number },
          value: item.value,
        })),
        [category5[0].category.name]: category5.map((item) => ({
          time: item.time as { year: number; month: number; day: number },
          value: item.value,
        })),
      };
      categoriesToShow.filter((category, index) => {
        const seriesColors = getSeriesColors(category);
        const series = chart?.addAreaSeries({
          topColor: seriesColors.topColor,
          bottomColor: seriesColors.bottomColor,
          lineColor: seriesColors.lineColor,
          lineWidth: 2,
        });
        series?.setData(seriesData[category]);
      });

      chart.timeScale().fitContent();
    }

    return () => {
      chart?.remove();
    };
  }, [category1, category2, category3, category4, category5, categoriesToShow]);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col">
        <label>
          Elija cuántos gráficos mostrar de las 5 categorías más vendidas:
        </label>
        <div className="space-x-4 inline-flex">
          {[
            category1[0].category.name,
            category2[0].category.name,
            category3[0].category.name,
            category4[0].category.name,
            category5[0].category.name,
          ].map((item) => (
            <label
              key={item}
              className={`flex items-center gap-1`}
              style={{
                color: getSeriesColors(item).lineColor,
              }}
            >
              <input
                type="checkbox"
                value={item}
                checked={categoriesToShow.includes(item)}
                onChange={handleCategories}
                style={{
                  border: `4px solid ${getSeriesColors(item).lineColor}`,
                }}
                className="appearance-none rounded-full h-5 w-5 checked:bg-black"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div ref={chartContainerRef} className="h-[50%]" />
    </div>
  );
};

export default ChartComponentCategories;
