import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SearchedUserProps } from 'utils/types';
import palette from 'theme/palette';

import { ProfilePhoto } from 'components';

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
    background: ${palette.gray};
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
  return (
    <NavLink to={`/profile/${user.idx}`}>
      <CardWrap>
        <ProfilePhoto size="36px" />
        <p>{user.nickname}</p>
      </CardWrap>
    </NavLink>
  );
};

export default UserCard;
