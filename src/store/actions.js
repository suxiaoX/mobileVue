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
