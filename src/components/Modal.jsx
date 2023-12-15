/* eslint-disable react/prop-types */
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { PlaylistCard } from "./PlaylistCard";
import { addToPlaylist } from "../redux/action";

export const Modal = ({ ismodalOpen, setisModalOpen }) => {
  const playlists = useSelector((store) => {
    return store.playlists;
  });
  const dispatch = useDispatch();
  const trackId = useSelector((store) => {
    return store.currentPlaying;
  });

  const closeModal = () => {
    setisModalOpen(false);
  };
  return (
    <>
      {ismodalOpen && (
        <div
          style={{ backdropFilter: "blur(8px)" }}
          className="w-screen h-screen z-10 bg-primary-700 absolute top-0 left-0 bg-opacity-50"
        >
          <div className=" w-96 h-fit bg-primary-800 shadow-2xl rounded-lg absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col justify-around items-center">
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
            <h1 className="text-2xl">Select Playlist</h1>
            <div className=" flex flex-col gap-2 w-full">
              {playlists.length > 0 &&
                playlists.map((item, index) => {
                  return (
                    <PlaylistCard
                      key={item._id}
                      {...item}
                      index={index}
                      onClick={() => {
                        addToPlaylist(dispatch, item._id, trackId, item.tracks);
                        closeModal();
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
