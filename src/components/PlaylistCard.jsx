/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const PlaylistCard = ({ name, tracks, index, onClick }) => {
  const beforeFilter = useSelector((store) => {
    return store.beforeFilter;
  });
  return (
    <div
      className=" w-full h-fit flex gap-4 items-center bg-primary-800 p-1 hover:bg-primary-700 hover:cursor-pointer rounded-md"
      onClick={onClick}
    >
      <img
        src={
          beforeFilter[
            beforeFilter.findIndex(
              (obj) => obj._id === tracks[tracks.length - 1]
            )
          ]?.album || beforeFilter[index]?.album
        }
        alt=""
        className="w-16 h-16 rounded-md ml-2"
      />
      <div>
        <h1>{name}</h1>
        <p>{tracks.length} Songs</p>
      </div>
    </div>
  );
};
