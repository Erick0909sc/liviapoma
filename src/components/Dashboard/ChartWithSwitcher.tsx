import { createChart, ColorType, IChartApi } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

type IntervalosType = {
  time: string;
  value: number;
};

interface DataByInterval {
  [key: string]: IntervalosType[];
}

const ChartWithSwitcher = (props: {
  dayData: IntervalosType[];
  weekData: IntervalosType[];
  monthData: IntervalosType[];
  yearData: IntervalosType[];
}) => {
  const { dayData, weekData, monthData, yearData } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const areaSeriesRef = useRef<any>(null);
  const [activeInterval, setActiveInterval] = React.useState("1D");

  const dataByInterval: DataByInterval = {
    "1D": dayData,
    "1W": weekData,
    "1M": monthData,
    "1Y": yearData,
  };

  useEffect(() => {
    function createChartWithSwitcher() {
      if (chartContainerRef.current) {
        chartRef.current = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth || 300,
          height: 300,
          layout: {
            background: {
              type: ColorType.Solid,
              color: "#000000",
            },
            textColor: "#d1d4dc",
          },
          grid: {
            vertLines: {
              visible: false,
            },
            horzLines: {
              color: "rgba(42, 46, 57, 0.5)",
            },
          },
          rightPriceScale: {
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
          },
          crosshair: {
            horzLine: {
              visible: false,
            },
          },
        });

        chartRef.current.timeScale().fitContent();

        areaSeriesRef.current = chartRef.current.addAreaSeries({
          topColor: "rgba(76, 175, 80, 0.56)",
          bottomColor: "rgba(76, 175, 80, 0.04)",
          lineColor: "rgba(76, 175, 80, 1)",
          lineWidth: 2,
        });

        areaSeriesRef.current.setData(dataByInterval[activeInterval]);
      }
    }

    createChartWithSwitcher();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [activeInterval]);

  const handleIntervalChange = (interval: string) => {
    setActiveInterval(interval);
  };

  return (
    <div className="w-full">
      <div className="switcher">
        {Object.keys(dataByInterval).map((interval) => (
          <button
            key={interval}
            className={`switcher-item ${
              activeInterval === interval ? "switcher-active-item" : ""
            }`}
            onClick={() => handleIntervalChange(interval)}
          >
            {interval}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ChartWithSwitcher;
