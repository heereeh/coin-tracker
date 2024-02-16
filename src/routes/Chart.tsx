import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { ICoinHistory } from "../models/coin";
import { fetchCoinHistory } from "../api";

export default function Chart() {
  const { coinId, isDark } = useOutletContext<{
    coinId: string;
    isDark: boolean;
  }>();
  const { isLoading, data: histories } = useQuery<ICoinHistory[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 5000,
  });

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div>
            <ReactApexChart
              type="line"
              series={[
                {
                  name: "price",
                  data: histories?.map((price) => Number(price.close)) ?? [],
                },
              ]}
              options={{
                theme: {
                  mode: isDark ? "dark" : "light",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                grid: {
                  show: false,
                },
                stroke: {
                  curve: "smooth",
                  width: 3,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  labels: {
                    show: false,
                  },
                  type: "datetime",
                  categories: histories?.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                  ),
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    gradientToColors: ["indigo"],
                    stops: [0, 100],
                  },
                },
                colors: ["blue"],
                tooltip: {
                  y: {
                    formatter: (value) => `$${value.toFixed(0)}`,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
