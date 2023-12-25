import axios from "axios";
import {
  ALREADY_LOGGED_IN,
  // ADD_NEW_PLAYLIST,
  GET_ALL_PLAYLIST,
  GET_ALL_SONGS_SUCCESS,
  GET_FAILURE,
  GET_REQUEST,
  GET_SIGNIN_SUCCESS,
  GET_SIGNUP_SUCCESS,
  SAVE_TO_BEFORE_FILTER,
  SET_CURRENT_SONG_DATA,
  STORE_USER_DATA,
} from "./actionTypes";


const url = `https://backend-musicmix-production.up.railway.app/`;

export async function getAllSongs(dispatch) {
  try {
    dispatch({ type: GET_REQUEST });
    const res = await axios.get(`${url}tracks/list`);
    const token = localStorage.getItem("musicmixtoken");
    const user = await axios.get(`${url}users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: STORE_USER_DATA, payload: user.data });
    console.log(res.data);
    dispatch({ type: GET_ALL_SONGS_SUCCESS, payload: res.data });
    dispatch({ type: SAVE_TO_BEFORE_FILTER, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FAILURE, payload: error.response.data.message });
  }
}

export async function alreadyLoggedIn(dispatch, token) {
  try {
    dispatch({ type: ALREADY_LOGGED_IN, payload: token });
  } catch (error) {
    console.log(error);
  }
}

export async function signInUser(dispatch, userData) {
  try {
    dispatch({ type: GET_REQUEST });
    const res = await axios.post(`${url}users/login`, userData);
 
    localStorage.setItem("musicmixtoken", res.data.token);
    dispatch({ type: GET_SIGNIN_SUCCESS, payload: res.data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FAILURE, payload: error.response.data.message });
  }
}

export async function signUpuser(dispatch, userData) {
  try {
    dispatch({ type: GET_REQUEST });
    const res = await axios.post(`${url}users/signup`, userData);
    dispatch({ type: GET_SIGNUP_SUCCESS, payload: res.data.token });
    localStorage.setItem("musicmixtoken", res.data.token);
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FAILURE, payload: error.response.data.message });
  }
}
 
export async function streamSong(dispatch, id) {
  try {
    const res = await axios.get(`${url}tracks/detail/${id}`);
    res.data.streamURL = `${url}tracks/stream/${id}`;
    console.log("here is",res);
    dispatch({ type: SET_CURRENT_SONG_DATA, payload: res.data });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPlaylist(dispatch) {
  try {
    const token = localStorage.getItem("musicmixtoken");
    const res = await axios.get(`${url}playlists/userplaylists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_ALL_PLAYLIST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
}

export async function addPlaylist(dispatch, name) {
  try {
    const token = localStorage.getItem("musicmixtoken");
    await axios.post(
      `${url}playlists/create`,
      {
        name: name,
        description: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // dispatch({ type: ADD_NEW_PLAYLIST, payload: res.data });
    getAllPlaylist(dispatch);
  } catch (error) {
    console.log(error);
  }
}

export async function getDuration(id) {
  try {
    const res = await axios.get(`${url}tracks/duration/${id}`);
    return res.data.duration;
  } catch (error) {
    console.log(error);
  }
}

export async function addToPlaylist(dispatch, playlistid, songid, tracks) {
  try {
    if (tracks.includes(songid)) {
      alert("Song Already in PLaylist");
      return;
    }
    const token = localStorage.getItem("musicmixtoken");
    const res = await axios.post(
      `${url}playlists/addtrack/${playlistid}`,
      {
        trackId: songid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllPlaylist(dispatch);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
