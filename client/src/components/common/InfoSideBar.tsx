import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { ProfilePhoto } from '..';
import { userData } from 'recoil/modal';
import { useRecoilState } from 'recoil';
import getData from 'api/fetch';
import socket from './Socket';

const InfoSideBarContainer = styled.div`
  height: 200px;
  width: inherit;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 5px 5px 5px;
`;

const ProfileWrap = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 35px 50px 0 50px;
  text-decoration: none;
  color: black;

  p {
    font-size: large;
    font-weight: bold;
    margin: 20px 20px;
  }
`;

const SolvedTitle = styled.div`
  font-weight: bold;
  margin: 10px 50px;
`;

const SolvedBarGraph = styled.div`
  height: 25px;
  background: #ccc;
  border-radius: 40px;
  margin: 0 50px;
`;

const GraphAnimation = (solvedRate: number) => keyframes`
  0% {
    width: 0;
    color: rgba(255, 255, 255, 0);
  }
  50% {
    color: rgba(255, 255, 255, 1);
  }
  100% {
    width: ${solvedRate}%;
  }
`;

const InnerBarGraph = styled.span<{ solvedRate: number }>`
  display: block;
  width: ${(props) => props.solvedRate}%;
  height: 25px;
  line-height: 25px;
  text-align: right;
  background: #87d474;
  border-radius: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  color: white;
  font-size: small;
  font-weight: 600;
  animation: ${(props) => GraphAnimation(props.solvedRate)} 1.5s 1;
`;

const InfoSideBar: React.FC = () => {
  const solvedRate = Number(((123 / 155) * 100).toFixed(1));
  const [userdata, setUserdata] = useRecoilState(userData);
  useEffect(() => {
    async function fetchUserdata() {
      const name: string = await getData.getusername();
      setUserdata({ username: name });
      socket.emit('name', name);
    }
    fetchUserdata();
  }, []);

  return (
    <InfoSideBarContainer>
      <ProfileWrap to="/profile/shin">
        <ProfilePhoto src="" />
        <p>{userdata.username}</p>
      </ProfileWrap>
      <SolvedTitle>문제 푼 수</SolvedTitle>
      <SolvedBarGraph>
        <InnerBarGraph solvedRate={solvedRate}>{solvedRate}%</InnerBarGraph>
      </SolvedBarGraph>
    </InfoSideBarContainer>
  );
};

export default InfoSideBar;
