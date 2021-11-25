import styled from 'styled-components';

import Greeter from 'components/LoginPage/Greeter';
import LoginBox from 'components/LoginPage/LoginBox';
import Footer from 'components/LoginPage/Footer';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function LoginPage() {
  return (
    <>
      <Content>
        <Greeter />
        <LoginBox />
      </Content>
      <Footer />
    </>
  );
}

export default LoginPage;
