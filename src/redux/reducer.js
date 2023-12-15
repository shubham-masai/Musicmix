import {
  ADD_NEW_PLAYLIST,
  ALREADY_LOGGED_IN,
  GET_ALL_PLAYLIST,
  GET_ALL_SONGS_SUCCESS,
  GET_FAILURE,
  GET_REQUEST,
  GET_SIGNIN_SUCCESS,
  GET_SIGNUP_SUCCESS,
  SAVE_TO_BEFORE_FILTER,
  SET_CURRENT_PLAYING,
  SET_CURRENT_SONG_DATA,
  STORE_USER_DATA,
} from "./actionTypes";

const initialState = {
  isAuth: false,
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  currentSongs: [],
  beforeFilter: [],
  currentPlaying: null,
  currentPlayingSong: null,
  errorMessage: null,
  playlists: [],
};

export function reducer(state = initialState, { type, payload }) {
  if (type === GET_REQUEST) {
    return { ...state, isLoading: true, isError: false };
  }

  if (type === GET_FAILURE) {
    return { ...state, isError: true, isLoading: false, errorMessage: payload };
  }
  if (type === GET_ALL_SONGS_SUCCESS) {
    return {
      ...state,
      currentSongs: payload,
      isLoading: false,
      isError: false,
    };
  }
  if (type === GET_SIGNIN_SUCCESS) {
    return { ...state, token: payload, isAuth: true };
  }
  if (type === STORE_USER_DATA) {
    return { ...state, user: payload };
  }
  if (type === ALREADY_LOGGED_IN) {
    return { ...state, isAuth: true, token: payload };
  }
  if (type === GET_SIGNUP_SUCCESS) {
    return { ...state, token: payload, isAuth: true };
  }
  if (type === SET_CURRENT_PLAYING) {
    console.log(state);
    return { ...state, currentPlaying: payload };
  }
  if (type === SET_CURRENT_SONG_DATA) {
    return { ...state, currentPlayingSong: payload };
  }
  if (type === SAVE_TO_BEFORE_FILTER) {
    return { ...state, beforeFilter: payload };
  }
  if (type === ADD_NEW_PLAYLIST) {
    return { ...state, playlists: [...state.playlists, payload] };
  }
  if (type === GET_ALL_PLAYLIST) {
    return { ...state, playlists: payload };
  }
  return state;
}
