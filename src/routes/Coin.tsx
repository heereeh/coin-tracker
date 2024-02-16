import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoin, fetchPrice } from "../api";
import { Helmet } from "react-helmet";
import { ICoinDetail, ICoinPrice } from "../models/coin";
import SingleInfo from "../components/SingleInfo";

type ICoinParams = {
  coinId: string;
};
type IRouteState = {
  name: string;
};

function Coin() {
  const params = useParams<ICoinParams>();
  const coinId = params.coinId;

  const { isLoading: isCoinLoading, data: coin } = useQuery<ICoinDetail>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoin(coinId!),
  });
  const { isLoading: isPriceLoading, data: price } = useQuery<ICoinPrice>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchPrice(coinId!),
    refetchInterval: 5000,
  });

  const { state } = useLocation() as { state: IRouteState };

  const location = useLocation();
  const isPrice = location.pathname.endsWith("price");
  const isChart = location.pathname.endsWith("chart");

  return (
    <>
      <Helmet>
        <title>{state?.name ?? "Loading..."}</title>
      </Helmet>
      <div>
        <header className="mb-3">
          <Link to="/">&larr; Back</Link>
          <h1 className="text-4xl text-center font-bold">
            {state?.name ?? coin?.name ?? "-"}
          </h1>
        </header>
        {isCoinLoading || isPriceLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="flex justify-between bg-slate-200 dark:bg-slate-900 rounded-lg px-5 py-3">
              <SingleInfo title="rank" content={coin!.rank} />
              <SingleInfo title="symbol" content={`$${coin!.symbol}`} />
              <SingleInfo
                title="Open Source"
                content={coin!.open_source ? "Yes" : "No"}
              />
            </div>
            <div className="py-5">{coin?.description}</div>
            <div className="flex justify-between bg-slate-200 dark:bg-slate-900 rounded-lg px-5 py-3">
              <SingleInfo
                title="price"
                content={price!.quotes.USD.price.toFixed(0)}
              />
              <SingleInfo title="max supply" content={`${price!.max_supply}`} />
            </div>
            <hr className="my-5" />
            <div className="flex flex-auto w-full space-x-3">
              <Link to="chart" className="hover:underline w-1/2 text-center">
                <div
                  className={`coin-tab px-5 py-2 rounded-lg ${
                    isChart ? "active" : ""
                  }`}
                >
                  Chart
                </div>
              </Link>
              <Link to="price" className="hover:underline w-1/2 text-center">
                <div
                  className={`coin-tab px-5 py-2 rounded-lg ${
                    isPrice ? "active" : ""
                  }`}
                >
                  Price
                </div>
              </Link>
            </div>
            <Outlet
              context={{
                coinId,
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Coin;
