/* eslint-disable react-hooks/exhaustive-deps */
import { BsFillPauseCircleFill, BsShuffle } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import { SlVolume2 } from "react-icons/sl";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { streamSong } from "../redux/action";
import { SET_CURRENT_PLAYING } from "../redux/actionTypes";
import { ProgressBar } from "./ProgressBar";
import { Modal } from "./MOdal";

export const Player = () => {
  const { load, playing, play, pause, setVolume, looping, loop } =
    useGlobalAudioPlayer();
  const [ismodalOpen, setisModalOpen] = useState(false);
  const currentSong = useSelector((store) => {
    return store.currentPlayingSong;
  });
  const currentSongID = useSelector((store) => {
    return store.currentPlaying;
  });
  const songs = useSelector((store) => {
    return store.currentSongs;
  });
  const dispatch = useDispatch();
  const handlePrev = () => {
    if (songs.length > 0) {
      const indexofCurrentSong = songs.findIndex((song) => {
        return song._id === currentSong._id;
      });
      if (indexofCurrentSong === 0) {
        dispatch({
          type: SET_CURRENT_PLAYING,
          payload: songs[songs.length - 1]._id,
        });
        return;
      } else {
        dispatch({
          type: SET_CURRENT_PLAYING,
          payload: songs[indexofCurrentSong - 1]._id,
        });
        return;
      }
    }
  };
  const handleNext = () => {
    if (songs.length > 0) {
      const indexofCurrentSong = songs.findIndex((song) => {
        return song._id === currentSong._id;
      });
      if (indexofCurrentSong === songs.length - 1) {
        dispatch({
          type: SET_CURRENT_PLAYING,
          payload: songs[0]._id,
        });
        return;
      } else {
        dispatch({
          type: SET_CURRENT_PLAYING,
          payload: songs[indexofCurrentSong + 1]._id,
        });
        return;
      }
    }
  };
  useEffect(() => {
    if (currentSongID) {
      streamSong(dispatch, currentSongID);
    }
  }, [currentSongID]);
  useEffect(() => {
    if (currentSong) {
      console.log("inplay");
      load(currentSong.streamURL, {
        autoplay: true,
        html5: true,
        format: "mp3",
      });
    }
  }, [currentSong]);

  return (
    <div className=" text-white bg-primary-800 h-1/6 rounded flex justify-between">
      <div className="hidden md:flex w-1/4 justify-start gap-5 items-center">
        <img
          src={currentSong?.album || "black-musicmixlogo.JPG"}
          alt=""
          className=" w-2/6 pl-5 h-5/6"
        />
        <div className="flex flex-col justify-center gap-4 text-base">
          <p>{currentSong?.title}</p>
          <p>{currentSong?.artist}</p>
          {currentSong && (
            <button
              className=" text-start bg-primary-700 rounded w-fit p-1 pl-2 pr-2 hover:bg-primary-900 duration-500 ease-in-out"
              onClick={() => {
                setisModalOpen(true);
              }}
            >
              Add to Playlist
            </button>
          )}

          <Modal ismodalOpen={ismodalOpen} setisModalOpen={setisModalOpen} />
        </div>
      </div>
      <div className="w-full md:w-2/4 h-full">
        <div className="flex justify-center items-center gap-5 h-1/2 text-primary-600">
          <BsShuffle
            style={{ fontSize: "20px" }}
            className="hover:cursor-pointer hover:text-white"
          />
          <CgPlayTrackPrev
            style={{ fontSize: "35px" }}
            className="hover:cursor-pointer hover:text-white"
            onClick={handlePrev}
          />
          {playing ? (
            <BsFillPauseCircleFill
              style={{ fontSize: "40px" }}
              className="hover:cursor-pointer hover:text-white"
              onClick={() => {
                pause();
              }}
            />
          ) : (
            <FaCirclePlay
              style={{ fontSize: "40px" }}
              className="hover:cursor-pointer hover:text-white"
              onClick={() => {
                play();
              }}
            />
          )}
          <CgPlayTrackNext
            style={{ fontSize: "35px" }}
            className="hover:cursor-pointer hover:text-white"
            onClick={handleNext}
          />
          <FiRepeat
            style={{ fontSize: "20px" }}
            className={`hover:cursor-pointer hover:text-white ${
              looping && `text-primary-900 hover:text-primary-900`
            }`}
            onClick={() => {
              if (looping) {
                loop(false);
              } else {
                loop(true);
              }
            }}
          />
        </div>
        <div className="h-1/2 flex flex-col justify-center">
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
            <ProgressBar />
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/4 justify-center items-center gap-2">
        <SlVolume2 style={{ fontSize: "20px" }} />
        <input
          type="range"
          name=""
          id=""
          max="1"
          min="0"
          step={0.01}
          className=" w-3/4 h-1 hover:cursor-pointer"
          onChange={(e) => {
            setVolume(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
