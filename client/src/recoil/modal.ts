import { atom } from 'recoil';

export const modalVisibleStates = atom({
  key: 'modalVisibleState',
  default: {
    searchUser: false
  }
});

export const rightModalStates = atom({
  key: 'rightModalState',
  default: {
    rightModalFlag: false,
    messageFlag: false,
    alarmFlag: false,
    selectorFlag: false
  }
})