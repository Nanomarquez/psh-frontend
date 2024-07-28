import React from "react";
import PlayerStats from "./components/PlayerStats";
import { Spinner } from "./components/Spinner";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-300">
      <Spinner />
      <PlayerStats />
    </div>
  );
};

export default App;
