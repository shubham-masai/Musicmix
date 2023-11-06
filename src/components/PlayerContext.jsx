// PlayerContext.js

import React, { createContext, useContext, useReducer } from "react";

// Define the initial state and reducer function
const initialState = {
  songs: [], // An array of song objects
  currentSongIndex: null, // The index of the currently playing song
};

const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "SET_CURRENT_SONG_INDEX":
      return { ...state, currentSongIndex: action.payload };
    case "CLEAR_CURRENT_SONG":
      return { ...state, currentSongIndex: null };
    default:
      return state;
  }
};

// Create a context
const PlayerContext = createContext();

// Create a context provider
export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to access the context
export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
