import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface chatProps {
  coinId: string;
}
interface IData {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
export const LoadingDiv = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  color: ${(props) => props.theme.textColor};

  justify-content: center;
  span {
    font-size: 25px;
    font-weight: 600;
  }
`;
//data: data?.map((price) => Number(price.close)) as number[]
function Chart({ coinId }: chatProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IData[]>(
    ["ohlcv"],
    () => fetchCoinHistory(coinId),
    {
      //refetchInterval: 10000
    }
  );

  return (
    <div>
      {isLoading ? (
        <LoadingDiv>
          <span>Loading chart...</span>
        </LoadingDiv>
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ] as any
          } // as number[] 형 강제
          //type: "candlestick",
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
              animations: {
                enabled: true,
                easing: "easein",
                speed: 50,
                animateGradually: {
                  enabled: true,
                  delay: 150,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
            },

            xaxis: {
              type: "datetime",
              categories: data?.map((price) =>
                new Date(1000 * price.time_close).toUTCString()
              ),
              labels: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            grid: { show: false },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
          /*
          type="line"
          series={[
            {
              name: "prices",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]} // as number[] 형 강제
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(1000 * price.time_close).toUTCString()
              ),
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}*/
        />
      )}
    </div>
  );
}
export default Chart;
