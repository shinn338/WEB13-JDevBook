import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

import palette from 'theme/palette';
import { modalVisibleStates, userData } from 'recoil/store';

import ModalTitle from 'components/HomePage/PostWriterModal/ModalTitle';
import PostInfo from 'components/HomePage/PostWriterModal/PostInfo';
import ModalContents from 'components/HomePage/PostWriterModal/ModalContents';

const PostWriterModalOverlay = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.2);

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
`;

const PostWriterModalInner = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 160px;
  width: 600px;
  padding: 12px;
  z-index: 6;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px;
  background-color: ${palette.white};

  display: ${(props) => (props.modalState ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  width: 95%;
  border-color: ${palette.gray};
  border-width: 1px;
  border-style: solid;
  margin: 12px 0;
`;

const PostWriterModal = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);

  const PostWriterModalToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    setModalState({ ...modalState, postWriter: !modalState.postWriter });
  };

  return (
    <>
      <PostWriterModalOverlay
        modalState={modalState.postWriter}
        onClick={PostWriterModalToggle}
      />
      <PostWriterModalInner modalState={modalState.postWriter}>
        <ModalTitle />
        <Line />
        <PostInfo />
        <ModalContents />
      </PostWriterModalInner>
    </>
  );
};

export default PostWriterModal;
