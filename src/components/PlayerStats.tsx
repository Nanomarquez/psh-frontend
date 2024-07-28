/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTopScoresAction } from "../redux/slices/statSlice";
import ExportButton from "./ExportButton";
import FetchButton from "./FetchButton";

const PlayerStats: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topScores, lastUpdate, totalCount , repeatedIds } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    dispatch(fetchTopScoresAction());

    const intervalId = setInterval(() => {
      dispatch(fetchTopScoresAction());
    }, 10000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      {topScores?.length === 0 ? (
        <div className="text-center text-4xl font-bold p-5 bg-slate-100/80 rounded-lg shadow-lg text-blue-400 pb-6 select-none">No players found</div>
      ) : (
        <div className="w-[360px] md:w-[600px] p-4 bg-slate-100/80 rounded-lg shadow-lg select-none">
          <h2 className="text-3xl text-center font-extrabold text-blue-400">
            Top 10 Players
          </h2>
          <table className="table-auto w-full mt-4 bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-blue-400 overflow-hidden text-white">
              <tr>
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Nickname</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {topScores?.map((player: any, index: number) => (
                <tr key={player.id} 
                className={repeatedIds.includes(player.id.toString()) ? '' : 'bg-green-500'}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{player.nickname}</td>
                  <td className="border px-4 py-2">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="mt-2 bg-blue-400 p-2 shadow-md rounded-lg text-white font-bold w-fit">
              Last updated:{" "}
              {lastUpdate ? new Date(lastUpdate).toLocaleString() : "N/A"}
            </div>
            <div className="mt-2 bg-blue-400 p-2 shadow-md rounded-lg text-white font-bold w-fit">
              Total players: {totalCount ?? "N/A"}
            </div>
          </div>
          <div className="flex justify-between">
            <ExportButton />
            <FetchButton />
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerStats;
