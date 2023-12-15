import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import Loading from "./Loading";
import { useEffect } from "react";
import { getAllSongs } from "../redux/action";

export const MainBody = () => {
  const { songs, isLoading } = useSelector((store) => {
    return { songs: store.currentSongs, isLoading: store.isLoading };
  }, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllSongs(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center md:flex flex-wrap p-5 gap-5">
        {new Array(12).fill(0).map((load, index) => {
          return <Loading key={index} />;
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center text-white bg-primary-800 h-full rounded p-5 md:flex-row md:flex-wrap overflow-auto gap-5">
      {songs.length > 0 &&
        songs.map((song) => {
          return <Card key={song._id} {...song} />;
        })}
    </div>
  );
};
