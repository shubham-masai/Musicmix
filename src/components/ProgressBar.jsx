import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { getDuration } from "../redux/action";

export const ProgressBar = () => {
  const { getPosition } = useGlobalAudioPlayer();
  const [progress, setProgress] = useState(0);
  const currentPlayingID = useSelector((store) => {
    return store.currentPlaying;
  });
  useEffect(() => {
    let interval;
    async function anon() {
      if (currentPlayingID) {
        const duration = await getDuration(currentPlayingID);
        console.log(duration);
        interval = setInterval(() => {
          setProgress((getPosition() / duration) * 100);
        }, 1000);
      }
    }
    anon();
    return () => {
      clearInterval(interval);
    };
  }, [currentPlayingID, getPosition]);
  return (
    <div
      className="h-1 bg-white duration-1000 ease-linear"
      style={{ width: `${progress}%` }}
    ></div>
  );
};
