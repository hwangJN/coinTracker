import styled from "styled-components";
import { LoadingDiv } from "./Chart";
import { PriceData } from "./Coin";

interface PriceDat {
  tickersData?: PriceData;
  tickersLoading?: boolean;
}
interface percentColor {
  redOrBlue: boolean;
}
const PercentSpan = styled.div<percentColor>`
  color: ${(props) => (props.redOrBlue ? "red" : "blue")};
  font-weight: 700;
  font-size: 22px;
`;
const PercentChangeDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  height: 90px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: space-evenly;
  span {
    font-weight: 700;
    font-size: 13px;
  }
`;
const styles = {
  display: "grid",
  gap: "10px",
  gridTemplateColumns: "repeat(2, 1fr)",
};
function Price({ tickersData, tickersLoading }: PriceDat) {
  return (
    <div>
      {tickersLoading ? (
        <LoadingDiv>
          <span>Loading Price...</span>
        </LoadingDiv>
      ) : (
        <div style={styles}>
          <PercentChangeDiv>
            <span>30분 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_30m
                  ? tickersData?.quotes.USD.percent_change_30m > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_30m}%
            </PercentSpan>
          </PercentChangeDiv>
          <PercentChangeDiv>
            <span>1시간 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_1h
                  ? tickersData?.quotes.USD.percent_change_1h > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_1h}%
            </PercentSpan>
          </PercentChangeDiv>
          <PercentChangeDiv>
            <span>6시간 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_6h
                  ? tickersData?.quotes.USD.percent_change_6h > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_6h}%
            </PercentSpan>
          </PercentChangeDiv>
          <PercentChangeDiv>
            <span>12시간 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_12h
                  ? tickersData?.quotes.USD.percent_change_12h > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_12h}%
            </PercentSpan>
          </PercentChangeDiv>
          <PercentChangeDiv>
            <span>24시간 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_24h
                  ? tickersData?.quotes.USD.percent_change_24h > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_24h}%
            </PercentSpan>
          </PercentChangeDiv>
          <PercentChangeDiv>
            <span>일주일 변화율</span>
            <PercentSpan
              redOrBlue={
                tickersData?.quotes.USD.percent_change_7d
                  ? tickersData?.quotes.USD.percent_change_7d > 0
                  : false
              }
            >
              {tickersData?.quotes.USD.percent_change_7d}%
            </PercentSpan>
          </PercentChangeDiv>
        </div>
      )}
    </div>
  );
}
export default Price;
