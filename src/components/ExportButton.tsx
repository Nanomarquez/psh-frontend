/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ExportButton: React.FC = () => {
  const topScores = useSelector((state: RootState) => state.stats.topScores);

  const handleExport = () => {
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Rank;Nickname;Score",
        ...topScores.map((p: any,index: number) => `${index + 1};${p.nickname};${p.score}`),
      ].join("\r\n");
      csvContent = csvContent.concat("\r\n\r\nLast updated:;;", new Date().toLocaleString());
      console.log(csvContent);

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "player_stats.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={handleExport}
    >
      Export to CSV
    </button>
  );
};

export default ExportButton;
