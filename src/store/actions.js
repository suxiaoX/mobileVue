import * as types from './mutation-types';
import { playMode } from 'common/tools/config';
import { rearRange } from 'common/tools/util';

const findIndex = (list, song) => {
  return list.findIndex(item => {
    return item.id === song.id;
  })
}

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    const randomList = rearRange(list);
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

// 随机播放，一些设置
export const randomPlay = ({ commit, state }, { list }) => {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  let randomList = rearRange(list);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_PLAYLIST, randomList);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}
