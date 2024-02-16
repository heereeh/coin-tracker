import { useOutletContext } from "react-router-dom";
import { ICoinPrice } from "../models/coin";

export default function Price() {
  const { price } = useOutletContext<{ price: ICoinPrice }>();
  return (
    <>
      {price && (
        <>
          <div className="mx-5">
            <div className="flex justify-between mt-7">
              <div>
                <div className="text-xs uppercase">Current Price:</div>
                <div>{price.quotes.USD.price.toFixed()}</div>
              </div>
              <div>
                <div className="text-xs uppercase">
                  Trading volume in the last 24 hours:
                </div>
                <div>
                  {price.quotes.USD.volume_24h.toFixed()} (
                  {price.quotes.USD.volume_24h_change_24h}%)
                </div>
              </div>
              <div>
                <div className="text-xs uppercase">Market Cap:</div>
                <div>
                  {price.quotes.USD.market_cap} (
                  {price.quotes.USD.market_cap_change_24h}%)
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <div className="text-xs uppercase">Highest price in history:</div>
              {price.quotes.USD.ath_price.toFixed()} (
              {price.quotes.USD.percent_from_price_ath}%) at{" "}
              {price.quotes.USD.ath_date}
            </div>
            <hr className="my-5" />
            <div className="text-xs uppercase">Recent price changes (%):</div>
            <table className="w-full text-center mt-2">
              <thead>
                <tr className="text-xs">
                  <td>15m</td>
                  <td>30m</td>
                  <td>1h</td>
                  <td>6h</td>
                  <td>12h</td>
                  <td>24h</td>
                  <td>7d</td>
                  <td>30d</td>
                  <td>1y</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{price.quotes.USD.percent_change_15m}</td>
                  <td>{price.quotes.USD.percent_change_30m}</td>
                  <td>{price.quotes.USD.percent_change_1h}</td>
                  <td>{price.quotes.USD.percent_change_6h}</td>
                  <td>{price.quotes.USD.percent_change_12h}</td>
                  <td>{price.quotes.USD.percent_change_24h}</td>
                  <td>{price.quotes.USD.percent_change_7d}</td>
                  <td>{price.quotes.USD.percent_change_30d}</td>
                  <td>{price.quotes.USD.percent_change_1y}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
