import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  font-weight: 600;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 20px auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    transition: all 0.2s ease-in;
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      font-size: 20px;
    }
  }
`;
const Loader = styled.div`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const ToggleBtn = styled.button`
  background-color: ${(props) => props.theme.textColor};
  height: 28px;
  position: absolute;
  width: 50px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;
`;

const Circle = styled.span<{ isDark: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ isDark }) => (isDark ? "calc(100% - 21px)" : "3px")};
  width: 18px;
  transform: translateY(-50%);
  height: 18px;
  border-radius: 50%;
  background-color: ${({ isDark }) => (isDark ? "black" : "white")};
  transition: left 0.2s ease-in-out;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // 기존 fetch
  // const [coin, setCoin] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   //함수 바로 실행하기
  //   (async () => {

  //     setCoin(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  //   //
  // }, []);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      {/*Helmet은 html의 head로 direct link */}
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header>
        <Title>COIN</Title>
        <ToggleBtn onClick={toggleDarkAtom}>
          <Circle isDark={isDark} />
        </ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
