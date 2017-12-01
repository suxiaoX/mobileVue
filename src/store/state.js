import { playMode } from 'common/tools/config';
import { loadSearch } from 'common/tools/cache';

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  keywords: '',
  searchHistory: loadSearch()
};

export default state;
