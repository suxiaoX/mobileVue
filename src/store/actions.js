import * as types from './mutation-types';
import { playMode } from 'common/tools/config';
import { rearRange } from 'common/tools/util';
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/tools/cache';
// import { currentId } from 'async_hooks';

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

// 点击搜索歌曲播放歌曲设置
export const insertSong = ({ commit, state }, song) => {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  const currentSong = playlist[currentIndex];
  // 查找当前列表中是否有选中的歌曲
  const fpIndex = findIndex(playlist, song);
  // 因为插入歌曲，所以索引需要+1
  currentIndex++;
  // 插入这首歌曲到播放位置
  playlist.splice(currentIndex, 0, song);
  // 如果有这首歌曲，需要删除列表中包含的这首歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(currentIndex, 1)
    } else {
      playlist.splice(currentIndex + 1, 1);
    }
  }
  // 获取默认列表当前的索引
  let curentSIndex = findIndex(sequenceList, currentSong) + 1;
  let fsIndex = findIndex(sequenceList, song);
  sequenceList.splice(curentSIndex, 0, song);
  if (fsIndex > -1) {
    if (curentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export const saveSearchHistory = ({commit, state}, query) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
// 删除歌曲
export const deleteSong = ({commit, state}, song) => {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let pIndex = findIndex(playlist, song);

  playlist.splice(pIndex, 1);

  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

// 删除歌曲列表
export const deleteSongList = ({commit}) => {
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_PLAYING_STATE, false);
}

// 保存播放历史
export const savePlayHistory = ({commit}, song) => {
  commit(types.SET_PLAY_HISTORY, savePlay(song));
}

// 保存喜欢歌曲
export const saveFavoriteList = ({commit}, song) => {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song));
}

// 删除新欢歌曲列表
export const deleteFavoriteList = ({commit}, song) => {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
}
