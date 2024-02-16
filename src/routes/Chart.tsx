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
              series={[
                {
                  data:
                    histories?.map((price) => ({
                      x: new Date(price.time_close * 1000).toISOString(),
                      y: [price.open, price.low, price.high, price.close],
                    })) ?? [],
                },
              ]}
              type="candlestick"
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
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
