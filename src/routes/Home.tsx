import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { ICoin } from "../models/coin";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";

function Home() {
  const { isLoading, data: coins } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  return (
    <>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <div>
        <header className="mb-3">
          <h1 className="text-4xl font-bold text-center">Coins</h1>
        </header>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex flex-col space-y-3">
            {(coins ?? []).slice(0, 100).map((coin) => (
              <Link
                key={coin.id}
                to={coin.id}
                state={{
                  name: coin.name,
                }}
                className="coin-button px-5 py-5 rounded-lg text-lg font-bold"
              >
                <div className="flex">
                  <div className="self-center mr-2">
                    <img
                      className="h-5"
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                  </div>
                  {coin.name} &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
