import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { ICoinHistory } from "../models/coin";

export default function Price() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data: histories } = useQuery<ICoinHistory[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <>
      <p>Price</p>
      {isLoading ? "Loading..." : <>{histories?.length}</>}
    </>
  );
}
