/* eslint-disable react-hooks/exhaustive-deps */
import { SiYoutubemusic } from "react-icons/si";
import { MdHomeFilled } from "react-icons/md";
import { LuLibrary } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { addPlaylist, getAllPlaylist, getAllSongs } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { PlaylistCard } from "./PlaylistCard";
import {
  GET_ALL_SONGS_SUCCESS,
  SAVE_TO_BEFORE_FILTER,
} from "../redux/actionTypes";

export const SideBar = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((store) => {
    return store.playlists;
  });
  const songs = useSelector((store) => {
    return store.currentSongs;
  });
  const beforeFilter = useSelector((store) => {
    return store.beforeFilter;
  });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const [playlistName, setPlaylistName] = useState("");
  const handleNameSubmittion = () => {
    if (playlistName) {
      addPlaylist(dispatch, playlistName);
    } else {
      alert("Enter Name");
    }
  };
  useEffect(() => {
    getAllPlaylist(dispatch);
  }, []);
  const fillBeforeFilter = () => {
    if (beforeFilter.length === 0) {
      dispatch({ type: SAVE_TO_BEFORE_FILTER, payload: songs });
    }
  };
  const handlePlaylistClick = (tracksArray) => {
    if (beforeFilter.length > 0) {
      let temp = [...beforeFilter];
      const filtered = temp.filter((song) => {
        if (tracksArray.includes(song._id)) {
          return true;
        }
        return false;
      });

      dispatch({ type: GET_ALL_SONGS_SUCCESS, payload: filtered });
    }
  };
  return (
    <div className="hidden text-white w-1/4 rounded md:flex flex-col gap-2">
      <div className="bg-primary-800 rounded p-3 flex flex-col gap-2 h-24">
        <div className=" flex item-center gap-4 items-center">
          <SiYoutubemusic style={{ color: "white", fontSize: "35px" }} />
          <h1 className=" text-lg text-w text-primary-600 hover:text-white hover:cursor-pointer duration-500 ease-in-out">
            MusicMix
          </h1>
        </div>
        <div className="flex item-center gap-4 items-center">
          <MdHomeFilled style={{ fontSize: "35px" }} />
          <h1
            className=" text-lg text-primary-600 hover:text-white hover:cursor-pointer duration-500 ease-in-out"
            onClick={() => getAllSongs(dispatch)}
          >
            Home
          </h1>
        </div>
      </div>
      {/* playlist box */}
      <div className="bg-primary-800 rounded h-full">
        {/* your library section */}
        <div className="flex justify-between p-3 items-center">
          <div className=" flex item-center gap-4 items-center">
            <LuLibrary
              style={{ fontSize: "35px" }}
              className="text-primary-600 hover:text-white hover:cursor-pointer duration-500 ease-in-out"
            />
            <h1 className="text-lg text-w text-primary-600 hover:text-white duration-500 ease-in-out">
              Your Library
            </h1>
          </div>
          <FaPlus
            style={{ fontSize: "20px" }}
            className="text-primary-600 hover:text-white hover:cursor-pointer duration-500 ease-in-out"
            onClick={openModal}
          />
        </div>
        {/* end yourlibrary section */}
        {/* modal */}
        {modalOpen && (
          <div
            style={{ backdropFilter: "blur(8px)" }}
            className="w-screen h-screen z-10 bg-primary-700 absolute top-0 left-0 bg-opacity-50"
          >
            <div className=" w-96 h-60 bg-primary-800 shadow-2xl rounded-lg absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col justify-around items-center">
              <IoIosCloseCircleOutline
                style={{
                  color: "white",
                  fontSize: "25px",
                  position: "absolute",
                  top: "-7px",
                  right: "-7px",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              />
              <h1 className="text-2xl">Create a Playlist</h1>
              <input
                type="text"
                className="bg-primary-700 focus:border-primary-700 w-full h-10 rounded p-3"
                required
                placeholder="Name"
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  handleNameSubmittion();
                  closeModal();
                }}
                className=" bg-primary-900 text-white pl-10 pr-10 pt-2 pb-2 rounded-lg h hover:bg-primary-700 duration-500 ease-in-out"
              >
                Add
              </button>
            </div>
          </div>
        )}
        {/* modal end */}
        {/* playlists start */}
        <div className="flex flex-col gap-2 ">
          {playlists.length > 0 &&
            playlists.map((item, index) => {
              return (
                <PlaylistCard
                  key={item._id}
                  {...item}
                  index={index}
                  onClick={() => {
                    fillBeforeFilter();
                    handlePlaylistClick(item.tracks);
                  }}
                />
              );
            })}
        </div>
      </div>
      {/* end playlist box*/}
    </div>
  );
};
