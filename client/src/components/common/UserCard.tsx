import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SearchedUserProps } from 'types/GNB';
import palette from 'theme/palette';

import { useRecoilState } from 'recoil';
import { modalStateStore } from 'recoil/store';
import ProfilePhoto from 'components/common/ProfilePhoto';
const ClickableProfileImage = styled(ProfilePhoto)``;


const CardWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;

  p {
    margin-left: 16px;
    font-size: 0.95rem;
    color: ${palette.black};
    text-decoration: none;
  }

  &:hover {
    background: ${palette.lightgray};
    border-radius: 8px;
  }
`;

const NavLink = styled(Link)`
  display: block;
  & + & {
    margin-top: 4px;
  }
`;

const UserCard = ({ user }: SearchedUserProps) => {
  const [modalState, setModalState] = useRecoilState(modalStateStore);
  return (
    <NavLink
      to={`/profile/${user.nickname}`}
      onClick={() => setModalState({ ...modalState, searchUser: false })}
    >
      <CardWrap>
        <ClickableProfileImage userName={user.nickname} size={'30px'} />
        <p>{user.nickname}</p>
      </CardWrap>
    </NavLink>
  );
};

export default UserCard;
