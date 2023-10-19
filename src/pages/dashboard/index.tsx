import { dayData, monthData, weekData, yearData } from "@/shared/test";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ChartComponent from "@/components/Dashboard/ChartComponent";
import ChartWithSwitcher from "@/components/Dashboard/ChartWithSwitcher";

type Props = {};

const Dashboard = (props: Props) => {
  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];
  return (
    <LayoutAdmin title="Dashboard">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <ChartComponent data={initialData} />
          <ChartWithSwitcher
            dayData={dayData}
            weekData={weekData}
            monthData={monthData}
            yearData={yearData}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
