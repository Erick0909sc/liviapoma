import {
  createChart,
  ColorType,
  IChartApi,
  LineStyle,
  ISeriesApi,
  Time,
  AreaData,
  WhitespaceData,
  AreaSeriesOptions,
  DeepPartial,
  AreaStyleOptions,
  SeriesOptionsCommon,
} from "lightweight-charts";
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
  monthData: IntervalosType[];
  yearData: IntervalosType[];
}) => {
  const { dayData, monthData, yearData } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const areaSeriesRef = useRef<ISeriesApi<
    "Area",
    Time,
    AreaData<Time> | WhitespaceData<Time>,
    AreaSeriesOptions,
    DeepPartial<AreaStyleOptions & SeriesOptionsCommon>
  > | null>(null);
  const [activeInterval, setActiveInterval] = React.useState("1D");

  const dataByInterval: DataByInterval = {
    "1D": dayData,
    "1M": monthData,
    "1Y": yearData,
  };

  useEffect(() => {
    function createChartWithSwitcher() {
      if (chartContainerRef.current) {
        chartRef.current = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth || 300,
          height: 400,
          layout: {
            background: {
              type: ColorType.Solid,
              color: "#ffffff",
            },
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
          rightPriceScale: {
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
          },
          crosshair: {
            mode: 1,
            horzLine: {
              color: "rgba(76, 175, 80, 1)",
              width: 2,
            },
            vertLine: {
              color: "rgba(76, 175, 80, 1)",
              width: 2,
            },
          },
        });
        // chart.applyOptions({
        //   watermark: {
        //     visible: true,
        //     fontSize: 24,
        //     horzAlign: "center",
        //     vertAlign: "center",
        //     color: "rgba(171, 71, 188, 0.5)",
        //     text: "Liviapoma",
        //   },
        // });
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
    <div className="w-full h-full">
      <div className="flex w-min gap-1 border-2 border-gray-600 rounded-md p-[1px]">
        {Object.keys(dataByInterval).map((interval) => (
          <button
            key={interval}
            className={`p-3 rounded-md font-semibold ${
              activeInterval === interval
                ? "bg-green-700 text-white"
                : "hover:bg-green-700"
            }`}
            onClick={() => handleIntervalChange(interval)}
          >
            {interval}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="h-[50%]" />
    </div>
  );
};

export default ChartWithSwitcher;
